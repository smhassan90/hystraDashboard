import { Component, OnInit } from '@angular/core';
import { BusinessService } from '../../Services/Business/business.service';
import { SalesService } from '../../Services/Sales/sales.service';
import { NgxPaginationModule } from "ngx-pagination";

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss']
})
export class ReportsComponent implements OnInit {

  public MIOReportsRawalpindi = [
    {
      date: "05/02/2023",
      providerCode: 'Z64008208',
      providerName: 'Dr Sobia Ameer',
      MIO: 'Akhter - MIO-01',
      district: 'Rawalpindi',
      category: 'A',
      pharmacyCode: '70157300',
      taggedPharmacy: 'W WILSON CHEMISTS',
      monthlySales: '-20',
    },
    {
      date: "05/04/2023",
      providerCode: 'Z64008214',
      providerName: 'Dr Gul Ateeq',
      MIO: 'Akhter - MIO-01',
      district: 'Rawalpindi',
      category: 'C',
      pharmacyCode: '73579863',
      taggedPharmacy: 'A Y NOOR PHARMACY',
      monthlySales: '-5',
    },
    {
      date: "05/04/2023",
      providerCode: 'Z64008161',
      providerName: 'ZOHRA ISRAR',
      MIO: 'Shazia-MIO-02',
      district: 'Rawalpindi',
      category: 'A',
      pharmacyCode: '73560191',
      taggedPharmacy: 'TAJAR WELFARE FOUNDATION MEDICAL STORE',
      monthlySales: '-30',
    },
  ];

  public MIOReportsKarachi = [
    {
      date: "05/02/2023",
      providerCode: 'Z04002105',
      providerName: 'Farhat Seema',
      MIO: 'Azhar-MIO-01',
      district: 'Karachi',
      category: 'A',
      pharmacyCode: '7180300',
      taggedPharmacy: 'ASMA MEDICAL STORE',
      monthlySales: '50',
    },
    {
      date: "05/02/2023",
      providerCode: 'Z04006296',
      providerName: 'ZARAFSHAH SEHAR',
      MIO: 'Azhar-MIO-01',
      district: 'Karachi',
      category: 'A',
      pharmacyCode: '78478400',
      taggedPharmacy: 'Mashallah Medicos',
      monthlySales: '75',
    },
    {
      date: "05/03/2023",
      providerCode: 'Z04003003',
      providerName: 'RIFFAT RANA',
      MIO: 'Azhar-MIO-01',
      district: 'Karachi',
      category: 'A',
      pharmacyCode: '17245909',
      taggedPharmacy: 'Star M/S',
      monthlySales: '10',
    },
    {
      date: "05/03/2023",
      providerCode: 'Z04002818',
      providerName: 'SHAHNAZ ANSARI',
      MIO: 'Noman-MIO-02',
      district: 'Karachi',
      category: 'A',
      pharmacyCode: '17165700',
      taggedPharmacy: 'Dr Shahnaz Ansari pharmacy',
      monthlySales: '50',
    },
  ];

  p: Number = 1;
  // Number of rows per page
  count: Number = 20;

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

  public BusinessAPIData : any = [];
  public CallsExecutedData : any = [];
  public SalesSummaryData : any = [];

  public CallsPlanned : any = [];
  public Planned : any = [];
  public CallsUnplanned : any = [];
  public ActuallyVisited : any = [];
  public NotVisited : any = [];
  public PlannedPercentage : any = [];
  public UnplannedPercentage : any = [];
  public InRange : any = [];
  public OutRange : any = [];
  public GrandTotal : any = [];
  public InRangePercent : any = [];
  public OutRangePercent : any = [];

  public PositionCode : any = [];
  public EmployeeName : any = [];
  public NumberOfDoctors : any = [];
  public NumberOfProvidersActive : any = [];
  public ActivePercentage : any = [];
  public MonthSales : any = [];

  public year: any = "2022";
  public monthId: any = "04";
  public monthName: any = "";

  public StartingDate: any = "";
  public EndingDate: any = "";

  public SalesSummary: any = [];


  constructor(private businessService: BusinessService, private sales: SalesService) { }

  ngOnInit(): void
  {
    // monthName = this.GetMonthNameFromMonthId(monthName, monthId) + " " + year;
    // this.GetBusinessAPIData(this.year, this.monthId, this.monthName);

    this.CallsExecutedData = [];

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

  public SelectStartingDate(value: any): void
  {
    this.StartingDate = value;
    console.log("StartingDate: " + value);
  }

  public SelectEndingDate(value: any): void
  {
    this.EndingDate = value;
    console.log("EndingDate: " + value);

    this.SalesSummaryData = [];

    if(this.StartingDate != "" && this.EndingDate != "")
    {
      this.sales.GetSalesSummary(this.StartingDate, this.EndingDate).subscribe((result) =>
      {
        console.log(result);
        var split = result.data.split(",");
        for(let i = 0; i < split.length; i++)
        {
          var value = split[i].split(":", 2);
          this.SalesSummary.push(value[1]);
        }

        console.log(split);
        for(let i = 0; i < split.length; i+=5)
        {
          var monthSales = this.SalesSummary[i + 4].split("}");
          console.log(monthSales);

          this.SalesSummaryData.push({
            PositionCode : this.SalesSummary[i + 0],
            EmployeeName : this.SalesSummary[i + 1],
            NumberOfDoctors : this.SalesSummary[i + 2],
            NumberOfProvidersActive : this.SalesSummary[i + 3],
            ActivePercentage : Math.round((this.SalesSummary[i + 3] / this.SalesSummary[i + 2]) * 100).toFixed(1),
            MonthSales : monthSales[0],
          })
        }
        console.log(this.SalesSummaryData);
      })
    }
  }

  public SelectYear(value: any): void
  {
    this.year = value;
  }

  public SelectMonth(value: any): void
  {
    if(value != "Select Month")
    {
      this.monthName = value;

      if(this.monthName == "January")
      {
        this.monthId = "01"
      }
      else if(this.monthName == "February")
      {
        this.monthId = "02"
      }
      else if(this.monthName == "March")
      {
        this.monthId = "03"
      }
      else if(this.monthName == "April")
      {
        this.monthId = "04"
      }
      else if(this.monthName == "May")
      {
        this.monthId = "05"
      }
      else if(this.monthName == "June")
      {
        this.monthId = "06"
      }
      else if(this.monthName == "July")
      {
        this.monthId = "07"
      }
      else if(this.monthName == "August")
      {
        this.monthId = "08"
      }
      else if(this.monthName == "September")
      {
        this.monthId = "09"
      }
      else if(this.monthName == "October")
      {
        this.monthId = "10"
      }
      else if(this.monthName == "November")
      {
        this.monthId = "11"
      }
      else if(this.monthName == "December")
      {
        this.monthId = "12"
      }
      this.monthName = this.monthName + " " + this.year;

      for(let i = 0; i < this.BusinessAPIData.length; i++)
      {
        this.BusinessAPIData[i].year = this.year;
        this.BusinessAPIData[i].month = this.monthId;
        this.CallsExecutedData[i].Month = this.monthName;
      }
      this.GetBusinessAPIData(this.year, this.monthId, this.monthName);
    }
  }

  public GetBusinessAPIData(year: any, monthid: any, monthname: any): void
  {
    this.businessService.GetBusinessData(year, monthid).subscribe((result) => {
      this.BusinessAPIData = result;
      this.CallsExecutedData = [];
      console.log("Business API: ", result);

      for(let i = 0; i < this.BusinessAPIData.length; i++)
      {
        this.CallsPlanned[i] = this.BusinessAPIData[i].doctors / this.BusinessAPIData[i].pdoctors;
        this.Planned[i] = this.BusinessAPIData[i].calls / this.BusinessAPIData[i].pcalls;
        this.ActuallyVisited[i] = this.BusinessAPIData[i].calls;
        this.CallsUnplanned[i] = this.ActuallyVisited[i] - this.Planned[i];
        this.NotVisited[i] = this.BusinessAPIData[i].doctors - this.BusinessAPIData[i].covered;
        this.PlannedPercentage[i] = (this.BusinessAPIData[i].pcalls / this.BusinessAPIData[i].calls) * 100;
        this.UnplannedPercentage[i] = 100 - this.Planned[i];
        this.InRange[i] = this.BusinessAPIData[i].green;
        this.OutRange[i] = this.BusinessAPIData[i].red;
        this.GrandTotal[i] = this.InRange[i] + this.OutRange[i];
        this.InRangePercent[i] = this.InRange[i] / this.GrandTotal[i] * 100;
        this.OutRangePercent[i] = this.OutRange[i] / this.GrandTotal[i] * 100;

        this.CallsExecutedData.push({
          Month: monthname,
          CallsPlanned: this.CallsPlanned[i],
          Planned: this.Planned[i],
          CallsUnplanned: this.CallsUnplanned[i],
          ActuallyVisited: this.ActuallyVisited[i],
          NotVisited: this.NotVisited[i],
          PlannedPercentage: this.PlannedPercentage[i],
          UnplannedPercentage: this.UnplannedPercentage[i],
          InRange: this.InRange[i],
          OutRange: this.OutRange[i],
          GrandTotal: this.GrandTotal[i],
          InRangePercent: this.InRangePercent[i],
          OutRangePercent: this.OutRangePercent[i],
        });
      }
      console.log("CallsExecutedData: ", this.CallsExecutedData);
    });
  }

}
