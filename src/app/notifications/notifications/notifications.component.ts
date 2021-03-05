import { Component, OnInit } from '@angular/core';
import { NotificationsService, Notification } from '../notifications.service';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss']
})
export class NotificationsComponent implements OnInit {

  messageList: any = []

  unreadMessages: number = 0;

  expanded: boolean = false;

  constructor(
    public ns: NotificationsService
  ) {
    this.ns.messagesOutput.subscribe((list) => {
      this.messageList = list;
      this.unreadMessages = list.filter((value: Notification) => {
        return !value.read;
      }).length;
    });
   }

  ngOnInit(): void {
  }

  expandNotifications() {
    this.expanded = !this.expanded;
    if (this.expanded) {
      this.ns.readMessages();
    }
  }

  deleteNotification(id: number) {
    this.ns.deleteMessage(id)
  }
}
