import { Injectable } from '@angular/core';
import { HttpClient } from  '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class LoginService {

  public URL: any = "https://hawk.greenstar.org.pk:8441/hystra/loginServerAttempt";

  constructor(private router: Router, private http: HttpClient) { }

  public Login(username: any, password: any): Observable<any>
  {
    var url = this.URL + "?username=" + username + "&password=" + password;
    return this.http.get<any>(url);
  }
}
