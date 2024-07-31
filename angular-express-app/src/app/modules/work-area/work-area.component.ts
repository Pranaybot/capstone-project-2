import { Component } from '@angular/core';
import { SideNavigationComponent } from './side-navigation/side-navigation.component';

@Component({
  selector: 'app-work-area',
  standalone: true,
  imports: [SideNavigationComponent],
  templateUrl: './work-area.component.html',
  styleUrl: './work-area.component.scss'
})
export class WorkAreaComponent {

}
