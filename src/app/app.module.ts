import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TopBarComponent } from './top-bar/top-bar.component';
import { DownBarComponent } from './down-bar/down-bar.component';
import { MainMidWindowComponent } from './main-mid-window/main-mid-window.component';
import { PaginatorModule } from 'primeng/paginator';
import { LoginComponent } from './login/login.component';
import { DataService } from './data.service';
import { CategoryComponent } from './category/category.component';
import { RandomComponent } from './random/random.component';
import { Top10Component } from './top10/top10.component';
import { RegisterComponent } from './register/register.component';
import { ButtonModule } from 'primeng/button';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    TopBarComponent,
    DownBarComponent,
    MainMidWindowComponent,
    LoginComponent,
    CategoryComponent,
    RandomComponent,
    Top10Component,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    PaginatorModule,
    ButtonModule,
    BrowserAnimationsModule
  ],
  providers: [DataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
