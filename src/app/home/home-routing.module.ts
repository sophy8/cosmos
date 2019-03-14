import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SignupComponent } from './signup/signup.component';
import { HomePage } from './home.page';
import { LoginComponent } from './login/login.component';
export const homeroutes: Routes = [
  {
    path: '', component: HomePage,
  },
  { path: 'signup', component: SignupComponent },
  { path: 'login', component: LoginComponent },

];

@NgModule({
  imports: [RouterModule.forChild(homeroutes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
