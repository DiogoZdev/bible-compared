import { Injectable } from "@angular/core";
import { ITranslation, ITranslationResponse } from "../interfaces/translation";
import { PATHS } from "../constants/paths";
import { BehaviorSubject } from "rxjs";
import { replacer } from "../utils/replacer";
import { IChapterResponse } from "../interfaces/external-chapter";
import { ChapterMapper } from "../utils/chapter.mapper";
import { BOOKS } from "../constants/books";

const DEFAULT_TRANSLATION = 'deu_elbbk';
const STORAGE_KEY = 'bible-compared-selection';

interface StoredSelection {
  book: string;
  chapter: number;
  versionLeft: string;
  versionRight: string;
}

function readStoredSelection(): StoredSelection {
  const fallback: StoredSelection = { book: 'GEN', chapter: 1, versionLeft: '', versionRight: '' };

  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return fallback;

    const parsed = JSON.parse(raw) as Partial<StoredSelection>;
    const book = BOOKS.some((item) => item.acr === parsed.book) ? parsed.book! : fallback.book;
    const totalChapters = BOOKS.find((item) => item.acr === book)?.chapters ?? 1;
    const chapter = Number(parsed.chapter);

    return {
      book,
      chapter:
        Number.isInteger(chapter) && chapter >= 1 && chapter <= totalChapters ? chapter : 1,
      versionLeft: typeof parsed.versionLeft === 'string' ? parsed.versionLeft : '',
      versionRight: typeof parsed.versionRight === 'string' ? parsed.versionRight : '',
    };
  } catch {
    return fallback;
  }
}

@Injectable({ providedIn: 'root' })
export class BibleService {

  private readonly storedSelection = readStoredSelection();

  private translations = new BehaviorSubject<ITranslation[]>([]);
  getTranslations = this.translations.asObservable();

  private book = new BehaviorSubject<string>(this.storedSelection.book);
  getBook = this.book.asObservable();

  private chapterNumber = this.storedSelection.chapter;

  private chapters = new BehaviorSubject<Array<number>>([1]);
  getChapters = this.chapters.asObservable();

  private versionLeft = this.storedSelection.versionLeft;
  private versionRight = this.storedSelection.versionRight;

  private urls = new BehaviorSubject<string[]>([]);
  getUrls = this.urls.asObservable();

  get selectedBook() {
    return this.book.value;
  }

  get selectedChapter() {
    return this.chapterNumber;
  }

  get selectedVersionLeft() {
    return this.versionLeft;
  }

  get selectedVersionRight() {
    return this.versionRight;
  }

  async loadTranslations() {
    const res = await fetch(PATHS.TRANSLATIONS)
    .then(request => request.json())
    .then(availableTranslations => {
      return availableTranslations as ITranslationResponse;
    });

    const filtered = res.translations.filter(
      p => p.language.includes('por') && !["por_tft", "por_blt"].includes(p.id) ||
      p.language.includes('fra') ||
      p.language.includes('ita') ||
      p.id.includes("grc_bre") ||
      p.id.includes('heb_mod') ||
      p.language.includes('spa') ||
      p.language.includes('lat') ||
      p.language.includes('deu') ||
      p.language.includes('deu') ||
      p.name.includes('KJV')
    );

    if (filtered.length > 0) {
      const translationById = new Map(filtered.map((translation) => [translation.id, translation]));
      const candidates = [...filtered].sort((a, b) => this.defaultScore(b) - this.defaultScore(a));

      // Restore the saved versions only if they are still available and
      // actually contain the selected book (some translations are partial).
      const restoredLeft = translationById.get(this.versionLeft);
      this.versionLeft =
        restoredLeft && (await this.translationSupportsBook(restoredLeft, this.book.value))
          ? restoredLeft.id
          : (await this.findVersionForBook(candidates, this.book.value)) || filtered[0].id;

      const restoredRight = translationById.get(this.versionRight);
      const rightCandidates = candidates.filter((translation) => translation.id !== this.versionLeft);
      this.versionRight =
        restoredRight && (await this.translationSupportsBook(restoredRight, this.book.value))
          ? restoredRight.id
          : (await this.findVersionForBook(rightCandidates, this.book.value)) || this.versionLeft;
    }

    this.persistSelection();
    this.translations.next(filtered)

    // Load the restored chapter/versions as soon as they are known,
    // so the reader continues from the previous session.
    this.buildUrls();
  }

  /** Selects a book, resets the chapter to 1 and loads it immediately. */
  setBook(acr: string) {
    this.book.next(acr);
    this.chapterNumber = 1;
    this.persistSelection();
    this.buildUrls();
  }

  setChapters(c: Array<number>) {
    this.chapters.next(c);
  }

  /** Selects a chapter and loads it immediately, no search button required. */
  setChapter(chapter: number | string) {
    const parsed = Number(chapter);
    if (!Number.isFinite(parsed) || parsed < 1) return;

    this.chapterNumber = parsed;
    this.persistSelection();
    this.buildUrls();
  }

  setVersionLeft(v: string) {
    this.versionLeft = v;
    this.persistSelection();
    this.buildUrls();
  }

  setVersionRight(v: string) {
    this.versionRight = v;
    this.persistSelection();
    this.buildUrls();
  }

  buildUrls() {
    const chapters = [
      replacer(PATHS.CHAPTER, this.versionLeft || DEFAULT_TRANSLATION, this.book.value, String(this.chapterNumber)),
      replacer(PATHS.CHAPTER, this.versionRight || DEFAULT_TRANSLATION, this.book.value, String(this.chapterNumber))
    ]

    this.urls.next(chapters);
  }

  async fetchChapter(url: string) {
    const res: IChapterResponse = await fetch(url)
    .then(request => request.json())
    .then(chapter => chapter);

    return ChapterMapper.toChapter(res);
  }

  private persistSelection() {
    try {
      const selection: StoredSelection = {
        book: this.book.value,
        chapter: this.chapterNumber,
        versionLeft: this.versionLeft,
        versionRight: this.versionRight,
      };

      localStorage.setItem(STORAGE_KEY, JSON.stringify(selection));
    } catch {
      // Storage may be unavailable; the selection still applies in-session.
    }
  }

  private defaultScore(translation: ITranslation) {
    const complete = translation.numberOfBooks >= 60 ? 2 : 0;
    const portuguese = translation.language.startsWith('por') ? 1 : 0;
    return complete + portuguese;
  }

  private async findVersionForBook(candidates: ITranslation[], book: string) {
    for (const translation of candidates) {
      if (await this.translationSupportsBook(translation, book)) {
        return translation.id;
      }
    }

    return '';
  }

  private async translationSupportsBook(translation: ITranslation, book: string) {
    // Complete Bibles are assumed to contain every book; this avoids an extra request.
    if (translation.numberOfBooks >= 60) return true;

    try {
      const booksUrl = new URL(translation.listOfBooksApiLink, PATHS.TRANSLATIONS).toString();
      const response = (await fetch(booksUrl).then((request) => request.json())) as {
        books?: Array<{ id: string }>;
      };

      if (!response.books) return true;
      return response.books.some((item) => item.id === book);
    } catch {
      // If validation fails, keep the saved translation instead of resetting it.
      return true;
    }
  }
}
