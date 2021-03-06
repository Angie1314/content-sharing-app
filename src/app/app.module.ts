import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ToastrModule } from 'ngx-toastr';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProfilePageComponent } from './components/profile-page/profile-page.component';
import { LoginPageComponent } from './components/login-page/login-page.component';
import { ProfileIndicatorComponent } from './components/profile-indicator/profile-indicator.component';
import { environment } from 'src/environments/environment';
import { HomeFeedComponent } from './components/home-feed/home-feed.component';
import { MainPageComponent } from './components/main-page/main-page.component';
import { CreatePostPageComponent } from './components/create-post-page/create-post-page.component';
import { SingleImageComponent } from './components/single-image/single-image.component';
import { ConfirmDeleteModalComponent } from './components/confirm-delete-modal/confirm-delete-modal.component';
import { SearchPageComponent } from './components/search-page/search-page.component';
import { HttpClientModule} from '@angular/common/http';
import { PhotoInfoModalComponent } from './components/photo-info-modal/photo-info-modal.component';

@NgModule({
  declarations: [
    AppComponent,
    ProfilePageComponent,
    LoginPageComponent,
    ProfileIndicatorComponent,
    HomeFeedComponent,
    MainPageComponent,
    CreatePostPageComponent,
    SingleImageComponent,
    ConfirmDeleteModalComponent,
    SearchPageComponent,
    PhotoInfoModalComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    AngularFireStorageModule,
    AngularFireDatabaseModule,
    AppRoutingModule,
    NgbModule,
    FontAwesomeModule,
    FormsModule,
    HttpClientModule,
  ],
  exports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [
    ConfirmDeleteModalComponent,
    PhotoInfoModalComponent
  ]
})
export class AppModule { }
