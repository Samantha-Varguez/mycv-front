import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { NewUserComponent } from './new-user/new-user.component';
import {FormsModule } from "@angular/forms";
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { FakeProductComponent } from './fake-product/fake-product.component';
import { HttpClientModule } from '@angular/common/http';
import { GraphQLModule } from './graphql.module';
import { EducationComponent } from './education/education.component';
import { InterestsComponent } from './interests/interests.component';
import { HeaderComponent } from './header/header.component';
import { WorkexperienceComponent } from './workexperience/workexperience.component';
import { SkillsComponent } from './skills/skills.component';
import { CertificatesComponent } from './certificates/certificates.component';

@NgModule({
  declarations: [
    AppComponent,
    LandingPageComponent,
    HomeComponent,
    LoginComponent,
    ForgotPasswordComponent,
    NewUserComponent,
    ResetPasswordComponent,
    FakeProductComponent,
    EducationComponent,
    InterestsComponent,
    HeaderComponent,
    WorkexperienceComponent,
    SkillsComponent,
    CertificatesComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    GraphQLModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
