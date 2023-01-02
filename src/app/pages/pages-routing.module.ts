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
        loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule)
      },
      {
        path: 'login',
        loadChildren: () => import('./login/login.module').then(m => m.LoginModule)
      },
      {
        path: 'register',
        loadChildren: () => import('./register/register.module').then(m => m.RegisterModule)
      },
      {
        path: 'chat',
        canActivate: [UserAuthGuard],
        loadChildren: () => import('./chat/chat.module').then(m => m.ChatModule)
      },
      {
        path: 'groupchat',
        canActivate: [UserAuthGuard],
        loadChildren: () => import('./groupchat/groupchat.module').then(m => m.GroupchatModule)
      },
      {
        path: 'private-chat/:_id',
        canActivate: [UserAuthGuard],
        loadChildren: () => import('./private-chat/private-chat.module').then(m => m.PrivateChatModule)
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
