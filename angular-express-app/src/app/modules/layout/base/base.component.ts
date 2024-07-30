import { Component } from '@angular/core';
import { NavbarComponent } from "../navbar/navbar.component"
import { FooterComponent } from "../footer/footer.component";
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-base',
  template: `
    <app-navbar></app-navbar>
    <router-outlet></router-outlet>
    <app-footer></app-footer> 
  `,
  standalone: true,
  imports: [
    CommonModule, 
    RouterModule, 
    NavbarComponent, 
    FooterComponent
  ],
})
export class BaseComponent {}
