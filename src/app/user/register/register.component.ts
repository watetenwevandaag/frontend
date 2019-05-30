import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { Cook } from 'src/app/models/cook';
import { FormGroup, FormControl } from '@angular/forms';
import { Registercook } from 'src/app/models/registercook';
import { UserdataService } from 'src/app/userdata.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerCook: Registercook = {
    username: '',
    email:'',
    password: ''
  };

  constructor(private userService: UserService, private userData:UserdataService) { }

  registerForm = new FormGroup({
    email: new FormControl(''),
    username: new FormControl(''),
    password: new FormControl(''),
  });

  ngOnInit() {
  }

  onSubmit(){
    this.registerCook.email = this.registerForm.value.email;
    this.registerCook.username = this.registerForm.value.username;
    this.registerCook.password = this.registerForm.value.password;
    this.saveCook();
  }

  saveCook(){
    var succes = 0;
    console.log(succes);
    this.userService.registerUser(this.registerCook).then((loggedInCook: Cook) => {
      if (loggedInCook.username != null) {
        this.userData.setViewData('Login')
        succes = 1;
      } else {
        succes = -1;
      }
    });
    console.log(succes)
  }

}
