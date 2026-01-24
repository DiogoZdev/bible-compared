import { Component } from '@angular/core';
import { Header } from '../header/header';

@Component({
  imports: [Header],
  selector: 'Version',
  templateUrl: './version.html',
})
export class Version {

  versionTitle="A"
  languageCode="A"
  v = {
    number: 1,
    text: "A"
  }
}
