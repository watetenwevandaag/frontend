import { Component, OnInit } from '@angular/core';
import { LoginUser } from 'src/app/models/login-user';
import { Cook } from 'src/app/models/cook';
import { UserService } from '../user.service';
import { appInitializerFactory } from '@angular/platform-browser/src/browser/server-transition';
import { UserdataService } from 'src/app/userdata.service';
import { error } from 'util';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginUser: LoginUser = {
    username: '',
    password: ''
  };

  loggedInCook: Cook = {
    username: null,
    email:'',
    ownRecipes: null
  };

  succes = 0;
  processing = false;

  constructor(
    private userService: UserService,
    private userData: UserdataService) { }

  ngOnInit() {
  }

  loginAttempt(loginUser: LoginUser){
    
    this.userService.loginUser(loginUser).then((loggedInCook: Cook) => {
      this.loggedInCook = loggedInCook;
      console.log("Succes")
      this.succes = 1;
      this.userData.setCook(loggedInCook);
      this.userData.setViewData('Start');
    },
    error =>{
      console.log("Mislukt")
      this.succes = -1;
      this.resetLogin();
    });

    
  }

  resetLogin(){
    this.loginUser = {
      username: '',
      password: ''
      };
    this.loggedInCook = {
        username: null,
        email:'',
        ownRecipes: null
      };
  }

}
