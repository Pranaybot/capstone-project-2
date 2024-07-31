import { Injectable, Renderer2, ElementRef,
  RendererFactory2, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformServer } from '@angular/common';


@Injectable({
  providedIn: 'root'
})
export class DomService {
  private closeBtn: HTMLElement | null = null;
  private renderer: Renderer2;
  private isServer: boolean;

  constructor(rendererFactory: RendererFactory2, 
    @Inject(PLATFORM_ID) private platformId: Object) {
    this.renderer = rendererFactory.createRenderer(null, null);
    this.isServer = isPlatformServer(this.platformId);
  }

  setCloseBtn(element: HTMLElement): void {
    this.closeBtn = element;
  }

  getCloseBtn(): HTMLElement | null {
    return this.closeBtn;
  }

  addDynamicScript(scriptContent: string): void {
    if (this.isServer) {
      const script = this.renderer.createElement('script');
      script.type = 'text/javascript';
      script.text = scriptContent;
      this.renderer.appendChild(this.renderer.selectRootElement('body', true), script);
    }
  }

  // New method to set the close button element
  setElementRef(elementRef: ElementRef): void {
    const nativeElement = elementRef.nativeElement as HTMLElement;
    this.setCloseBtn(nativeElement);
  }

}
