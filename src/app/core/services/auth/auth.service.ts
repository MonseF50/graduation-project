import { HttpClient } from '@angular/common/http';
import { inject, Injectable, PLATFORM_ID } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { SignUp } from '../../../shared/interfaces/sign-up';
import { Login } from '../../../shared/interfaces/login';
import { Router } from '@angular/router';
import { ForgetPasswordObject } from '../../../shared/interfaces/forger/forget-password-object';
import { IVerifyCodeResponse } from '../../../shared/interfaces/varify-code/iverify-code-response';
import { environment } from '../../environments/environment';
import { jwtDecode } from "jwt-decode";
import { UserData } from '../../../shared/interfaces/user-data';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private httpclient: HttpClient, private router: Router) { }
  userData!: UserData;
  //* function to send request from data form  to register
  signUp(signupObject: SignUp): Observable<any> {
    return this.httpclient.post(`${environment.baseUrl}/auth/signup`, signupObject)
  }
  //* function to send request from data form login
  login(loginObject: Login): Observable<any> {
    return this.httpclient.post(`${environment.baseUrl}/auth/signin`, loginObject)
  }
  logOut(): void {
    localStorage.removeItem('userToken');
    this.router.navigate(['/login'])
  }
  forgetPassword(form: ForgetPasswordObject): Observable<any> {
    return this.httpclient.post(`${environment.baseUrl}/auth/forgotPasswords`, form)
  }
  verifyCode(form: IVerifyCodeResponse): Observable<any> {
    return this.httpclient.post(`${environment.baseUrl}/auth/verifyResetCode`, form)
  }
  restPassword(form: any): Observable<any> {
    return this.httpclient.put(`${environment.baseUrl}/auth/resetPassword`, form)
  }
  // method that show the user data afetr login 
  getUserData() {
    this.userData = jwtDecode(localStorage.getItem('userToken')!);
  }
}