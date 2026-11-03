import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { ChapterView } from '../../components/chapter-view/chapter-view';
import { LanguageService } from '../../services/language.service';

@Component({
  imports: [ChapterView],
  selector: 'Home',
  changeDetection: ChangeDetectionStrategy.Eager,
  templateUrl: './home.html',
})
export class Home {
  protected readonly i18n = inject(LanguageService);

  showTips = true;

  activeSide: 'L' | 'R' = 'L';
  leftTitle = '';
  rightTitle = '';

  get leftTabLabel() {
    return this.leftTitle || this.i18n.t('home.tabs.left');
  }

  get rightTabLabel() {
    return this.rightTitle || this.i18n.t('home.tabs.right');
  }

  tabClass(side: 'L' | 'R'): string {
    const isActive = this.activeSide === side;
    return isActive
      ? 'flex items-center justify-center gap-2 rounded-lg bg-surface px-3 py-2 text-xs font-bold text-brand shadow-sm transition-colors cursor-pointer min-w-0'
      : 'flex items-center justify-center gap-2 rounded-lg px-3 py-2 text-xs font-semibold text-ink-soft transition-colors hover:text-ink cursor-pointer min-w-0';
  }
}
