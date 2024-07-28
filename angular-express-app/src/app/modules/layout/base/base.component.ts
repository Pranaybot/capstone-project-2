import { Component } from '@angular/core';
import { NavbarComponent } from "../navbar/navbar.component"
import { FooterComponent } from "../footer/footer.component";
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-base',
  template: `
  <body>
    <app-navbar></app-navbar>
    <router-outlet></router-outlet>
    <app-footer></app-footer> 
  </body>
  `,
  standalone: true,
  imports: [
    CommonModule, 
    RouterModule, 
    NavbarComponent, 
    FooterComponent
  ],
  styleUrl: './base.component.scss'
})
export class BaseComponent {}
