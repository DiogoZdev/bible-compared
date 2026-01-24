import { Injectable } from "@angular/core";
import { ITranslation, ITranslationResponse } from "../interfaces/translation";
import { PATHS } from "../constants/paths";
import { BehaviorSubject } from "rxjs";

@Injectable()
export class BibleService {

  private translations = new BehaviorSubject<ITranslation[]>([]);

  private book = new BehaviorSubject<string>('GEN');

  private chapters = new BehaviorSubject<Array<number>>([1]);

  async loadTranslations() {
    const res = await fetch(PATHS.TRANSLATIONS)
    .then(request => request.json())
    .then(availableTranslations => {
      return availableTranslations as ITranslationResponse;
    });

    const filtered = res.translations.filter(
      p => p.language.includes('por') ||
      p.language.includes('spa') ||
      p.language.includes('lat') ||
      p.language.includes('eng')
    );

    this.translations.next(filtered)
  }

  getTranslations() {
    return this.translations.asObservable();
  }

  setBook(acr: string) {
    this.book.next(acr);
  }

  getBook() {
    return this.book.asObservable();
  }

  setChapters(c: Array<number>) {
    console.log('chegou ',c, ' no Service')
    this.chapters.next(c);
  }

  getChapters() {
    return this.chapters.asObservable();
  }

}
