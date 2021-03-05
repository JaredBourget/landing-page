import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { scan, map } from 'rxjs/operators';


export interface Notification {
  id?: number;
  msg?: string;
  type: string;
  read?: boolean;
  status?: number;
  errorMsg?: string;
}


@Injectable({
  providedIn: 'root'
})
export class NotificationsService {

  messagesInput: Subject<Notification>;
  messagesOutput: Observable<Notification[]>;

  constructor() { 
    this.messagesInput = new Subject<Notification>()
    this.messagesOutput = this.messagesInput.pipe(
      scan((acc: Notification[], value: Notification) => {
        if (value.type === 'clear') {
          return acc.filter(msg => msg.id !== value.id);
        } else if (value.type === 'read') {
          return acc.map((val) => {
            val.read = true;
            return val;
          })
        }
        return [...acc, value]
      }, [])
    )
  }

  addMessage(message: string, type: string, status: number, errorMsg: string = '') {
    // creating a new message
    this.messagesInput.next({
      id: Math.floor(Math.random()*10000),
      msg: message,
      type,
      read: false,
      status,
      errorMsg
    });
  }

  readMessages() {
    // flagging all messages as read
    this.messagesInput.next({
      type: 'read',
      read: true
    })
  }

  deleteMessage(id: number) {
    // filtering out message by id
    this.messagesInput.next({
      id,
      type: 'clear'
    })
  }

}
