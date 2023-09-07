import { Component, OnInit } from '@angular/core';
import { BusinessService } from '../../Services/Business/business.service';
import { NgxPaginationModule } from "ngx-pagination";

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss']
})
export class ReportsComponent implements OnInit {

  p: Number = 1;
  count: Number = 10;

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

  public CallsPlanned : any = [];
  public Planned : any = [];
  public CallsUnplanned : any = [];
  public ActuallyVisited : any = [];
  public NotVisited : any = [];
  public PlannedPercentage : any = [];
  public UnplannedPercentage : any = [];

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

  constructor(private businessService: BusinessService) { }

  ngOnInit(): void
  {
    var year: any = "2022";
    var monthId: any = "02";
    var monthName: any = "";

    monthName = this.GetMonthNameFromMonthId(monthName, monthId) + " " + year;

    this.businessService.GetBusinessData(year, monthId).subscribe((result) => {
      this.BusinessAPIData = result;
      console.log("Business API: ", this.BusinessAPIData);

      for(let i = 0; i < this.BusinessAPIData.length; i++)
      {
        this.CallsPlanned[i] = this.BusinessAPIData[i].doctors / this.BusinessAPIData[i].pdoctors;
        this.Planned[i] = this.BusinessAPIData[i].calls / this.BusinessAPIData[i].pcalls;
        this.ActuallyVisited[i] = this.BusinessAPIData[i].calls;
        this.CallsUnplanned[i] = this.ActuallyVisited[i] - this.Planned[i];
        this.NotVisited[i] = this.BusinessAPIData[i].doctors - this.BusinessAPIData[i].covered;
        this.PlannedPercentage[i] = (this.BusinessAPIData[i].pcalls / this.BusinessAPIData[i].calls) * 100;
        this.UnplannedPercentage[i] = 100 - this.Planned[i];

        this.CallsExecutedData.push({
          Month: monthName,
          CallsPlanned: this.CallsPlanned[i],
          Planned: this.Planned[i],
          CallsUnplanned: this.CallsUnplanned[i],
          ActuallyVisited: this.ActuallyVisited[i],
          NotVisited: this.NotVisited[i],
          PlannedPercentage: this.PlannedPercentage[i],
          UnplannedPercentage: this.UnplannedPercentage[i]
        });
      }
      console.log("CallsExecutedData: ", this.CallsExecutedData);
    });

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

  public GetMonthNameFromMonthId(monthName, monthId): any
  {
    if(monthId == "01")
    {
      monthName = "Jan"
    }
    else if(monthId == "02")
    {
      monthName = "Feb"
    }
    else if(monthId == "03")
    {
      monthName = "Mar"
    }
    else if(monthId == "04")
    {
      monthName = "Apr"
    }
    else if(monthId == "05")
    {
      monthName = "May"
    }
    else if(monthId == "06")
    {
      monthName = "June"
    }
    else if(monthId == "07")
    {
      monthName = "July"
    }
    else if(monthId == "08")
    {
      monthName = "Aug"
    }
    else if(monthId == "09")
    {
      monthName = "Sep"
    }
    else if(monthId == "10")
    {
      monthName = "Oct"
    }
    else if(monthId == "11")
    {
      monthName = "Nov"
    }
    else if(monthId == "12")
    {
      monthName = "Dec"
    }

    return monthName;
  }

}
