import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { CollectionComponent } from './components/collection/collection.component';
import { AdminDashboardComponent } from './components/admin/admin-dashboard/admin-dashboard.component';
import { AdminComponent } from './components/admin/admin.component';
import { AdminCollectionComponent } from './components/admin/admin-collection/admin-collection.component';
import { AdminCreateCollectionComponent } from './components/admin/admin-collection/create-collection/create-collection.component';

// Import LoginGuard
import { LoginGuard } from './guards/login.guard';

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
      { path: 'collections/create', component: AdminCreateCollectionComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
