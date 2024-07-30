import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-custom',
  template: `
    <router-outlet></router-outlet>
  `,
  standalone: true,
  imports: [
    CommonModule, 
    RouterModule
  ]
})
export class CustomComponent {}