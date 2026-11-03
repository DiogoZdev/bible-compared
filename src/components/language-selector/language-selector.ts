import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Language, LanguageService, TranslationKey } from '../../services/language.service';

@Component({
  selector: 'LanguageSelector',
  changeDetection: ChangeDetectionStrategy.Eager,
  templateUrl: './language-selector.html',
  host: { class: 'flex w-full' },
})
export class LanguageSelector {
  protected readonly i18n = inject(LanguageService);

  protected readonly options: Array<{
    value: Language;
    short: string;
    labelKey: TranslationKey;
  }> = [
    { value: 'pt', short: 'PT', labelKey: 'language.pt' },
    { value: 'en', short: 'EN', labelKey: 'language.en' },
  ];

  setLanguage(language: Language) {
    this.i18n.setLanguage(language);
  }

  buttonClass(language: Language): string {
    const isActive = this.i18n.language() === language;
    return isActive
      ? 'flex-1 rounded-md bg-surface px-3 py-1.5 text-xs font-bold text-brand shadow-sm transition-colors cursor-pointer'
      : 'flex-1 rounded-md px-3 py-1.5 text-xs font-semibold text-ink-muted transition-colors hover:text-ink cursor-pointer';
  }
}
