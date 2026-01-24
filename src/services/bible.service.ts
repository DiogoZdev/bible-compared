import { Injectable } from "@angular/core";
import { ITranslation, ITranslationResponse } from "../interfaces/translation";
import { PATHS } from "../constants/paths";
import { BehaviorSubject } from "rxjs";
import { replacer } from "../utils/replacer";
import { IChapterResponse } from "../interfaces/external-chapter";
import { ChapterMapper } from "../utils/chapter.mapper";

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

    this.translations.next(filtered)
  }

  setBook(acr: string) {
    this.book.next(acr);
  }

  setChapters(c: Array<number>) {
    this.chapters.next(c);
  }

  setVersionLeft(v: string) {
    this.versionLeft = v;
  }

  setVersionRight(v: string) {
    this.versionRight = v;
  }

  buildUrls() {
    const chapters = [
      replacer(PATHS.CHAPTER, this.versionLeft || 'deu_elbbk', this.book.value, String(this.selectedChapter)),
      replacer(PATHS.CHAPTER, this.versionRight || 'deu_elbbk', this.book.value, String(this.selectedChapter))
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
