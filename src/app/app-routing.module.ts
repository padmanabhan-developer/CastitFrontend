import { UserinfoComponent } from './userinfo/userinfo.component';
import { AboutComponent } from './about/about.component';
import { WorkshopComponent } from './workshop/workshop.component';
import { LoginPage1Component } from './login/login-page1/login-page1.component';
import { LoginComponent } from './login/login.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HompageComponent } from './hompage/hompage.component';
import { LoginPage2Component } from './login/login-page2/login-page2.component';
import { LoginPage3Component } from './login/login-page3/login-page3.component';
import { LoginPage4Component } from './login/login-page4/login-page4.component';
import { LoginPage5Component } from './login/login-page5/login-page5.component';
import { LoginPage6Component } from './login/login-page6/login-page6.component';
import { LoginPage7Component } from './login/login-page7/login-page7.component';


const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'profiles'
  },
  {
    path: '#',
    pathMatch: 'full',
    redirectTo: 'profiles'
  },
  {
    path: 'profiles',
    component: HompageComponent

  },
  {
    path: 'details/:id',
    component: UserinfoComponent

  },
  {
    path: 'workshop',
    component: WorkshopComponent

  },
  {
    path: 'about',
    component: AboutComponent

  },
  {
    path: 'login',
    children: [
      {
        path: '',
        pathMatch: 'full',
        component: LoginComponent
      },
      {
        path: '1',
        component: LoginPage1Component
      },
      {
        path: '2',
        component: LoginPage2Component
      },
      {
        path: '3',
        component: LoginPage3Component
      },
      {
        path: '4',
        component: LoginPage4Component
      },
      {
        path: '5',
        component: LoginPage5Component
      },
      {
        path: '6',
        component: LoginPage6Component
      },
      {
        path: '7',
        component: LoginPage7Component
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
