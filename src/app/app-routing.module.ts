import { DashboardComponent } from './dashboard/dashboard.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OrderComponent } from './order/order.component';


const routes: Routes = [
  { path: '' , pathMatch: 'full', redirectTo: 'dashboard'},
  { path: 'dashboard' , component: DashboardComponent },
  { path: 'orderedit' , component: OrderComponent },


];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
