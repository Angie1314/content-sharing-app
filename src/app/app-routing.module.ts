import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginPageComponent } from './components/login-page/login-page.component';
import { MainPageComponent } from './components/main-page/main-page.component';
import { ProfilePageComponent } from './components/profile-page/profile-page.component';
import { HomeFeedComponent } from './components/home-feed/home-feed.component';
import { CreatePostPageComponent } from './components/create-post-page/create-post-page.component';
import { SingleImageComponent } from './components/single-image/single-image.component';
import { SearchPageComponent } from './components/search-page/search-page.component';

const routes: Routes = [{
  path: '',
  component: MainPageComponent,
  children: [
    {
      path: '',
      component: ProfilePageComponent
    },
    {
      path: 'home',
      component: HomeFeedComponent
    },
    {
      path: 'create-post',
      component: CreatePostPageComponent
    },
    {
      path: 'image',
      component: SingleImageComponent
    },
    {
      path: 'search',
      component: SearchPageComponent
    }
  ]
}, {
  path: 'login',
  component: LoginPageComponent
}];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
