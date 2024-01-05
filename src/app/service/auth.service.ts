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
}
