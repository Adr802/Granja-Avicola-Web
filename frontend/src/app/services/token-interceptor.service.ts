import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { AuthService } from './auth.service';
@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor{

  constructor(private authService: AuthService) { }
  intercept(req:any, next:any){
    const token = localStorage.getItem('token');
    console.log(token)
    const tokenizeReq = req.clone({
      setHeaders: {
        Authorization :  'Bearer ' + token
      }
    })
    return next.handle(tokenizeReq);
  }
}
