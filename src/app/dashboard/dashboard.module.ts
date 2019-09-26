import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ShareModule } from '../share/share.module';
import { StadisticsComponent } from '../expenses/stadistics/stadistics.component';
import { ExpensesComponent } from '../expenses/expenses.component';
import { DetailComponent } from '../expenses/detail/detail.component';

@NgModule({
  declarations: [
    DashboardComponent,
    StadisticsComponent,
    ExpensesComponent,
    DetailComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    ShareModule
  ],
  exports: [
    DashboardRoutingModule,
    DashboardComponent,
    StadisticsComponent,
    ExpensesComponent,
    DetailComponent
  ]
})
export class DashboardModule { }
