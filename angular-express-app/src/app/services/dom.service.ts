import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DomService {
  private closeBtn: HTMLElement | null  = null;

  setCloseBtn(element: HTMLElement): void {
    this.closeBtn = element;
  }
  
  getCloseBtn(element: HTMLElement | null): void {
    return this.closeBtn;
  }
}

