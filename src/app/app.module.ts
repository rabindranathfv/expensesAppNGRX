import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { ExpensesComponent } from './expenses/expenses.component';
import { StadisticsComponent } from './expenses/stadistics/stadistics.component';
import { DetailComponent } from './expenses/detail/detail.component';
import { DashboardModule } from './dashboard/dashboard.module';
import { ShareModule } from './share/share.module';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    ExpensesComponent,
    StadisticsComponent,
    DetailComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    DashboardModule,
    ShareModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
