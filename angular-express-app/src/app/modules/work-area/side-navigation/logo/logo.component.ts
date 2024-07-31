import { Component, OnInit, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { DomService} from '../../../../services/dom.service';

@Component({
  selector: 'app-logo',
  standalone: true,
  imports: [],
  templateUrl: './logo.component.html',
  styleUrl: './logo.component.scss'
})
export class LogoComponent implements OnInit, AfterViewInit {
  @ViewChild('btn', { static: false }) btn: ElementRef | undefined;

  constructor(private domService: DomService) { }

  ngOnInit(): void {
    const scriptContent = `
      document.addEventListener('DOMContentLoaded', () => {
        let closeBtn = document.getElementById('btn');
        if (closeBtn) {
          closeBtn.addEventListener('click', () => {
            console.log('Close button clicked');
          });
        }
      });
    `;
    this.domService.addDynamicScript(scriptContent);
  }

  ngAfterViewInit(): void {
    if (this.btn) {
      this.domService.setElementRef(this.btn);
    }
  }
}