import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoginUser } from '../models/login-user';
import { Cook } from '../models/cook';
import { Registercook } from '../models/registercook';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private cookUrl = '/cook';
  private apiUrl = 'http://localhost:8090' + this.cookUrl;

  constructor (private http: HttpClient) { }

  loginUser(loginUser: LoginUser): Promise<Cook> {
    return this.http.post(this.apiUrl + '/login', loginUser)
               .toPromise()
               .then(response => response as Cook)
               .catch(this.handleError);
  }

  registerUser(registerUser: Registercook): Promise<Cook> {
    return this.http.post(this.apiUrl + '/register', registerUser)
               .toPromise()
               .then(response => response as Cook)
               .catch(this.handleError);
  }

  testLoginUser(loginUser: LoginUser){
    return this.http.post(this.apiUrl + '/login', loginUser)
  }


  private handleError (error: any): Promise<any> {
    const errMsg = (error.message) ? error.message :
    error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(errMsg); // log to console
    return Promise.reject(errMsg);
  }
}
