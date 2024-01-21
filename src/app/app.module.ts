import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { LoginComponent } from './components/auth/login/login.component';

import { AuthService } from './services/auth.service';
import { RegisterModalService } from './services/register-modal.service';
import { LoginModalService } from './services/login-modal.service';
import { HomeComponent } from './components/home/home.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FooterComponent } from './components/footer/footer.component';
import { CardComponent } from './components/card/card.component';
import { ProductService } from './services/product.service';
import { CollectionComponent } from './components/collection/collection.component';
import { CollectionCardComponent } from './components/collection-card/collection-card.component';
import { AdminDashboardComponent } from './components/admin/admin-dashboard/admin-dashboard.component';
import { AdminComponent } from './components/admin/admin.component';
import { AdminCollectionComponent } from './components/admin/admin-collection/admin-collection.component';
import { AdminCreateCollectionComponent } from './components/admin/admin-collection/admin-create-collection/admin-create-collection.component';
import { LoginGuard } from './guards/login.guard';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    RegisterComponent,
    LoginComponent,
    HomeComponent,
    FooterComponent,
    CardComponent,
    CollectionComponent,
    CollectionCardComponent,
    AdminDashboardComponent,
    AdminComponent,
    AdminCollectionComponent,
    AdminCreateCollectionComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
  ],
  providers: [AuthService, RegisterModalService, LoginModalService, ProductService, LoginGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
