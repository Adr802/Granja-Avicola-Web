import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http'
import { Router } from '@angular/router';
import { User } from '../models/user';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  selectedUser: User;
  private URL = 'http://192.168.1.36:3000/api/users'
  constructor(private http: HttpClient, private router: Router) { 
    this.selectedUser = new User();
  }
  signUp(user:User){
      console.log("estoyy en el servicio: " + user.cedula)
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
