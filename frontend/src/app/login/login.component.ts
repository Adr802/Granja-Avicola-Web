import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  errorMessage: string | null = null;

  user = {
    email:'',
    password:''
  }
  constructor(private authService:AuthService, private router:Router){
    
  }
  signIn() {
    this.authService.signIn(this.user).subscribe(
      (res) => {
        console.log(res);
        localStorage.setItem('token', res.token);
        this.router.navigate(['/private']);
      },
      (err) => {
        if (err.status === 401) {
          this.errorMessage = 'Credenciales incorrectas. Por favor, verifica tus datos.';
        } else if (err.status === 500) {
          this.errorMessage = 'Error interno del servidor. Por favor, intenta más tarde.';
        } else {
          this.errorMessage = 'Ocurrió un error desconocido.';
        }

        setTimeout(() => {
          this.errorMessage = null; // Ocultar el mensaje después de unos segundos
        }, 5000); // Puedes ajustar el tiempo de visualización del mensaje aquí
      }
    );
  }
}
