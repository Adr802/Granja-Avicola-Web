import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  readonly URL_API='http://localhost:3000/api/users/user';
  users : User = new User();
  constructor(private http: HttpClient) {

   }
  getUser(id:any){
    return this.http.get(this.URL_API+'/'+id);
   }
}
