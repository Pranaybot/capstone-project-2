import { Component} from '@angular/core';
import { RouterOutlet} from '@angular/router';
import { BaseComponent } from "./modules/layout/base/base.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, BaseComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})

export class AppComponent {

}
