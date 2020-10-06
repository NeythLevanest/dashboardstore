import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HeaderComponent } from './shared/header/header.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { app_routing } from './app.routes';
import { SidebarComponent } from './shared/sidebar/sidebar.component';




@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    HeaderComponent,
    SidebarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    app_routing,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
