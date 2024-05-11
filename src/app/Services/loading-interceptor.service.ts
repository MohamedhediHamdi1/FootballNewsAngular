import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoadingServiceService } from './loading-service.service';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoadingInterceptorService implements HttpInterceptor{

  constructor(private loadingService: LoadingServiceService) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    this.loadingService.showLoading();

    return next.handle(request).pipe(
      tap(
        (event) => {
          if (event instanceof HttpResponse) {
            this.loadingService.hideLoading();
          }
        },
        (error) => {
          this.loadingService.hideLoading();
        }
      )
    );
  }
  
}
