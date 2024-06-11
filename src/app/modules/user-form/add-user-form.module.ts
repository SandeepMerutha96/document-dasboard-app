import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AddUserFormComponent } from './add-user-form/add-user-form.component';
import { UserListComponent } from './user-list/user-list.component';
import { AddUserFormRoutingModule } from './add-user-form.routing.module';
import { DeleteUserFormComponent } from './delete-user-form/delete-user-form.component';
import { PaginatorComponent } from './paginator/paginator.component';
// import { InlineSVGModule } from 'ng-inline-svg-2';
@NgModule({
  declarations: [AddUserFormComponent, UserListComponent,DeleteUserFormComponent,PaginatorComponent],
  imports: [
    CommonModule,
    AddUserFormRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
})
export class AddUserFormModule {}
