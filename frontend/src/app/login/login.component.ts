import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  user = {
    email:'',
    password:''
  }
  constructor(private authService:AuthService, private router:Router){
    
  }
  signIn(){
    this.authService.signIn(this.user)
    .subscribe(
      res=>{
        console.log(res)
        localStorage.setItem('token',res.token);
        this.router.navigate(['/private']);
      },
      err=>{
        console.log(err);
      }
    )
  }
}
