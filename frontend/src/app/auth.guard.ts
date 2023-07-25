import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Injectable } from '@angular/core';
import { AuthService } from './services/auth.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router:Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    if (this.authService.loggedIn()) {
      return true; // Si el usuario está autenticado, permite la navegación.
    } else {
      // Si el usuario no está autenticado, puedes redirigirlo a la página de inicio de sesión u otra página.
      // Por ejemplo, supongamos que tienes una página de inicio de sesión llamada '/login':
      this.router.navigate(['/login']);
      return false;
    }
  }
}
