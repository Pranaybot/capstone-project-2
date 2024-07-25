import { Routes } from '@angular/router';
import { HomeComponent } from "./modules/main/home/home.component";
import { LoginSignupComponent } from "./modules/auth/login-signup/login-signup.component";

export const routes: Routes = [
    {   
        path: '',
        component: HomeComponent
    },
    {
        path: 'login_signup',
        component: LoginSignupComponent
    }
];
