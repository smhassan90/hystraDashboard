import { Injectable } from '@angular/core';
import { HttpClient } from  '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BusinessService {

  public URL : any = "https://greenstar.ikonbusiness.com/provider/api/TsoCalls?teamId=09&";//year=2022&monthid=02&guid=4c5fdbc5-d8c6-468c-9d67-b3c7bbf3c396";
  // public URL : any = "https://greenstar.ikonbusiness.com/provider/api/tsocalls?";//year=2022&monthid=02&guid=4c5fdbc5-d8c6-468c-9d67-b3c7bbf3c396";

  constructor(private router: Router, private http: HttpClient) { }

  public GetBusinessData(year: any, monthId: any) : Observable<any>
  {
    return this.http.get(this.URL + "year=" + year + "&monthid=" + monthId + "&guid=4c5fdbc5-d8c6-468c-9d67-b3c7bbf3c396");
  }
}
