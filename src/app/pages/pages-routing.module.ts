import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PagesComponent } from './pages.component';
import {UserAuthGuard} from '../auth-guard/user-auth.guard';

const routes: Routes = [
  {
    path: '',
    component: PagesComponent,

    children: [
      {
        path: '',
        canActivate: [UserAuthGuard],
        loadChildren: () => import('./chat/chat.module').then(m => m.ChatModule)
      },
      {
        path: 'login',
        loadChildren: () => import('./login/login.module').then(m => m.LoginModule)
      },
      {
        path: 'register',
        loadChildren: () => import('./register/register.module').then(m => m.RegisterModule)
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
