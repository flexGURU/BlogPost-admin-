import { Routes } from '@angular/router';
import { CategoriesComponent } from './components/categories/categories.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { PostComponent } from './components/post/post.component';
import { NewPostsComponent } from './components/new-posts/new-posts.component';
import { AuthComponent } from './components/auth/auth.component';
import { authGuardGuard } from './services/auth-guard.guard';

export const routes: Routes = [
    {path: 'categories', component: CategoriesComponent, canActivate: [authGuardGuard]},
    {path: '', component: DashboardComponent, canActivate: [authGuardGuard]},
    {path: 'posts', component: PostComponent, canActivate: [authGuardGuard]},
    {path: 'dashboard', component: DashboardComponent,canActivate: [authGuardGuard]},
    {path: 'posts/new', component: NewPostsComponent, canActivate: [authGuardGuard]},
    {path: 'login', component: AuthComponent},





];
