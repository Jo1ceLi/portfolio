import { AuthGuard } from './auth.guard';
import { LoginComponent } from './login/login.component';
import { LayoutComponent } from './layout/layout.component';
import { PositionComponent } from './position/position.component';
import { ErrorComponent } from './error/error.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { EditComponent } from './edit/edit.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router'; // CLI imports router
import { OrderComponent } from './order/order.component';
import { SidebarComponent } from './sidebar/sidebar.component';


const routes: Routes = [
  { path: 'login', component: LoginComponent},
  { path: '', component: LayoutComponent, children: [
    { path: 'order', component: OrderComponent},
    { path: 'edit', component: EditComponent },
    { path: 'dashboard', component: DashboardComponent},
    { path: 'position', component: PositionComponent, canActivate: [AuthGuard]},
    { path: '**', component: ErrorComponent  },
  ] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
