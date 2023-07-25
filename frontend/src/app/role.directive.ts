import { Directive, OnInit, TemplateRef, ViewContainerRef,Input } from '@angular/core';

@Directive({
  selector: '[appRole]'
})
export class RoleDirective implements OnInit{

  currentUser={
    role:'operator'
  }
  private permission = '';
  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef
  ) { }
  ngOnInit(): void {
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
    /*
    const u = this.permission.replace(/[\[\]"']/g, '');
    console.log('Checkeando permi: ' + this.currentUser.role.toUpperCase() + " "  + u);*/
    if(this.currentUser.role === this.permission.replace(/[\[\]"']/g, '')){
      return true;    
    }else{
      return false;    
    }
  }
}
