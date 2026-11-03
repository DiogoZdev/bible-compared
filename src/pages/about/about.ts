import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { LanguageService } from '../../services/language.service';

@Component({
  selector: 'About',
  changeDetection: ChangeDetectionStrategy.Eager,
  templateUrl: './about.html',
})
export class About {
  protected readonly i18n = inject(LanguageService);
}
