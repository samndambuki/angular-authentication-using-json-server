import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

//declares a class as an injectable service
@Injectable({
  //makes it available throughout the application
  providedIn: 'root'
})

//handles authentication operations by interacting with the backend server

export class AuthService {

  //http client - angular module used to make http requests
  constructor(private http: HttpClient) { }

  //base url
  apiUrl = 'http://localhost:3000/user'

  //retrieve all user data
  GetAll() {
    return this.http.get(this.apiUrl)
  }

  GetByCode(code: any) {
    return this.http.get(this.apiUrl + '/' + code)
  }

  //registration data is sent in the request body
  ProceedRegister(inputData: any) {
    return this.http.post(this.apiUrl, inputData)
  }

  //update user data specified by a specific code
  //updated data included in the request body
  upDateUser(code: any, inputData: any) {
    return this.http.post(this.apiUrl + '/' + code, inputData)
  }

  IsLoggedIn() {
    //the function checks if there is a value stored in the username key in the session storage
    //if the value is not null it implies that there is a user considered logged in and the function returns true otherwise it returns false
    return sessionStorage.getItem('username') != null;
  }

  GetUserrole() {
    //we check if there is a value stored in the username key in the session storage 
    //if value is not null, we get the value of the username converted to a string using the toString() method 
    //if value is null we return an empty string
    return sessionStorage.getItem('username') != null ? sessionStorage.getItem('username')?.toString() : ''
  }
}



/*NAMING CONVECTIONS*/
//1. camelCase - variable names, method names, function names
//2. PascalCase - Classes
//3. SCREAMING_SNAKE_CASE - used for constants      E.G // const MAX_COUNT = 10;