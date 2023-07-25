import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http'
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private URL = 'http://localhost:3000/api/users'
  constructor(private http: HttpClient, private router: Router) { 
  }
  signUp(user:any){
      return this.http.post<any>(this.URL + '/registro', user);
  }
  signIn(user:any){
    return this.http.post<any>(this.URL + '/ingreso', user);
  }

  loggedIn(): Boolean{
    if(localStorage.getItem('token')){
      return true;
    }else{
      return false;
    }
  }
  getToken(){
    return localStorage.getItem('token');
  }
  logout(){
    localStorage.removeItem('token');
    this.router.navigate(['/signin'])
  }
}
