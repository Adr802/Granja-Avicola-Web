import { AuthService } from './../services/auth.service';
import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { User } from '../models/user';
import { UserService } from '../services/user.service';

@Component({
selector: 'app-registro-usuarios',
templateUrl: './registro-usuarios.component.html',
styleUrls: ['./registro-usuarios.component.css']
})
export class RegistroUsuariosComponent {
	authService;
	userService;
	constructor( authService: AuthService, userService : UserService){
		this.authService = authService;
		this.userService = userService;
	}
	addUser(form:NgForm){
		this.authService.signUp(form.value)
		.subscribe(res=>{
		console.log(res);
		this.resetForm(form)
		})
		location.reload();
	}
	resetForm(form?:NgForm){
	if(form){
		form.reset();
		this.authService.selectedUser=new User();
		}
	}
	getUsers(){
		this.userService.getUsers()
		.subscribe(res=>{
			this.userService.userss = res as User[];
		})
	}
	deleteUser(id:String){
		const shouldDelete = window.confirm('¿Estás seguro que deseas eliminar este usuario?');
		if (shouldDelete) {
			this.authService.deleteUser(id)
			.subscribe(res=>{
				location.reload();
			})
		}
		
	}

	ngOnInit():void{
		this.getUsers();
	}
}

