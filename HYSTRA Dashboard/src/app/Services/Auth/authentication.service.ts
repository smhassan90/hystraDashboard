import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpHeaders } from '@angular/common/http';
import { LoginService } from '../Login/login.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private Token: string;
  private IsLogin: string = '';

  constructor(private router: Router, private loginService: LoginService) { }

  public SaveToken(token: string): void {
    localStorage.setItem('Token', token);
    this.Token = token;
  }

  public GetToken(): string {
    if (!this.Token) {
      this.Token = localStorage.getItem('Token');
    }
    return this.Token;
  }

  public SaveLogin(isLogin: string): void {
    localStorage.setItem('Login', isLogin);
    this.IsLogin = isLogin;
  }

  public GetLogin(): string {
    if (!this.IsLogin) {
      this.IsLogin = localStorage.getItem('Login');
    }
    console.log("Get Login Value: " + this.IsLogin);
    return this.IsLogin;
  }

  public IsLoggedIn(): boolean {
    var login = this.GetLogin();
    if (login === 'true') {
      return true;
    }
    else {
      this.Logout();
      return false;
    }

    // var token = this.GetToken();
    // let payload;
    // if (token && token != 'Invalid') {
    //   payload = token.split('.')[1];
    //   payload = window.atob(payload);
    //   var data = [];
    //   data.push(JSON.parse(payload));

    //   // console.log(data[0].exp > Date.now() / 1000);

    //   if (data[0].exp > Date.now() / 1000) {
    //     return true;
    //   }
    //   else {
    //     // expiry date is less than the current date than logout
    //     // this.Logout();
    //     return false;
    //   }
    // }
  }

  public Logout(): void {
    this.IsLogin = 'false';
    localStorage.setItem('Login', this.IsLogin);
    this.router.navigateByUrl('/login');
  }

  public Header(): any {
    var header = {
      headers: new HttpHeaders()
        .set('Authorization', 'Bearer ' + this.GetToken())
    }
    return header;
  }
}
