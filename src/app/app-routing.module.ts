import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'users',
    loadChildren: () =>
      import('./modules/user-form/add-user-form.module').then((m) => m.AddUserFormModule),
  },
  // { path: '', redirectTo: 'users' },
  { path: '**', redirectTo: 'error/404' },
 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
