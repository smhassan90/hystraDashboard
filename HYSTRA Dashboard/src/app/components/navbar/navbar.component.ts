import { Component, OnInit, ElementRef } from '@angular/core';
import { ROUTES } from '../sidebar/sidebar.component';
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { Router } from '@angular/router';
import { BusinessService } from '../../Services/Business/business.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  public KarachiSelected: boolean = true;
  public IslamabadSelected: boolean = false;
  public AllDistrictsSelected: boolean = false;

  public MTDSelected: boolean = true;
  public YTDSelected: boolean = false;
  public PTDSelected: boolean = false;

  public SelectedCity: string = "Karachi";
  public SelectedPeriodFilter: string = "MTD";

  public focus;
  public listTitles: any[];
  public location: Location;
  constructor(location: Location, private element: ElementRef, private router: Router, private businessService: BusinessService) {
    this.location = location;
  }

  ngOnInit() {
    this.listTitles = ROUTES.filter(listTitle => listTitle);
  }
  getTitle(){
    var titlee = this.location.prepareExternalUrl(this.location.path());
    if(titlee.charAt(0) === '#'){
        titlee = titlee.slice( 1 );
    }

    for(var item = 0; item < this.listTitles.length; item++){
        if(this.listTitles[item].path === titlee){
            return this.listTitles[item].title;
        }
    }
    return 'Dashboard';
  }

  public SelectKarachi(): void
  {
    this.SelectedCity = "Karachi";
    this.KarachiSelected = true;
    this.IslamabadSelected = false;
    this.AllDistrictsSelected = false;

    this.businessService.SetCity(this.SelectedCity);
  }

  public SelectIslamabad(): void
  {
    this.SelectedCity = "Islamabad";
    this.IslamabadSelected = true;
    this.KarachiSelected = false;
    this.AllDistrictsSelected = false;

    this.businessService.SetCity(this.SelectedCity);
  }

  public SelectAllDistricts(): void
  {
    this.SelectedCity = "All Districts";
    this.KarachiSelected = true;
    this.IslamabadSelected = true;
    this.AllDistrictsSelected = true;

    this.businessService.SetCity(this.SelectedCity);
  }

  public SelectMTD(): void
  {
    this.SelectedPeriodFilter = "MTD";
    this.MTDSelected = true;
    this.YTDSelected = false;
    this.PTDSelected = false;
  }

  public SelectYTD(): void
  {
    this.SelectedPeriodFilter = "YTD";
    this.YTDSelected = true;
    this.PTDSelected = false;
    this.MTDSelected = false;
  }

  public SelectPTD(): void
  {
    this.SelectedPeriodFilter = "PTD";
    this.PTDSelected = true;
    this.MTDSelected = false;
    this.YTDSelected = false;
  }

}
