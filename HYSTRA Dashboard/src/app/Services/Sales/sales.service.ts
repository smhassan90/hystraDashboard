import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { AuthenticationService } from '../Auth/authentication.service';


@Injectable({
  providedIn: 'root'
})
export class SalesService {

  // public Header;

  public BaseURL: any = "https://hawk.greenstar.org.pk:8441/hystra/getSalesTarget?";
  public APIURL: any = "";

  constructor(private router: Router, private http: HttpClient, private auth: AuthenticationService) {
    // this.Header = this.auth.Header();
    this.BaseURL = this.BaseURL + "token=" + auth.GetToken();
  }

  public GetSalesTarget(city: any, apiType: any, userType: any): Observable<any> {

    this.APIURL = this.BaseURL + "&city=" + city + "&APItype=" + apiType +"&userType=" + userType;
    console.log("API URL: " + this.APIURL);
    return this.http.get<any>(this.APIURL);
  }
}
