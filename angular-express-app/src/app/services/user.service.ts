import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseService } from "../services/base.service"

@Injectable({
  providedIn: "root"
})
export class UserService extends BaseService {

  constructor(http: HttpClient) {
    super(http);
  }

  /*
  signup(signupData: any) {
    return this.http.post(`${this.baseUrl}/user/signup`, signupData, { responseType: 'text' });
  }

  login(loginData: any) {
    return this.http.post(`${this.baseUrl}/user/login`, loginData, { responseType: 'text' });
  }
  */
  
}
