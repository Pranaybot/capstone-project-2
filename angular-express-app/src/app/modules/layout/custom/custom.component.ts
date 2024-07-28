import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-custom',
  template: `
  <body>
    <router-outlet></router-outlet>
  </body>
  `,
  standalone: true,
  imports: [
    CommonModule, 
    RouterModule
  ]
})
export class CustomComponent {}