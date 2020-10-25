import { ErrorComponent } from './error/error.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { EditComponent } from './edit/edit.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router'; // CLI imports router


const routes: Routes = [
  { path: '', component: EditComponent },
  { path: 'edit', component: EditComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: '**', component: ErrorComponent  },


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
