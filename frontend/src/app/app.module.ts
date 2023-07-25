import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { InicioComponent } from './inicio/inicio.component';
import { LoginComponent } from './login/login.component';
import { MenuComponent } from './menu/menu.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RegistroUsuariosComponent } from './registro-usuarios/registro-usuarios.component';
import { PrivateComponent } from './private/private.component';
import { AuthGuard } from './auth.guard';

const rutas: Routes= [
  { path: 'inicio', component: InicioComponent },
  { path: 'login', component: LoginComponent },
  { path: 'registro', component: RegistroUsuariosComponent },
  { path: 'private', component:PrivateComponent, canActivate: [AuthGuard]},
  { path: '', redirectTo: '/inicio', pathMatch: 'full'},
  { path: '**', redirectTo:'/inicio'}
  ];

@NgModule({
  declarations: [
    AppComponent,
    InicioComponent,
    LoginComponent,
    MenuComponent,
    HeaderComponent,
    FooterComponent,
    DashboardComponent,
    RegistroUsuariosComponent,
    PrivateComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(rutas)
  ],
  providers: [AuthGuard ],
  bootstrap: [AppComponent]
})
export class AppModule { }