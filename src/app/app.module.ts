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
import { ProfileComponent } from './profile/profile.component';
import { TableModule } from 'primeng/table';
import { RatingModule } from 'primeng/rating';
import { ProfileAdminComponent } from './profile-admin/profile-admin.component';
import { AdminAddComponent } from './admin-add/admin-add.component';
import { AdminDeleteComponent } from './admin-delete/admin-delete.component';
import { AdminUpdateComponent } from './admin-update/admin-update.component';
import { GalleriaModule } from 'primeng/galleria';
import { FileUploadModule } from 'primeng/fileupload';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { ListboxModule } from 'primeng/listbox';
import { RadioButtonModule } from 'primeng/radiobutton';
import { ToastModule } from 'primeng/toast';
import { ResolveQuizComponent } from './resolve-quiz/resolve-quiz.component';
import { ImageModule } from 'primeng/image';

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
    RegisterComponent,
    ProfileComponent,
    ProfileAdminComponent,
    AdminAddComponent,
    AdminDeleteComponent,
    AdminUpdateComponent,
    ResolveQuizComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    PaginatorModule,
    ButtonModule,
    BrowserAnimationsModule,
    TableModule,
    RatingModule,
    GalleriaModule,
    FileUploadModule,
    InputTextareaModule,
    ListboxModule,
    RadioButtonModule,
    ToastModule,
    ImageModule
  ],
  providers: [DataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
