import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { BaseComponent } from "../../layout/base/base.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    RouterOutlet,
    BaseComponent,
],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {}
