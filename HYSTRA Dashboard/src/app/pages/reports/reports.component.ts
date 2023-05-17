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
  public IslamabadSelected: boolean = false;

  public SelectedCity: string = "Karachi";

  public MIOBorder: string;
  public CallsBorder: string;
  public MMSBorder: string;

  constructor() { }

  ngOnInit(): void {
    this.IsMioReports = true;
    this.MIOBorder = "5px solid lightgray";
    this.CallsBorder = "none";
    this.MMSBorder = "none";
  }

  public OnClickMIOReports(): void
  {
    this.IsMioReports = true;
    this.IsCallExecuted = false;
    this.IsMSS = false;

    this.MIOBorder = "5px solid lightgray";
    this.CallsBorder = "none";
    this.MMSBorder = "none";
  }

  public OnClickCallExecuted(): void
  {
    this.IsCallExecuted = true;
    this.IsMioReports = false;
    this.IsMSS = false;

    this.MIOBorder = "none";
    this.CallsBorder = "5px solid lightgray";
    this.MMSBorder = "none";
  }

  public OnClickMSS(): void
  {
    this.IsMSS = true;
    this.IsMioReports = false;
    this.IsCallExecuted = false;

    this.MIOBorder = "none";
    this.CallsBorder = "none";
    this.MMSBorder = "5px solid lightgray";
  }

  public SelectKarachi(): void
  {
    this.SelectedCity = "Karachi";
    this.KarachiSelected = true;
    this.RawalpindiSelected = false;
    this.IslamabadSelected = false;
  }

  public SelectRawalpindi(): void
  {
    this.SelectedCity = "Rawalpindi";
    this.KarachiSelected = false;
    this.RawalpindiSelected = true;
  }

  public SelectIslamabad(): void
  {
    this.SelectedCity = "Islamabad";
    this.KarachiSelected = false;
    this.IslamabadSelected = true;
  }

}
