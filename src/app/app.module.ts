import {LOCALE_ID, NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule, RoutingComponents} from './app-routing.module';
import {AppComponent} from './app.component';
import {LoginComponent} from './views/login/login.component';
import {HomeComponent} from './views/home/home.component';
import {MenuBarComponent} from './components/menu-bar/menu-bar.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {DatePipe, registerLocaleData} from "@angular/common";
import localES from '@angular/common/locales/es-MX'
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {Token} from "./utils/interceptors/token";
import {AuthInterceptor} from "./utils/interceptors/auth.interceptor";
import {NgxSpinnerModule} from "ngx-spinner";
import { NewPlanComponent } from './views/plan/new-plan/new-plan.component';
import { CobranzaGeneralComponent } from './views/cobranza/cobranza-general/cobranza-general.component';
import { CobranzaDetailComponent } from './views/cobranza/cobranza-detail/cobranza-detail.component';
registerLocaleData(localES, 'mx');

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    RoutingComponents,
    MenuBarComponent,
    NewPlanComponent,
    CobranzaGeneralComponent,
    CobranzaDetailComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxSpinnerModule
  ],
  providers: [
    DatePipe,
    {provide: LOCALE_ID, useValue: 'mx'},
    {provide: HTTP_INTERCEPTORS, useClass: Token, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true},
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
