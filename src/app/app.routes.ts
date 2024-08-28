import { Routes } from '@angular/router';
import { CategoriesComponent } from './components/categories/categories.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { PostComponent } from './components/post/post.component';
import { NewPostsComponent } from './components/new-posts/new-posts.component';
import { AuthComponent } from './components/auth/auth.component';

export const routes: Routes = [
    {path: 'categories', component: CategoriesComponent},
    {path: '', component: DashboardComponent},
    {path: 'posts', component: PostComponent},
    {path: 'dashboard', component: DashboardComponent},
    {path: 'posts/new', component: NewPostsComponent},
    {path: 'login', component: AuthComponent},





];
