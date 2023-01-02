import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GroupchatRoutingModule } from './groupchat-routing.module';
import { GroupchatComponent } from './groupchat.component';


@NgModule({
  declarations: [
    GroupchatComponent
  ],
  imports: [
    CommonModule,
    GroupchatRoutingModule
  ]
})
export class GroupchatModule { }
