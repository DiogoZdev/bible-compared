import { Component, Input, OnInit } from '@angular/core';
import { ITranslation } from '../../interfaces/translation'
import { BibleService } from '../../services/bible.service';
import { BOOK_OPT, BOOKS } from '../../constants/books'

@Component({
  selector: 'Header',
  imports: [],
  providers: [BibleService],
  templateUrl: './header.html',
})
export class Header implements OnInit {
  constructor(private service: BibleService) {}

  @Input() showSelector: boolean = false;
  versions: ITranslation[] = [];
  books = BOOKS;
  chapters: Array<number> = [];

  async ngOnInit() {
    this.service.getChapters().subscribe((e) => {
      this.chapters = e;
    })

    this.setChaptersByBook('GEN');

    await this.service.loadTranslations();
  }

  setBook(acr: string) {
    this.service.setBook(acr as BOOK_OPT);

    this.setChaptersByBook(acr as BOOK_OPT)
  }

  setChaptersByBook(acr: BOOK_OPT) {
    const total = this.books.find(b => b.acr === acr)?.chapters || 1;
    const chapters = [];
    for (let i = 1; i <= total; i++) { chapters.push(i) }
    this.service.setChapters(chapters);
  }
}


