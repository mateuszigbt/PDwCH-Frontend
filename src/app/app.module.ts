import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TopBarComponent } from './top-bar/top-bar.component';
import { DownBarComponent } from './down-bar/down-bar.component';
import { MainMidWindowComponent } from './main-mid-window/main-mid-window.component';
import { PaginatorModule } from 'primeng/paginator';

@NgModule({
  declarations: [
    AppComponent,
    TopBarComponent,
    DownBarComponent,
    MainMidWindowComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    PaginatorModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
