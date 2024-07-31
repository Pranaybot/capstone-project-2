import { Component, OnInit, AfterViewInit } from '@angular/core';
import { DOMService } from '../../../../../services/dom.service';

@Component({
  selector: 'app-logo',
  standalone: true,
  imports: [],
  templateUrl: './logo.component.html',
  styleUrl: './logo.component.scss'
})
export class LogoComponent 
  implements OnInit, AfterViewInit{

    constructor(private domService: DomService) { }

    ngOnInit(): void {
      this.addDynamicScript();
    }

    addDynamicScript() {
      const script = document.createElement('script');
      script.type = 'text/javascript';
      script.text = `
        document.addEventListener('DOMContentLoaded', () => {
          let closeBtn = document.querySelector('#btn')});`;

      document.body.appendChild(script);
    }

    ngAfterViewInit() {
      setTimeout(() => {
        const closeBtn = document.querySelector('#btn');

        if (closeBtn) {
          this.domService.setCloseBtn(closeBtn);
        }
      }, 0);

    }
          
}
