import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CustomNavbarComponent } from '../custom-navbar/custom-navbar.component';

@Component({
  selector: 'app-custom',
  template: `
    <app-custom-navbar></app-custom-navbar>
    <router-outlet></router-outlet>
  `,
  standalone: true,
  imports: [
    CommonModule, 
    RouterModule,
    CustomNavbarComponent
  ]
})
export class CustomComponent {}