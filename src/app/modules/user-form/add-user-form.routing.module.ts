import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddUserFormComponent } from './add-user-form/add-user-form.component';
import { UserListComponent } from './user-list/user-list.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'userList',
    pathMatch: 'full',
  },
  {
    path: 'userform',
    component: AddUserFormComponent,
  },
  {
    path: "edit/:id",
    component: AddUserFormComponent
},
  {
    path: 'userList',
    component: UserListComponent,
  },

  { path: '', redirectTo: 'userList', pathMatch: 'full' },
  { path: '**', redirectTo: 'userList', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddUserFormRoutingModule {}
