import { ChangeDetectorRef, Component, Input, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { BibleService } from '../../services/bible.service';
import { BibleSyncService } from '../../services/sync-view.service';

@Component({
  selector: 'ChapterView',
  changeDetection: ChangeDetectionStrategy.Eager,
  templateUrl: './chapter-view.html',
})
export class ChapterView implements OnInit {
  constructor(
    private readonly service: BibleService,
    private syncService: BibleSyncService,
    private readonly cdr: ChangeDetectorRef,
  ) {}

  @Input() side!: 'L' | 'R';

  versionTitle="Aguardando seleção de livro"
  languageCode="EX"
  verses = [{
    number: 0,
    text: "No princípio ..."
  }]

  private requestId = 0;

  ngOnInit() {
    this.service.getUrls.subscribe(e => {
      let url = '';
      if (this.side === 'L') url = e[0];
      if (this.side === 'R') url = e[1];

      this.loadContent(url);
    })

    this.syncService.getScrollRequest.subscribe(verseNumber => {
      this.scrollToVerse(verseNumber);
    });
  }

  onVerseClick(verseNumber: number) {
    this.syncService.requestScroll(verseNumber);
  }

  private scrollToVerse(verseNumber: number) {
    const element = document.getElementById(`v-${this.languageCode}-${verseNumber}`);
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
        inline: 'nearest'
      });
    }
  }


  async loadContent(url: string) {
    if (!url) return;

    const requestId = ++this.requestId;

    try {
      const res = await this.service.fetchChapter(url);

      // Ignore responses that arrived after a newer chapter request.
      if (requestId !== this.requestId) return;

      this.versionTitle = res.versionTitle || 'Erro ao carregar';
      this.languageCode = res.languageCode || 'ERR';
      this.verses = res.verses || [];
    } catch {
      if (requestId !== this.requestId) return;

      this.versionTitle = 'Erro ao carregar';
      this.languageCode = 'ERR';
      this.verses = [];
    }

    this.cdr.detectChanges();
  }
}
