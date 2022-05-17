import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { catchError, debounceTime, retry } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor() { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const clonedReq=request.clone();
// Interceptor to let the client know if theres a server issue
    return next.handle(clonedReq).pipe(
      retry(1),
      catchError((error: HttpErrorResponse) => {
        const errorMessage = error;

        alert(`Server Error:\n${errorMessage.message}`);
        return throwError(()=>error);
      })
    );
  }
}
