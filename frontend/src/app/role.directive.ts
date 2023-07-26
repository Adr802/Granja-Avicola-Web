import { Directive, OnInit, TemplateRef, ViewContainerRef,Input } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { User } from './models/user';
import { UserService } from './services/user.service';
@Directive({
  selector: '[appRole]'
})
export class RoleDirective implements OnInit{

  private permission = '';
  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef,
    private jwt: JwtHelperService,
    private userService:UserService
  ) { }
  ngOnInit(): void {
    this.checkTokenAndDecode();
  }
  @Input()
  set appRole(val: Array<string>){ //[ROLES AQUI QUE VIENEN DESDE EL HTML]
    console.log('ROL', val);
    this.permission = JSON.stringify(val);
    this.viewContainer.createEmbeddedView(this.templateRef);
    this.updateView();
  }
  private updateView(){
    this.viewContainer.clear();
    if(this.checkPermission()){
      this.viewContainer.createEmbeddedView(this.templateRef);
    }
  }

  private checkPermission(): boolean {
    
    const u = this.permission.replace(/[\[\]"']/g, '');
    console.log('Checkeando permi: ' + this.userService.users.role + " "  + u);
    if(this.userService.users.role === this.permission.replace(/[\[\]"']/g, '')){
      return true;    
    }else{
      return false;    
    }
  }
  private checkTokenAndDecode(): void {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decodedToken = this.jwt.decodeToken(token);
        console.log('Contenido original del token:', decodedToken._id);
        this.userService.getUser(decodedToken._id)
        .subscribe(res=>{
          this.userService.users = res as User;
          console.log(this.userService.users);
          this.updateView()
        })

        
      } catch (error) {
        console.error('Error al decodificar el token:', error);
      }
    } else {
      console.error('No se encontró ningún token en el almacenamiento local.');
    }
  }
}

