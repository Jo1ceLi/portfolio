import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { EditComponent } from '../edit/edit.component';
import { ErrorComponent } from '../error/error.component';
import { OrderComponent } from '../order/order.component';
import { PositionComponent } from '../position/position.component';
import { LayoutComponent } from './layout.component';

const routes: Routes = [
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LayoutRoutingModule { }
