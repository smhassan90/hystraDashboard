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

  public BaseURL: any = "https://hawk.greenstar.org.pk:8441/hystra/";

  public SalesTarget: any = "";
  public SalesSummaryURL: any = "";
  public DashboardGraphsURL: any = "";
  public MIOReprtsURL: any = "";

  public APIURL: any = "";
  public Token: any;

  private City = new BehaviorSubject('Karachi');
  getCity = this.City.asObservable();

  private Period = new BehaviorSubject('MTD');
  getPeriod = this.Period.asObservable();

  constructor(private router: Router, private http: HttpClient, private auth: AuthenticationService) {
    // this.Header = this.auth.Header();
    this.Token = auth.GetToken();

    this.SalesTarget = this.BaseURL + "getSalesTarget?" + "token=" + this.Token;
    this.SalesSummaryURL = this.BaseURL + "getMonthlySales?" + "token=" + this.Token;
    this.DashboardGraphsURL = this.BaseURL + "getGraphData?" + "token=" + this.Token;
    this.MIOReprtsURL = this.BaseURL + "getMIOReport?" + "token=" + this.Token;
  }

  public SetCity(city: string) : void
  {
    this.City.next(city);
  }

  public SetPeriod(period: string) : void
  {
    this.Period.next(period);
  }

  public GetSalesTarget(city: any, apiType: any, userType: any, period: any) : Observable<any>
  {
    this.APIURL = this.SalesTarget + "&city=" + city + "&APItype=" + apiType +"&userType=" + userType + "&period=" + period;
    console.log("SalesTarget URL: " + this.APIURL);
    return this.http.get<any>(this.APIURL);
  }

  public GetSalesSummary(fromDate: any, toDate: any) : Observable<any>
  {
    this.APIURL = this.SalesSummaryURL + "&fromDate=" + fromDate + "&toDate=" + toDate;
    console.log("Sales Summary URL: " + this.APIURL);
    return this.http.get<any>(this.APIURL);
  }

  public GetGraphData(apiType: any, userType: any) : Observable<any>
  {
    this.APIURL = this.DashboardGraphsURL + "&type=" + apiType +"&positionCode=" + userType;
    console.log("Dashboard Graphs URL: " + this.APIURL);
    return this.http.get<any>(this.APIURL);
  }

  public GetMIOReprtData(team: any) : Observable<any>
  {
    this.APIURL = this.MIOReprtsURL + "&team=" + team;
    console.log("Dashboard Graphs URL: " + this.APIURL);
    return this.http.get<any>(this.APIURL);
  }
}
