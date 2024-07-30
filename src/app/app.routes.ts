import { Routes } from '@angular/router';
import { CategoriesComponent } from './components/categories/categories.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';

export const routes: Routes = [
    {path: 'categories', component: CategoriesComponent},
    {path: '', component: DashboardComponent}

];
