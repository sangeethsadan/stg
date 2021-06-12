import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse
} from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { HttpCacheService } from '../services/http-cache.service';
import { tap } from 'rxjs/operators';

@Injectable()
export class HttpCacheInterceptor implements HttpInterceptor {

  constructor(
    private cacheService: HttpCacheService
  ) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const response = this.cacheService.get(request.url);
    if (response) {
      return of(response);
    }
    return next.handle(request).pipe(tap(event => {
      if (event instanceof HttpResponse) {
        this.cacheService.put(request.url, event);
      }
    }));
  }
}
