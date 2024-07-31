import { Injectable, Renderer2 } from '@angular/core';

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

 addDynamicScript() {
    const script = this.renderer.createElement('script');
    script.type = 'text/javascript';
    script.text = `
      document.addEventListener('DOMContentLoaded', () => {
        let closeBtn = document.querySelector('#btn')});
    `;
    
    this.renderer.appendChild(document.body, script);
  }
}

