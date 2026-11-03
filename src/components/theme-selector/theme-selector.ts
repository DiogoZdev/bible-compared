import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { Theme, ThemeService } from '../../services/theme.service';
import { LanguageService, TranslationKey } from '../../services/language.service';

@Component({
  selector: 'ThemeSelector',
  changeDetection: ChangeDetectionStrategy.Eager,
  templateUrl: './theme-selector.html',
  host: { class: 'flex w-full' },
})
export class ThemeSelector {
  protected readonly themeService = inject(ThemeService);
  protected readonly i18n = inject(LanguageService);

  protected readonly options: Array<{ value: Theme; labelKey: TranslationKey }> = [
    { value: 'light', labelKey: 'theme.light' },
    { value: 'dark', labelKey: 'theme.dark' },
    { value: 'system', labelKey: 'theme.system' },
  ];

  setTheme(theme: Theme) {
    this.themeService.setTheme(theme);
  }

  buttonClass(theme: Theme): string {
    const isActive = this.themeService.theme() === theme;
    return isActive
      ? 'flex flex-1 items-center justify-center rounded-md bg-surface p-1.5 text-brand shadow-sm transition-colors cursor-pointer'
      : 'flex flex-1 items-center justify-center rounded-md p-1.5 text-ink-muted transition-colors hover:text-ink cursor-pointer';
  }
}
