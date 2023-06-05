import { Component, OnInit, ElementRef } from '@angular/core';
import { ROUTES } from '../sidebar/sidebar.component';
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  public KarachiSelected: boolean = true;
  public RawalpindiSelected: boolean = false;
  public AllDistrictsSelected: boolean = false;

  public MTDSelected: boolean = true;
  public YTDSelected: boolean = false;
  public PTDSelected: boolean = false;

  public SelectedCity: string = "Karachi";
  public SelectedPeriodFilter: string = "MTD";

  public focus;
  public listTitles: any[];
  public location: Location;
  constructor(location: Location,  private element: ElementRef, private router: Router) {
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
    this.RawalpindiSelected = false;
    this.AllDistrictsSelected = false;
  }

  public SelectRawalpindi(): void
  {
    this.SelectedCity = "Rawalpindi";
    this.RawalpindiSelected = true;
    this.KarachiSelected = false;
    this.AllDistrictsSelected = false;
  }

  public SelectAllDistricts(): void
  {
    this.SelectedCity = "All Districts";
    this.KarachiSelected = true;
    this.RawalpindiSelected = true;
    this.AllDistrictsSelected = true;
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
