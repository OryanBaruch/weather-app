import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OnDestoryService {

  protected onDestroy: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor() { }

  ngOnDestroy(): void {
    this.onDestroy.emit(true)
    this.onDestroy.unsubscribe()
  }
}
