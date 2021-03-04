import { Component, OnInit } from '@angular/core';
import { NotificationsService, Notification } from '../notifications.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss']
})
export class NotificationsComponent implements OnInit {

  messageList: any = []

  expanded: boolean = false;

  constructor(
    public notifications: NotificationsService
  ) {
    this.notifications.messagesOutput.subscribe((list) => {
      this.messageList = list;
    });
    setInterval(() => {
      this.notifications.addMessage('testing', 1)
    }, 5000)
    setInterval(() => {
      this.notifications.deleteMessage(1)
    }, 60000)
   }

  ngOnInit(): void {
  }

  expandNotifications() {
    this.expanded = !this.expanded;
  }
}
