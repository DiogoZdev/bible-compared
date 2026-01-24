import { Component } from '@angular/core';
import { ChapterView } from '../../components/chapter-view/chapter-view';

@Component({
  imports: [ChapterView],
  selector: 'Home',
  templateUrl: './home.html',
})
export class Home {
  showTips = true;
}
