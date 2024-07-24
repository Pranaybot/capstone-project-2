import { Component } from '@angular/core';
import { NavbarComponent } from "../navbar/navbar.component"
import { FooterComponent } from "../footer/footer.component";
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-base',
  standalone: true,
  imports: [NavbarComponent, FooterComponent, RouterModule],
  templateUrl: './base.component.html',
  styleUrl: './base.component.scss'
})
export class BaseComponent {

}
