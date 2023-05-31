import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss']
})
export class ReportsComponent implements OnInit {

  public IsMioReports: boolean = false;
  public IsCallExecuted: boolean = false;
  public IsMSS: boolean = false;

  public KarachiSelected: boolean = true;
  public RawalpindiSelected: boolean = false;
  public AllDistrictsSelected: boolean = false;

  public MIOSelected: boolean = true;
  public CHOSelected: boolean = false;
  public AllTypesSelected: boolean = false;

  public SelectedCity: string = "Karachi";
  public SelectedType: string = "MIO";

  public MIOBorder: string;
  public CallsBorder: string;
  public MMSBorder: string;

  constructor() { }

  ngOnInit(): void
  {
    this.IsMioReports = true;
    this.MIOBorder = "6px solid #f3603994";
    this.CallsBorder = "none";
    this.MMSBorder = "none";
  }

  public OnClickMIOReports(): void
  {
    this.IsMioReports = true;
    this.IsCallExecuted = false;
    this.IsMSS = false;

    this.MIOBorder = "6px solid #f3603994";
    this.CallsBorder = "none";
    this.MMSBorder = "none";
  }

  public OnClickCallExecuted(): void
  {
    this.IsCallExecuted = true;
    this.IsMioReports = false;
    this.IsMSS = false;

    this.MIOBorder = "none";
    this.CallsBorder = "6px solid #f3603994";
    this.MMSBorder = "none";
  }

  public OnClickMSS(): void
  {
    this.IsMSS = true;
    this.IsMioReports = false;
    this.IsCallExecuted = false;

    this.MIOBorder = "none";
    this.CallsBorder = "none";
    this.MMSBorder = "6px solid #f3603994";
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

  public SelectAllTypes(): void
  {
    this.SelectedType = "All";
    this.MIOSelected = true;
    this.CHOSelected = true;
  }

  public SelectMIO(): void
  {
    this.SelectedType = "MIO";
    this.MIOSelected = true;
    this.CHOSelected = false;
  }

  public SelectCHO(): void
  {
    this.SelectedType = "CHO";
    this.MIOSelected = false;
    this.CHOSelected = true;
  }

}
