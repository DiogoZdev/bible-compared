import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { Theme, ThemeService } from '../../services/theme.service';

@Component({
  selector: 'ThemeSelector',
  changeDetection: ChangeDetectionStrategy.Eager,
  templateUrl: './theme-selector.html',
  host: { class: 'inline-flex' },
})
export class ThemeSelector {
  protected readonly themeService = inject(ThemeService);

  protected readonly options: Array<{ value: Theme; label: string }> = [
    { value: 'light', label: 'Tema claro' },
    { value: 'dark', label: 'Tema escuro' },
    { value: 'system', label: 'Tema do sistema' },
  ];

  setTheme(theme: Theme) {
    this.themeService.setTheme(theme);
  }

  buttonClass(theme: Theme): string {
    const isActive = this.themeService.theme() === theme;
    return isActive
      ? 'rounded-md bg-surface p-1.5 text-brand shadow-sm transition-colors cursor-pointer'
      : 'rounded-md p-1.5 text-ink-muted transition-colors hover:text-ink cursor-pointer';
  }
}
