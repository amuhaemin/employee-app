import { NgModule } from '@angular/core';
import { EmployeeListComponent } from './employee-list/employee-list.component';
import { Routes, RouterModule, Router } from '@angular/router';
import { EmployeeDetailComponent } from './employee-detail/employee-detail.component';
import { EmployeeInputComponent } from './employee-input/employee-input.component';

const routes: Routes = [
  { path: 'employee-list', component: EmployeeListComponent },
  { path: '', redirectTo: '/employee-list', pathMatch: 'full' },
  { path: 'detail/:id', component: EmployeeDetailComponent },
  { path: 'add', component: EmployeeInputComponent }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
