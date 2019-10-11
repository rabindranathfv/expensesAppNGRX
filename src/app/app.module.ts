import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';

// modules
import { DashboardModule } from './dashboard/dashboard.module';
import { ShareModule } from './share/share.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// external
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { environment } from 'src/environments/environment';

// NGRX
import { StoreModule } from '@ngrx/store';
import { appReducers } from './app.reducer';

// services
import { AuthService } from './services/auth/auth.service';

// guards
import { AuthGuardGuard } from './guards/auth-guard/auth-guard.guard';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    DashboardModule,
    ShareModule,
    ReactiveFormsModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule, // imports firebase/firestore, only needed for database features
    AngularFireAuthModule, // imports firebase/auth, only needed for auth features,
    AngularFireStorageModule, // imports firebase/storage only needed for storage features
    StoreModule.forRoot(appReducers)
  ],
  providers: [
    AuthService,
    AuthGuardGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
