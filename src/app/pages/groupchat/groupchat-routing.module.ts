import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GroupchatComponent } from './groupchat.component';

const routes: Routes = [
  {
    path: '',
    component: GroupchatComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GroupchatRoutingModule { }
