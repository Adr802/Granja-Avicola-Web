import { AuthService } from './../services/auth.service';
import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { User } from '../models/user';
@Component({
selector: 'app-registro-usuarios',
templateUrl: './registro-usuarios.component.html',
styleUrls: ['./registro-usuarios.component.css']
})
export class RegistroUsuariosComponent {
	authService;
	constructor( authService: AuthService){
		this.authService = authService;
	}
	addUser(form:NgForm){
		console.log("ENTRE" + form.value)
		this.authService.signUp(form.value)
		.subscribe(res=>{
		console.log(res);
		this.resetForm(form)
		})
	  }
	resetForm(form?:NgForm){
	if(form){
		form.reset();
		this.authService.selectedUser=new User();
		}
	}
}

