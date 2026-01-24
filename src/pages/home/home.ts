import { Component } from '@angular/core';
import { Header } from '../../components/header/header';
import { Version } from '../../components/version/version';

@Component({
  imports: [Header, Version],
  selector: 'Home',
  templateUrl: './home.html',
})
export class Home {

}
