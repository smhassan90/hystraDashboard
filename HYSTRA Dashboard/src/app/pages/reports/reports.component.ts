import { Component, OnInit } from '@angular/core';
import { BusinessService } from '../../Services/Business/business.service';
import { SalesService } from '../../Services/Sales/sales.service';
import { NgxPaginationModule } from "ngx-pagination";
import { ngxCsv } from 'ngx-csv/ngx-csv';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss']
})
export class ReportsComponent implements OnInit {

  p: Number = 1;
  // Number of rows per page
  count: Number = 20;

  public IsMioReports: boolean = false;
  public IsCallExecuted: boolean = false;
  public IsMSS: boolean = false;

  public KarachiSelected: boolean = true;
  public IslamabadSelected: boolean = true;
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

  public Districts : any = [];
  public Names : any = [];
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

  public year: any = "";
  public monthId: any = "";
  public monthName: any = "";
  public yearMonthName: any = "";

  public StartingDate: any = "";
  public EndingDate: any = "";

  public SalesSummary: any = [];
  public MIOReportsData: any = [];


  constructor(private businessService: BusinessService, private sales: SalesService) { }

  ngOnInit(): void
  {
    this.CallsExecutedData = [];

    this.IsMioReports = true;
    this.MIOBorder = "6px solid #f3603994";
    this.CallsBorder = "none";
    this.MMSBorder = "none";

    this.GetMIOReportsData();
  }

  // --------------- Download Report Functions ----------------
  public DownloadMIOReports(): void
  {
    let options = {
      fieldSeparator: ',',
      quoteStrings: '"',
      decimalseparator: '.',
      showLabels: false,
      showTitle: false,
      title: 'Your title',
      useBom: false,
      noDownload: false,
      headers: ['Index', 'Date', 'ProviderCode', 'ProviderName', 'MIO', 'District', 'Category', 'PharmacyCode', 'TaggedPharmacy', 'MonthlySales']
    };

    new ngxCsv(this.MIOReportsData, "MIOReportsData", options);
  }

  public DownloadCallExecutedReports(): void
  {
    let options = {
      fieldSeparator: ',',
      quoteStrings: '"',
      decimalseparator: '.',
      showLabels: false,
      showTitle: false,
      title: 'Your title',
      useBom: false,
      noDownload: false,
      headers: [ 'Month', 'District', 'Name', 'CallsPlanned', 'Planned', 'CallsUnplanned', 'ActuallyVisited', 'NotVisited', 'PlannedPercentage', 'UnplannedPercentage', 'InRange', 'OutRange', 'GrandTotal', 'InRangePercent', 'OutRangePercent']
    };

    new ngxCsv(this.CallsExecutedData, "CallExecutedReport", options);
  }

  public DownloadMonthlySalesReports(): void
  {
    let options = {
      fieldSeparator: ',',
      quoteStrings: '"',
      decimalseparator: '.',
      showLabels: false,
      showTitle: false,
      title: 'Your title',
      useBom: false,
      noDownload: false,
      headers: ['PositionCode', 'EmployeeName', 'NumberOfDoctors', 'NumberOfProvidersActive', 'ActivePercentage', 'MonthSales']
    };

    new ngxCsv(this.SalesSummaryData, "MonthlySalesSummaryReport", options);
  }
  // ====================================================================

  // --------------- Select MIO or CHO ----------------
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
  // ====================================================================

  // --------------- Select District ----------------
  public SelectKarachi(): void
  {
    this.SelectedCity = "Karachi";
    this.KarachiSelected = true;
    this.RawalpindiSelected = false;
    this.IslamabadSelected = false;
    this.AllDistrictsSelected = false;
  }

  public SelectIslamabad(): void
  {
    this.SelectedCity = "Islamabad";
    this.IslamabadSelected = true;
    this.KarachiSelected = false;
    this.RawalpindiSelected = false;
    this.AllDistrictsSelected = false;
  }

  public SelectRawalpindi(): void
  {
    this.SelectedCity = "Rawalpindi";
    this.RawalpindiSelected = true;
    this.KarachiSelected = false;
    this.IslamabadSelected = false;
    this.AllDistrictsSelected = false;
  }

  public SelectAllDistricts(): void
  {
    this.SelectedCity = "All Districts";
    this.KarachiSelected = true;
    this.RawalpindiSelected = true;
    this.IslamabadSelected = true;
    this.AllDistrictsSelected = true;
  }
  // ====================================================================

  // --------------- Select Date ----------------
  public SelectStartingDate(value: any): void
  {
    this.StartingDate = value;
    console.log("StartingDate: " + value);
  }

  public SelectEndingDate(value: any): void
  {
    this.EndingDate = value;
    console.log("EndingDate: " + value);
  }

  public SelectYear(value: any): void
  {
    this.year = value;
    this.yearMonthName = this.monthName + " " + this.year;
  }

  public SelectMonth(value: any): void
  {
    this.monthName = value;

    if(this.monthName == "Select Month")
    {
      this.monthId = "00"
    }

    else if(this.monthName == "January")
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
    this.yearMonthName = this.monthName + " " + this.year;
  }
    // ====================================================================

    // --------------- Call API Functions ----------------
    public GetSalesSummaryData(): void
    {
      this.SalesSummaryData = [];
      this.SalesSummary = [];

      var selectedCity = "";

      if(this.SelectedCity == "Karachi")
      {
        selectedCity = "KHI";
      }
      else if(this.SelectedCity == "Islamabad")
      {
        selectedCity = "ISB";
      }

      var splitStartDate = this.StartingDate.split("-");
      var splitEndDate = this.EndingDate.split("-");

      if(
        splitStartDate[0] >  splitEndDate[0] ||
        splitStartDate[0] == splitEndDate[0] && splitStartDate[1] >  splitEndDate[1] ||
        splitStartDate[0] == splitEndDate[0] && splitStartDate[1] == splitEndDate[1] && splitStartDate[2] > splitEndDate[2]
        )
        {
          alert("Starting Date Should Not Be Greater Than The Ending Date");
          return;
        }

        if(this.StartingDate != "" && this.EndingDate != "")
        {
        this.sales.GetSalesSummary(this.StartingDate, this.EndingDate).subscribe((result) =>
        {
          console.log(result);
          var split = result.data.split(",");
          for(let i = 0; i < split.length; i++)
          {
            var value = split[i].split(":", 2);
            if(value[1] != undefined)
            {
              this.SalesSummary.push(value[1]);
            }
          }

          console.log(this.SalesSummary);
          console.log(split);
          for(let i = 0; i < this.SalesSummary.length; i+=5)
          {
            if(
              this.SalesSummary[i].includes(selectedCity) && this.SalesSummary[i].includes(this.SelectedType) && this.SelectedCity != "All Districts" && this.SelectedType != "All"
              ||
              this.SelectedCity == "All Districts" && this.SalesSummary[i].includes(this.SelectedType)
              ||
              this.SalesSummary[i].includes(selectedCity) && this.SelectedType == "All"
              ||
              this.SelectedCity == "All Districts" && this.SelectedType == "All"
              )
              {
                var monthSales = this.SalesSummary[i + 4].split("}");
                var posCode = this.SalesSummary[i + 0].split('"');
                var empName = this.SalesSummary[i + 1].split('"');

                this.SalesSummaryData.push({
                PositionCode : posCode[1],
                EmployeeName : empName[1],
                NumberOfDoctors : this.SalesSummary[i + 2],
                NumberOfProvidersActive : this.SalesSummary[i + 3],
                ActivePercentage : Math.round((this.SalesSummary[i + 3] / this.SalesSummary[i + 2]) * 100).toFixed(1),
                MonthSales : monthSales[0],
                })
              }
          }
        console.log(this.SalesSummaryData);
        console.log(this.SalesSummaryData.sort(function(a, b){return a-b}));
      })
    }
  }

  public GetBusinessAPIData(year: any, monthid: any): void
  {
    if(this.year == "" || this.monthId == "00" || this.monthId == "")
    {
      this.CallsExecutedData = [];
    }
    else if(this.year != "" && this.monthId != "00" && this.monthId != "")
    {
      this.businessService.GetBusinessData(year, monthid).subscribe((result) => {
        this.BusinessAPIData = result;
        this.CallsExecutedData = [];
        console.log("Business API: ", result);

        for(let i = 0; i < this.BusinessAPIData.length; i++)
        {
          if(
            this.BusinessAPIData[i].street.includes(this.SelectedType) && this.BusinessAPIData[i].city.includes(this.SelectedCity) && this.SelectedType != "All" && this.SelectedCity != "All Districts"
            ||
            this.BusinessAPIData[i].street.includes(this.SelectedType) && this.BusinessAPIData[i].city.includes(this.SelectedCity.toUpperCase()) && this.SelectedType != "All" && this.SelectedCity != "All Districts"
            ||
            this.BusinessAPIData[i].street.includes(this.SelectedType) && this.SelectedType != "All" && this.SelectedCity == "All Districts"
            ||
            this.BusinessAPIData[i].city.includes(this.SelectedCity.toUpperCase()) && this.SelectedType == "All" && this.SelectedCity != "All Districts"
            ||
            this.BusinessAPIData[i].city.includes(this.SelectedCity) && this.SelectedType == "All" && this.SelectedCity != "All Districts"
            ||
            this.SelectedType == "All" && this.SelectedCity == "All Districts"
            )
            {
            this.Districts[i] = this.BusinessAPIData[i].city;
            this.Names[i] = this.BusinessAPIData[i].tso;
            this.CallsPlanned[i] = this.BusinessAPIData[i].pdoctors;
            this.Planned[i] = this.BusinessAPIData[i].pcalls;
            this.ActuallyVisited[i] = this.BusinessAPIData[i].calls;
            this.CallsUnplanned[i] = this.BusinessAPIData[i].calls - this.BusinessAPIData[i].pcalls;
            this.NotVisited[i] = this.BusinessAPIData[i].doctors - this.BusinessAPIData[i].covered;
            this.PlannedPercentage[i] = (this.Planned[i] / this.CallsPlanned[i]) * 100;
            this.UnplannedPercentage[i] = (this.CallsUnplanned[i] / this.CallsPlanned[i]) * 100;
            this.InRange[i] = this.BusinessAPIData[i].green;
            this.OutRange[i] = this.BusinessAPIData[i].red;
            this.GrandTotal[i] = this.InRange[i] + this.OutRange[i];
            this.InRangePercent[i] = this.InRange[i] / this.GrandTotal[i] * 100;
            this.OutRangePercent[i] = this.OutRange[i] / this.GrandTotal[i] * 100;


            if(isNaN(this.CallsPlanned[i]) || !isFinite(this.CallsPlanned[i]))
            {
              this.CallsPlanned[i] = 0;
            }
            if(isNaN(this.Planned[i]) || !isFinite(this.Planned[i]))
            {
              this.Planned[i] = 0;
            }
            if(isNaN(this.ActuallyVisited[i]) || !isFinite(this.ActuallyVisited[i]))
            {
              this.ActuallyVisited[i] = 0;
            }
            if(isNaN(this.CallsUnplanned[i]) || !isFinite(this.CallsUnplanned[i]))
            {
              this.CallsUnplanned[i] = 0;
            }
            if(isNaN(this.NotVisited[i]) || !isFinite(this.NotVisited[i]))
            {
              this.NotVisited[i] = 0;
            }
            if(isNaN(this.PlannedPercentage[i]) || !isFinite(this.PlannedPercentage[i]))
            {
              this.PlannedPercentage[i] = 0;
            }
            if(isNaN(this.UnplannedPercentage[i]) || !isFinite(this.UnplannedPercentage[i]))
            {
              this.UnplannedPercentage[i] = 0;
            }
            if(isNaN(this.InRange[i]) || !isFinite(this.InRange[i]))
            {
              this.InRange[i] = 0;
            }
            if(isNaN(this.OutRange[i]) || !isFinite(this.OutRange[i]))
            {
              this.OutRange[i] = 0;
            }
            if(isNaN(this.GrandTotal[i]) || !isFinite(this.GrandTotal[i]))
            {
              this.GrandTotal[i] = 0;
            }
            if(isNaN(this.InRangePercent[i]) || !isFinite(this.InRangePercent[i]))
            {
              this.InRangePercent[i] = 0;
            }
            if(isNaN(this.OutRangePercent[i]) || !isFinite(this.OutRangePercent[i]))
            {
              this.OutRangePercent[i] = 0;
            }

            this.CallsExecutedData.push({
              Month: this.yearMonthName,
              District: this.Districts[i],
              Name: this.Names[i],
              CallsPlanned: parseFloat(this.CallsPlanned[i]),
              Planned: parseFloat(this.Planned[i]),
              CallsUnplanned: parseFloat(this.CallsUnplanned[i]),
              ActuallyVisited: this.ActuallyVisited[i],
              NotVisited: this.NotVisited[i],
              PlannedPercentage: parseFloat(this.PlannedPercentage[i]).toFixed(),
              UnplannedPercentage: parseFloat(this.UnplannedPercentage[i]).toFixed(),
              InRange: this.InRange[i],
              OutRange: this.OutRange[i],
              GrandTotal: parseFloat(this.GrandTotal[i]).toFixed(),
              InRangePercent: parseFloat(this.InRangePercent[i]).toFixed(),
              OutRangePercent: parseFloat(this.OutRangePercent[i]).toFixed(),
            });
          }
        }

        console.log("CallsExecutedData: ", this.CallsExecutedData);
      });
    }
  }

  public GetMIOReportsData(): void
  {
    this.MIOReportsData = [];

    // Set Pagination To First Page
    this.p = 1;
    var type = this.SelectedType;

    if(this.SelectedType == "All")
    {
      type = "";
    }
    this.sales.GetMIOReprtData(type).subscribe((result) => {
      console.log(this.SelectedType);
      console.log(result);
      console.log(result.data);
      var data = JSON.parse(result.data);
      console.log(data);

      var index = 0;

      for(var i = 0; i < data.length; i++)
      {
        if(data[i].district.includes(this.SelectedCity) && this.SelectedCity != "All Districts" || this.SelectedCity == "All Districts")
        {
          index++;
          this.MIOReportsData.push({
            Index: index,
            Date: data[i].transactionDate,
            ProviderCode: data[i].providerCode,
            ProviderName: "-",
            MIO: data[i].MIO,
            District: data[i].district,
            Category: "-",
            PharmacyCode: data[i].pharmacyCode,
            TaggedPharmacy: data[i].taggedPharmacy,
            MonthlySales: parseFloat(data[i].sales).toFixed(2)
          });
        }
      }
      console.log(this.MIOReportsData);
    });
  }
  // ====================================================================

}
