import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PrivateChatRoutingModule } from './private-chat-routing.module';
import { FormsModule } from '@angular/forms';
import { PrivateChatComponent } from './private-chat.component';

@NgModule({
  declarations: [
    PrivateChatComponent
  ],
  imports: [
    CommonModule,
    PrivateChatRoutingModule,
    FormsModule
  ]
})
export class PrivateChatModule { }
