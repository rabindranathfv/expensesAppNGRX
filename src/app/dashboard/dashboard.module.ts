import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ShareModule } from '../share/share.module';

@NgModule({
  declarations: [
    DashboardComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    ShareModule
  ],
  exports: [
    DashboardRoutingModule,
    DashboardComponent
  ]
})
export class DashboardModule { }
