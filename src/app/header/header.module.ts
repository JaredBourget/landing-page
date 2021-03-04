import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { NotificationsModule } from '../notifications/notifications.module';



@NgModule({
  declarations: [NavbarComponent],
  imports: [
    CommonModule,
    NotificationsModule
  ],
  exports: [
    NavbarComponent
  ]
})
export class HeaderModule { }
