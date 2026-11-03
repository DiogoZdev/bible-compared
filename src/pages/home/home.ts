import { Component, ChangeDetectionStrategy } from '@angular/core';
import { ChapterView } from '../../components/chapter-view/chapter-view';

@Component({
  imports: [ChapterView],
  selector: 'Home',
  changeDetection: ChangeDetectionStrategy.Eager,
  templateUrl: './home.html',
})
export class Home {
  showTips = true;
}
