import { Routes } from '@angular/router';
import { ChapterView } from '../components/chapter-view/chapter-view';
import { Home } from '../pages/home/home';
import { About } from '../pages/about/about';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    component: Home,
  },
  {
    path: 'about',
    component: About
  }

];
