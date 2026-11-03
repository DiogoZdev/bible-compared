import { Injectable } from "@angular/core";
import { ITranslation, ITranslationResponse } from "../interfaces/translation";
import { PATHS } from "../constants/paths";
import { BehaviorSubject } from "rxjs";
import { replacer } from "../utils/replacer";
import { IChapterResponse } from "../interfaces/external-chapter";
import { ChapterMapper } from "../utils/chapter.mapper";

const DEFAULT_TRANSLATION = 'deu_elbbk';

@Injectable({ providedIn: 'root' })
export class BibleService {

  private translations = new BehaviorSubject<ITranslation[]>([]);
  getTranslations = this.translations.asObservable();

  private book = new BehaviorSubject<string>('GEN');
  getBook = this.book.asObservable();

  private selectedChapter = 1;

  private chapters = new BehaviorSubject<Array<number>>([1]);
  getChapters = this.chapters.asObservable();

  private versionLeft = '';
  private versionRight = '';

  private urls = new BehaviorSubject<string[]>([]);
  getUrls = this.urls.asObservable();

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
      if (!this.versionLeft) this.versionLeft = filtered[0].id;
      if (!this.versionRight) this.versionRight = (filtered[1] ?? filtered[0]).id;
    }

    this.translations.next(filtered)

    // Load the initially selected chapter/versions as soon as they are known,
    // so the reader does not need to press the search button.
    this.buildUrls();
  }

  /** Selects a book, resets the chapter to 1 and loads it immediately. */
  setBook(acr: string) {
    this.book.next(acr);
    this.selectedChapter = 1;
    this.buildUrls();
  }

  setChapters(c: Array<number>) {
    this.chapters.next(c);
  }

  /** Selects a chapter and loads it immediately, no search button required. */
  setChapter(chapter: number | string) {
    const parsed = Number(chapter);
    if (!Number.isFinite(parsed) || parsed < 1) return;

    this.selectedChapter = parsed;
    this.buildUrls();
  }

  setVersionLeft(v: string) {
    this.versionLeft = v;
    this.buildUrls();
  }

  setVersionRight(v: string) {
    this.versionRight = v;
    this.buildUrls();
  }

  buildUrls() {
    const chapters = [
      replacer(PATHS.CHAPTER, this.versionLeft || DEFAULT_TRANSLATION, this.book.value, String(this.selectedChapter)),
      replacer(PATHS.CHAPTER, this.versionRight || DEFAULT_TRANSLATION, this.book.value, String(this.selectedChapter))
    ]

    this.urls.next(chapters);
  }

  async fetchChapter(url: string) {
    const res: IChapterResponse = await fetch(url)
    .then(request => request.json())
    .then(chapter => chapter);

    return ChapterMapper.toChapter(res);
  }
}
