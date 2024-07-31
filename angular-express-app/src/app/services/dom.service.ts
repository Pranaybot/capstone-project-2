import { Injectable, Renderer2, ElementRef } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DomService {
  private closeBtn: HTMLElement | null = null;

  constructor(private renderer: Renderer2) { }

  setCloseBtn(element: HTMLElement): void {
    this.closeBtn = element;
  }

  getCloseBtn(): HTMLElement | null {
    return this.closeBtn;
  }

  addDynamicScript(scriptContent: string): void {
    const script = this.renderer.createElement('script');
    script.type = 'text/javascript';
    script.text = scriptContent;
    this.renderer.appendChild(document.body, script);
  }

  // New method to set the close button element
  setElementRef(elementRef: ElementRef): void {
    const nativeElement = elementRef.nativeElement as HTMLElement;
    this.setCloseBtn(nativeElement);
  }
}
