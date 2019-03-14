import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { Storage, IonicStorageModule } from '@ionic/storage';
import { MatVideoModule } from 'mat-video';

import { HomePage } from './home.page';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { HomeRoutingModule } from './home-routing.module';
import { RegisterService } from '../service//register.service';
@NgModule({
  imports: [
    CommonModule,
    FormsModule, ReactiveFormsModule,
    IonicModule, HttpClientModule, MatVideoModule,
    HomeRoutingModule, IonicStorageModule.forRoot(),
    RouterModule.forChild([
      {
        path: '',
        component: HomePage
      }
    ])
  ],
  declarations: [HomePage, LoginComponent, SignupComponent],
  providers: [RegisterService]
})
export class HomePageModule { }
