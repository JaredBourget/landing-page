import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
  HttpHandler,
  HttpEvent,
  HttpErrorResponse
} from '@angular/common/http';
import { NotificationsService } from './notifications/notifications.service';

import { Observable, of } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';

@Injectable()
export class ApiInterceptorService implements HttpInterceptor {
  constructor(
    public ns: NotificationsService
  ) { }
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {

    return next.handle(req).pipe(
      tap(evt => {
        console.log(evt)
        if (evt instanceof HttpResponse) {
          if (evt.body && evt.status === 200) {
            this.ns.addMessage('success', 200)
          }
        }
      }),
      catchError((err: any) => {
        if (err instanceof HttpErrorResponse) {
          console.log(err)
          try {
            // this.toasterService.error(err.error.msg ? err.error.msg : 'Unauthorized', 'Error:', { positionClass: 'toast-bottom-center' });
          } catch (e) {
            // this.toasterService.error('An error occurred', '', { positionClass: 'toast-bottom-center' });
          }
          //log error 
        }
        return of(err);
      }));

  }

}
