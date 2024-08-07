import { Routes } from '@angular/router';
import { HomeComponent } from "./modules/main/home/home.component";
import { LoginSignupComponent } from "./modules/auth/login-signup/login-signup.component";
import { BaseComponent } from "./modules/layout/base/base.component";
import { CustomComponent } from "./modules/layout/custom/custom.component";
import { WorkAreaComponent } from "./modules/work-area/work-area.component";

export const routes: Routes = [
    {
      path: '',
      component: BaseComponent,
      children: [
        { 
          path: '', 
          component: HomeComponent 
        },
        { path: 'work_area', 
          component: WorkAreaComponent,
          data: { message: 'Welcome ${req.session.user_id}' }
        }
      ]
    },
    {
      path: '',
      component: CustomComponent,
      children: [
        { 
          path: 'login_signup', 
          component: LoginSignupComponent 
        },
      ]
    }
  ];
