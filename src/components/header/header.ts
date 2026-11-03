import { ChangeDetectorRef, Component, Input, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ITranslation } from '../../interfaces/translation'
import { BibleService } from '../../services/bible.service';
import { BOOK_OPT, BOOKS } from '../../constants/books'
import { ThemeSelector } from '../theme-selector/theme-selector';

@Component({
  selector: 'Header',
  imports: [ThemeSelector],
  templateUrl: './header.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  host: { 'class': 'block sticky top-0 z-50' },
})
export class Header implements OnInit {
  constructor(
    private service: BibleService,
    private cdr: ChangeDetectorRef,
  ) {}

  @Input() showSelector: boolean = false;
  versions: ITranslation[] = [];
  books = BOOKS;
  chapters: Array<number> = [];
  selectedVersionLeft = '';
  selectedVersionRight = '';

  async ngOnInit() {
    this.service.getTranslations.subscribe((e) => {
      this.versions = e;
      this.selectedVersionLeft = this.service.selectedVersionLeft;
      this.selectedVersionRight = this.service.selectedVersionRight;
      this.cdr.detectChanges();
    });

    this.service.getChapters.subscribe((e) => {
      this.chapters = e;
      this.cdr.detectChanges();
    });

    this.setChaptersByBook('GEN');
    this.service.loadTranslations();
  }

  setBook(acr: string) {
    this.service.setBook(acr as BOOK_OPT);

    this.setChaptersByBook(acr as BOOK_OPT)
  }

  setChaptersByBook(acr: BOOK_OPT) {
    const total = this.books.find(b => b.acr === acr)?.chapters || 1;
    const chapters = Array.from({ length: total }, (_, i) => i + 1);
    this.service.setChapters(chapters);
  }

  setChapter(chapter: string) {
    this.service.setChapter(chapter);
  }

  setVersionLeft(v: string) {
    this.selectedVersionLeft = v;
    this.service.setVersionLeft(v)
  }

  setVersionRight(v: string) {
    this.selectedVersionRight = v;
    this.service.setVersionRight(v)
  }

  loadDiff() {
    this.service.buildUrls();
  }
}
