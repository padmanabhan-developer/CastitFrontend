import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import { CookieService } from 'ngx-cookie-service';
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
import { UserprofileService } from './services/userprofile.service';
import { LogoutComponent } from './logout/logout.component';
import { CustomerComponent } from './customer/customer/customer.component';
import { CustomerprofileComponent } from './customerprofile/customerprofile.component';
import { LightboxComponent } from './lightbox/lightbox.component';
import { LightboxsidebarComponent } from './lightboxsidebar/lightboxsidebar.component';
import { CustomerloginComponent } from './customerlogin/customerlogin.component';
import { AddtolightboxComponent } from './addtolightbox/addtolightbox.component';
import { ResetpasswordComponent } from './resetpassword/resetpassword.component';
import { NewpasswordComponent } from './newpassword/newpassword.component';
import { LoaderComponent } from './loader/loader.component';
import { LightboxPageComponent } from './lightbox-page/lightbox-page.component';
import { AdminListComponent } from './admin-list/admin-list.component';
// import { NgxDatatableModule } from '@swimlane/ngx-datatable/lib/ngx-datatable.module';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { AdminUserInfoComponent } from './admin-user-info/admin-user-info.component';
import { AdminUserMediaComponent } from './admin-user-media/admin-user-media.component';
import { MediaModalComponent } from './media-modal/media-modal.component';
import { UiSwitchModule } from 'ngx-toggle-switch';
import { HomecarouselComponent } from './homecarousel/homecarousel.component';
import { PopupComponent } from './popup/popup.component';
import { ResetpasswordInfoComponent } from './resetpassword-info/resetpassword-info.component';
import { ResetpasswordSuccessComponent } from './resetpassword-success/resetpassword-success.component';
@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    NgbModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    LazyLoadImageModule,
    HttpClientModule,
    UiSwitchModule,
    NgxDatatableModule.forRoot({
      messages: {
        emptyMessage: 'Trying to fetch data ... ', // Message to show when array is presented, but contains no values
        totalMessage: 'total', // Footer total message
        selectedMessage: 'selected' // Footer selected message
      }
    }),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    // MatTableModule,
    // MatPaginatorModule,
    // MatSortModule
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
    WorkshopComponent,
    LogoutComponent,
    CustomerComponent,
    CustomerprofileComponent,
    LightboxComponent,
    LightboxsidebarComponent,
    CustomerloginComponent,
    AddtolightboxComponent,
    ResetpasswordComponent,
    NewpasswordComponent,
    LoaderComponent,
    LightboxPageComponent,
    // AdminComponent,
    AdminListComponent,
    AdminUserInfoComponent,
    AdminUserMediaComponent,
    MediaModalComponent,
    HomecarouselComponent,
    PopupComponent,
    ResetpasswordInfoComponent,
    ResetpasswordSuccessComponent
  ],
  bootstrap: [
    AppComponent
  ],
  providers: [
    AppDataService,
    CookieService,
    UserprofileService
  ]
})
export class AppModule { }

// required for AOT compilation
// Docs : https://www.codeandweb.com/babeledit/tutorials/how-to-translate-your-angular8-app-with-ngx-translate
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}
