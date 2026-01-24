import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class BibleSyncService {
  private scrollRequest = new Subject<number>();

  getScrollRequest = this.scrollRequest.asObservable();

  requestScroll(verseNumber: number) {
    this.scrollRequest.next(verseNumber);
  }
}
