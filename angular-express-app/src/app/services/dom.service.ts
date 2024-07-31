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

 addDynamicScript(scriptContent: string): void {
    const script = this.renderer.createElement('script');
    script.type = 'text/javascript';
    script.text = scriptContent;
   
    this.renderer.appendChild(document.body, script);
  }
}

