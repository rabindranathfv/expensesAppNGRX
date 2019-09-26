import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StadisticsComponent } from '../expenses/stadistics/stadistics.component';
import { DetailComponent } from '../expenses/detail/detail.component';
import { ExpensesComponent } from '../expenses/expenses.component';

const routes: Routes = [
  {
    path: '',
    component: StadisticsComponent
  },
  {
    path: 'expenses',
    component: ExpensesComponent
  },
  {
    path: 'detail',
    component: DetailComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
