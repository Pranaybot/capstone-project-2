import { Component, OnInit } from '@angular/core';
import { LogoComponent } from './logo/logo.component';
import { NavItemComponent } from './nav-item/nav-item.component';
import { ProfileComponent } from './profile/profile.component';
import { DOMService } from '../../../../../services/dom.service';

@Component({
  selector: 'app-side-navigation',
  standalone: true,
  imports: [
    LogoComponent,
    NavItemComponent,
    ProfileComponent
  ],
  templateUrl: './side-navigation.component.html',
  styleUrl: './side-navigation.component.scss'
})
export class SideNavigationComponent {
  constructor(private domService: DomService) {}
  ngOnInit(): void {
    const closeBtn = this.domService.getCloseBtn();

    if (closeBtn) {
      this.addDynamicScript(closeBtn);
    }
  }

  addDynamicScript(closeBtn: HTMLElement) {
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.text = `
      document.addEventListener('DOMContentLoaded', () => {
        let sidebar = document.querySelector(".sidebar");
        let searchBtn = document.querySelector(".bx-search");
        
        closeBtn.addEventListener("click", ()=>{
          sidebar.classList.toggle("open");
          menuBtnChange();//calling the function(optional)
        });
        
        searchBtn.addEventListener("click", ()=>{ // Sidebar open when you click on the search iocn
          sidebar.classList.toggle("open");
          menuBtnChange(); //calling the function(optional)
        });
        
        // following are the code to change sidebar button(optional)
        function menuBtnChange() {
         if(sidebar.classList.contains("open")){
           closeBtn.classList.replace("bx-menu", "bx-menu-alt-right");//replacing the iocns class
         }else {
           closeBtn.classList.replace("bx-menu-alt-right","bx-menu");//replacing the iocns class
         }
        }
      });
    `;
    document.body.appendChild(script);
  }
  
}
