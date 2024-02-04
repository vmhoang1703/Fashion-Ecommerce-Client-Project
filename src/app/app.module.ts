import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { NgxLoadingModule, ngxLoadingAnimationTypes } from 'ngx-loading';
import { NgImageSliderModule } from 'ng-image-slider';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { NgxSliderModule } from 'ngx-slider-v2';

// Import Services
import { AuthService } from './services/auth.service';
import { RegisterModalService } from './services/register-modal.service';
import { LoginModalService } from './services/login-modal.service';
import { ProductService } from './services/product.service';
import { FileUploadService } from './services/file-upload.service';
import { CollectionService } from './services/collection.service';

// Import Guards
import { LoginGuard } from './guards/login.guard';

// Import Environment
import { environment } from './environments/environment';

// Import Components
import { NavbarComponent } from './components/navbar/navbar.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { LoginComponent } from './components/auth/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { FooterComponent } from './components/footer/footer.component';
import { CardComponent } from './components/card/card.component';
import { CollectionComponent } from './components/collection/collection.component';
import { CollectionCardComponent } from './components/collection-card/collection-card.component';
import { AdminDashboardComponent } from './components/admin/admin-dashboard/admin-dashboard.component';
import { AdminComponent } from './components/admin/admin.component';
import { AdminCollectionComponent } from './components/admin/admin-collection/admin-collection.component';
import { CreateCollectionComponent } from './components/admin/admin-collection/create-collection/create-collection.component';
import { EditCollectionComponent } from './components/admin/admin-collection/edit-collection/edit-collection.component';
import { AdminProductComponent } from './components/admin/admin-product/admin-product.component';
import { CreateProductComponent } from './components/admin/admin-product/create-product/create-product.component';
import { EditProductComponent } from './components/admin/admin-product/edit-product/edit-product.component';
import { ShowProductComponent } from './components/admin/admin-product/show-product/show-product.component';
import { ProductsByCollectionComponent } from './components/products-by-collection/products-by-collection.component';
import { BlogComponent } from './components/blog/blog.component';
import { ProductComponent } from './components/product/product.component';
import { ProductDetailComponent } from './components/product-detail/product-detail.component';

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
    CreateCollectionComponent,
    EditCollectionComponent,
    AdminProductComponent,
    CreateProductComponent,
    EditProductComponent,
    ShowProductComponent,
    ProductsByCollectionComponent,
    BlogComponent,
    ProductComponent,
    ProductDetailComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireStorageModule,
    NgxLoadingModule.forRoot({
      animationType: ngxLoadingAnimationTypes.cubeGrid,
      backdropBackgroundColour: "rgba(0,0,0,0.3)",
      fullScreenBackdrop: true,
      // backdropBorderRadius: "5px",
      primaryColour: "#46362e",
      secondaryColour: "#46362e",
      tertiaryColour: "#46362e",
    }),
    NgImageSliderModule,
    AngularEditorModule,
    NgxSliderModule
  ],
  providers: [
    AuthService,
    RegisterModalService,
    LoginModalService,
    ProductService,
    LoginGuard,
    FileUploadService,
    CollectionService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
