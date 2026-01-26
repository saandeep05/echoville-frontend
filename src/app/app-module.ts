import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
import { HomeComponent } from './home/home';
import { LoginComponent } from './login/login';
import { CompanyAdminDashboardComponent } from './dashboards/company-admin-dashboard/company-admin-dashboard';
import { CommunityAdminDashboardComponent } from './dashboards/community-admin-dashboard/community-admin-dashboard';
import { ResidentDashboardComponent } from './dashboards/resident-dashboard/resident-dashboard';

@NgModule({
  declarations: [
    App
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    HomeComponent,
    LoginComponent,
    CompanyAdminDashboardComponent,
    CommunityAdminDashboardComponent,
    ResidentDashboardComponent
  ],
  providers: [
    provideBrowserGlobalErrorListeners(),
  ],
  bootstrap: [App]
})
export class AppModule { }
