import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { HelloComponent } from './hello.component';
import { HompageComponent } from './hompage/hompage.component';
import { AboutComponent } from './about/about.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { TilesComponent } from './tiles/tiles.component';
import { SearchComponent } from './search/search.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { LoginComponent } from './login/login.component';
import { UserinfoComponent } from './userinfo/userinfo.component';
import { LandingComponent } from './landing/landing.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppDataService } from './services/app-data.service';
import { AppRoutingModule } from './app-routing.module';
import { LazyLoadImageModule } from 'ng-lazyload-image';
import { LoginPage1Component } from './login/login-page1/login-page1.component';
import { LoginPage2Component } from './login/login-page2/login-page2.component';
import { LoginPage3Component } from './login/login-page3/login-page3.component';
import { LoginPage4Component } from './login/login-page4/login-page4.component';
import { LoginPage5Component } from './login/login-page5/login-page5.component';
import { LoginPage6Component } from './login/login-page6/login-page6.component';
import { LoginPage7Component } from './login/login-page7/login-page7.component';
import { WorkshopComponent } from './workshop/workshop.component';
@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    NgbModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    LazyLoadImageModule,
    HttpClientModule
  ],
  declarations: [
    AppComponent,
    HelloComponent,
    HompageComponent,
    AboutComponent,
    HeaderComponent,
    FooterComponent,
    TilesComponent,
    SearchComponent,
    SidebarComponent,
    LoginComponent,
    UserinfoComponent,
    LandingComponent,
    LoginPage1Component,
    LoginPage2Component,
    LoginPage3Component,
    LoginPage4Component,
    LoginPage5Component,
    LoginPage6Component,
    LoginPage7Component,
    WorkshopComponent
  ],
  bootstrap: [
    AppComponent
  ],
  providers: [
    AppDataService
  ]
})
export class AppModule { }
