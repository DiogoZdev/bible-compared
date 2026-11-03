import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { LanguageService } from '../../services/language.service';

@Component({
  selector: 'Footer',
  imports: [],
  changeDetection: ChangeDetectionStrategy.Eager,
  templateUrl: './footer.html',
})
export class Footer {
  protected readonly i18n = inject(LanguageService);
}
