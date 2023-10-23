import { TabMenuModule } from 'primeng/tabmenu';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TopBarComponent } from './top-bar/top-bar.component';
import { DownBarComponent } from './down-bar/down-bar.component';

@NgModule({
  declarations: [
    AppComponent,
    TopBarComponent,
    DownBarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
