import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { CollectionComponent } from './components/collection/collection.component';
import { AdminDashboardComponent } from './components/admin/admin-dashboard/admin-dashboard.component';
import { AdminComponent } from './components/admin/admin.component';
import { AdminCollectionComponent } from './components/admin/admin-collection/admin-collection.component';
import { CreateCollectionComponent } from './components/admin/admin-collection/create-collection/create-collection.component';

// Import LoginGuard
import { LoginGuard } from './guards/login.guard';
import { EditCollectionComponent } from './components/admin/admin-collection/edit-collection/edit-collection.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'collections', component: CollectionComponent },
  {
    path: 'admin',
    component: AdminComponent,
    canActivate: [LoginGuard],
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: AdminDashboardComponent },
      { path: 'collections', component: AdminCollectionComponent },
      { path: 'collections/create', component: CreateCollectionComponent },
      { path: 'collections/edit/:id', component: EditCollectionComponent }
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
