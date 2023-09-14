import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { AuthenticationService } from '../Auth/authentication.service';


@Injectable({
  providedIn: 'root'
})
export class SalesService {

  // public Header;

  public BaseURL: any = "https://hawk.greenstar.org.pk:8441/hystra/getSalesTarget?";
  public APIURL: any = "";

  private City = new BehaviorSubject('Karachi');
  getCity = this.City.asObservable();

  private Period = new BehaviorSubject('Karachi');
  getPeriod = this.Period.asObservable();

  constructor(private router: Router, private http: HttpClient, private auth: AuthenticationService) {
    // this.Header = this.auth.Header();
    this.BaseURL = this.BaseURL + "token=" + auth.GetToken();
  }

  public SetCity(city: string) : void
  {
    this.City.next(city);
  }

  public SetPeriod(period: string) : void
  {
    this.Period.next(period);
  }

  public GetSalesTarget(city: any, apiType: any, userType: any, period: any) : Observable<any> {

    this.APIURL = this.BaseURL + "&city=" + city + "&APItype=" + apiType +"&userType=" + userType + "&period=" + period;
    console.log("API URL: " + this.APIURL);
    return this.http.get<any>(this.APIURL);
  }
}
