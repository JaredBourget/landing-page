import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { scan } from 'rxjs/operators';


export interface Notification {
  id: number;
  msg?: string;
  type: 'success' | 'error' | 'clear';
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
        console.log(acc)
        return value.type === 'clear' ? acc.filter(msg => msg.id !== value.id) : [...acc, value]
      }, [])
    )
  }

  addMessage(message: string, id: number) {
    console.log(message)
    this.messagesInput.next({
      id,
      msg: message,
      type: 'success'
    });
  }

  readMessages() {

  }

  deleteMessage(id: number) {
    this.messagesInput.next({
      id,
      type: 'clear'
    })
  }

}
