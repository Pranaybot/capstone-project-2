import { Component, OnInit, Renderer2, ElementRef, ViewChild } from '@angular/core';
import { DOMService } from '../../../../../services/dom.service';

@Component({
  selector: 'app-logo',
  standalone: true,
  imports: [],
  templateUrl: './logo.component.html',
  styleUrl: './logo.component.scss'
})
export class LogoComponent 
  implements OnInit {
      @ViewChild('btn', {static: 
    false}) btn: ElementRef |undefined;
    
    constructor(
      private renderer: Renderer2, 
      private domService: DomService) { }

    ngOnInit(): void {
      const scriptContent = `
      document.addEventListener('DOMContentLoaded', () => {
        let closeBtn = document.querySelector('#btn')});
      `;
      
      this.domService.addDynamicScript(scriptContent);
    }

    ngAfterViewInit() {
      if (this.btn) {
        this.domService.setCloseBtn(this.btn.nativeElement);
      }
    }
          
}
