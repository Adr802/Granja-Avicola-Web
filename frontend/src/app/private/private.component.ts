import { Component } from '@angular/core';
import { UserService } from '../services/user.service';
@Component({
  selector: 'app-private',
  templateUrl: './private.component.html',
  styleUrls: ['./private.component.css']
})
export class PrivateComponent {
  constructor(public userService : UserService){

  }
}
