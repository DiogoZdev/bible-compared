import { Injectable, computed, effect, signal } from '@angular/core';

export type Theme = 'light' | 'dark' | 'system';

const STORAGE_KEY = 'bible-compared-theme';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  private readonly mediaQuery =
    typeof window !== 'undefined' && typeof window.matchMedia === 'function'
      ? window.matchMedia('(prefers-color-scheme: dark)')
      : null;

  private readonly systemPrefersDark = signal(this.mediaQuery?.matches ?? false);
  private readonly selectedTheme = signal<Theme>(this.readStoredTheme());

  readonly theme = this.selectedTheme.asReadonly();

  readonly resolvedTheme = computed<'light' | 'dark'>(() => {
    const selected = this.selectedTheme();
    if (selected === 'system') return this.systemPrefersDark() ? 'dark' : 'light';
    return selected;
  });

  readonly isDark = computed(() => this.resolvedTheme() === 'dark');

  constructor() {
    this.mediaQuery?.addEventListener('change', (event) => {
      this.systemPrefersDark.set(event.matches);
    });

    effect(() => {
      const isDark = this.isDark();
      document.documentElement.classList.toggle('dark', isDark);
      document.documentElement.style.colorScheme = isDark ? 'dark' : 'light';
    });
  }

  setTheme(theme: Theme) {
    this.selectedTheme.set(theme);
    try {
      localStorage.setItem(STORAGE_KEY, theme);
    } catch {
      // Storage may be unavailable (private mode, blocked cookies); theme still applies in-session.
    }
  }

  private readStoredTheme(): Theme {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored === 'light' || stored === 'dark' || stored === 'system') return stored;
    } catch {
      // Fall through to the default theme.
    }
    return 'system';
  }
}
