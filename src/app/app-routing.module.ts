import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Import LoginGuard
import { LoginGuard } from './guards/login.guard';

// Import components
import { HomeComponent } from './components/home/home.component';
import { CollectionComponent } from './components/collection/collection.component';
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

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'collections', component: CollectionComponent },
  { path: 'collections/:id/products', component: ProductsByCollectionComponent },
  { path: 'products', component: ProductComponent },
  { path: 'products/:id', component: ProductDetailComponent },
  { path: 'blogs', component: BlogComponent },
  {
    path: 'admin',
    component: AdminComponent,
    canActivate: [LoginGuard],
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: AdminDashboardComponent },
      { path: 'collections', component: AdminCollectionComponent },
      { path: 'collections/create', component: CreateCollectionComponent },
      { path: 'collections/edit/:id', component: EditCollectionComponent },
      { path: 'products', component: AdminProductComponent },
      { path: 'products/create', component: CreateProductComponent },
      { path: 'products/edit/:id', component: EditProductComponent },
      { path: 'products/:id', component: ShowProductComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
