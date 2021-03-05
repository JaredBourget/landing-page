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
        if (evt instanceof HttpResponse) {
          if (evt.body && evt.status === 200) {
            this.ns.addMessage('API call success', 'success', evt.status)
          }
        }
      }),
      catchError((err: any) => {
        if (err instanceof HttpErrorResponse) {
          try {
            this.ns.addMessage('API call failure', 'danger', err.status, err.error.message)
          } catch (e) {
            // this.toasterService.error('An error occurred', '', { positionClass: 'toast-bottom-center' });
          }
        }
        return of(err);
      }));

  }

}
