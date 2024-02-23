import { Component, OnInit, ElementRef } from '@angular/core';
import { ROUTES } from '../sidebar/sidebar.component';
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { Router } from '@angular/router';
import { SalesService } from '../../Services/Sales/sales.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  public KarachiSelected: boolean = true;
  public IslamabadSelected: boolean = false;
  public RawalpindiSelected: boolean = false;
  public AllDistrictsSelected: boolean = false;

  public MTDSelected: boolean = true;
  public YTDSelected: boolean = false;
  public PTDSelected: boolean = false;

  public SelectedCity: string = "Karachi";
  public SelectedPeriodFilter: string = "mtd";
  public SelectedPeriodFilterDisplayText: string = "MTD";

  public focus;
  public listTitles: any[];
  public location: Location;
  constructor(location: Location, private element: ElementRef, private router: Router, private sales: SalesService) {
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
    this.RawalpindiSelected = false;
    this.AllDistrictsSelected = false;

    this.sales.SetCity(this.SelectedCity);
  }

  // public SelectIslamabad(): void
  // {
  //   this.SelectedCity = "Islamabad";
  //   this.IslamabadSelected = true;
  //   this.KarachiSelected = false;
  //   this.RawalpindiSelected = false;
  //   this.AllDistrictsSelected = false;

  //   this.sales.SetCity(this.SelectedCity);
  // }

  public SelectRawalpindi(): void
  {
    this.SelectedCity = "Rawalpindi";
    this.RawalpindiSelected = true;
    this.IslamabadSelected = true;
    this.KarachiSelected = false;
    this.AllDistrictsSelected = false;

    this.sales.SetCity(this.SelectedCity);
  }

  public SelectAllDistricts(): void
  {
    this.SelectedCity = "All Districts";
    this.KarachiSelected = true;
    this.IslamabadSelected = true;
    this.RawalpindiSelected = true;
    this.AllDistrictsSelected = true;

    this.sales.SetCity("ALL");
  }

  public SelectMTD(): void
  {
    this.SelectedPeriodFilter = "mtd";
    this.SelectedPeriodFilterDisplayText = "MTD";
    this.MTDSelected = true;
    this.YTDSelected = false;
    this.PTDSelected = false;

    this.sales.SetPeriod(this.SelectedPeriodFilter);
  }

  public SelectYTD(): void
  {
    this.SelectedPeriodFilter = "ytd";
    this.SelectedPeriodFilterDisplayText = "YTD";
    this.YTDSelected = true;
    this.PTDSelected = false;
    this.MTDSelected = false;

    this.sales.SetPeriod(this.SelectedPeriodFilter);
  }

  public SelectPTD(): void
  {
    this.SelectedPeriodFilter = "ptd";
    this.SelectedPeriodFilterDisplayText = "PTD";
    this.PTDSelected = true;
    this.MTDSelected = false;
    this.YTDSelected = false;

    this.sales.SetPeriod(this.SelectedPeriodFilter);
  }

}
