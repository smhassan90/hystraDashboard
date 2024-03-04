import { Component, OnInit } from '@angular/core';
import Chart from 'chart.js';
import { SalesService } from '../../Services/Sales/sales.service';
import { BusinessService } from '../../Services/Business/business.service';

// core components
import { chartOptions, parseOptions, chartExample1, chartExample2 } from "../../variables/charts";
import { importExpr } from '@angular/compiler/src/output/output_ast';
import { AuthenticationService } from 'src/app/Services/Auth/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  public datasets: any;
  public data: any;
  public salesLineChartMIO;
  public salesLineChartCHO;
  public clicked: boolean = true;
  public clicked1: boolean = false;

  // public Values : any = [];

  public SelectedCity: string = "Karachi";
  public SelectedPeriodFilter: string = "mtd";

  public SalesTargetMIOValue: number;
  public AchievementMIOValue: number;
  public AchievementMIOPercentageValue: any;
  public TotalProvidersMIOValue: any;
  public ActiveProvidersMIOValue: any;
  public ActiveProvidersMIOPercentageValue: any;

  public SalesTargetCHOValue: number;
  public AchievementCHOValue: number;
  public AchievementCHOPercentageValue: any;
  public TotalProvidersCHOValue: any;
  public ActiveProvidersCHOValue: any;
  public ActiveProvidersCHOPercentageValue: any;

  public TotalVisitedMIOPercentageValue: any;
  public TotalVisitedCHOPercentageValue: any;

  public MIOLineGraphLabels: any = [];
  public MIOLineGraphData: any = [];
  public MIOBarChartLabels: any = [];
  public MIOBarChartData: any = [];

  public CHOLineGraphLabels: any = [];
  public CHOLineGraphData: any = [];
  public CHOBarChartLabels: any = [];
  public CHOBarChartData: any = [];

  public IKONMIOData : any = [];
  public IKONCHOData : any = [];

  public CallPlannedMIO: number = 0;
  public TotalVisitMIO: number = 0;

  public CallPlannedCHO: number = 0;
  public TotalVisitCHO: number = 0;

  public CallPlanMIO : any = [];
  public TotalVisitedMIO : any = [];

  public CallPlanCHO : any = [];
  public TotalVisitedCHO : any = [];

  public currentYear;
  public currentMonth;

  constructor(private sales: SalesService, private businessService: BusinessService, private auth: AuthenticationService, private router: Router) {
    console.log("Is LoggedIn: ", this.auth.IsLoggedIn());
    if (!this.auth.IsLoggedIn()) {
      this.router.navigateByUrl('/login');
    }
  }

  ngOnInit() {

    const date = new Date();

    this.currentYear = date.getFullYear();
    this.currentMonth = date.getMonth() + 1;
    this.GetIKONAPIMIOData();
    this.GetIKONAPICHOData();

    this.datasets = [
      [0, 20, 10, 30, 15, 40, 20, 60, 60],
      [0, 20, 5, 25, 10, 30, 15, 40, 40],
    ];
    this.data = this.datasets[0];

    const mioBarData = {
      labels: [],
      datasets: [
        {
          label: "Sales",
          data: [],
          maxBarThickness: 10
        }
      ]
    }

    const mioLineData = {
      labels: [],
      datasets: [{
        label: 'Performance',
        data: []
      }]
    }

    const choBarData = {
      labels: [],
      datasets: [
        {
          label: "Sales",
          data: [],
          maxBarThickness: 10
        }
      ]
    }

    const choLineData = {
      labels: [],
      datasets: [{
        label: 'Performance',
        data: []
      }]
    }

    // MIO Line Data
    this.sales.GetGraphData(1, "MIO").subscribe((result) => {
      // console.log(result);
      // console.log(result.data);
      if(result.data != null)
      {
        var data = JSON.parse(result.data);
        console.log("MIO Line Data: ");
        console.log(data);

        for (var i = 0; i < data.length; i++) {
          var split = data[i].xAxis.split(",");
          this.MIOLineGraphLabels.push(split[0]);
          this.MIOLineGraphData.push(parseFloat(data[i].yAxis).toFixed(1));
        }

        mioLineData.labels = this.MIOLineGraphLabels;
        mioLineData.datasets[0].data = this.MIOLineGraphData;

        // ============
        var salesBarChartMIO = document.getElementById('MIO-WiseSales');

        parseOptions(Chart, chartOptions());
        var salesChart = new Chart(salesBarChartMIO, {
          type: 'bar',
          options: chartExample2.options,
          data: mioLineData
        });
      }
    });

    // MIO Bar Data
    this.sales.GetGraphData(2, "MIO").subscribe((result) => {
      // console.log(result);
      // console.log(result.data);
      if(result.data != null)
      {
        var data = JSON.parse(result.data);
        console.log("MIO Bar Data: ");
        console.log(data);

        for (var i = 0; i < data.length; i++) {
          var split = data[i].xAxis.split(",");
          this.MIOBarChartLabels.push(split[0]);
          this.MIOBarChartData.push(parseFloat(data[i].yAxis).toFixed(1));
        }

        mioBarData.labels = this.MIOBarChartLabels;
        mioBarData.datasets[0].data = this.MIOBarChartData;

        // ===================
        var lineChartSalesMIO = document.getElementById('chart-sales-MIO');

        chartExample1.data.labels = ['2016', '2017', '2018', '2019', '2020', '2021', '2022', '2023'];
        this.salesLineChartMIO = new Chart(lineChartSalesMIO, {
          type: 'line',
          options: chartExample1.options,
          data: mioBarData
        });
      }
    });

    // CHO Line Data
    this.sales.GetGraphData(1, "CHO").subscribe((result) => {
      // console.log(result);
      // console.log(result.data);
      if(result.data != null)
      {
        var data = JSON.parse(result.data);
        console.log("CHO Line Data: ");
        console.log(data);

        for (var i = 0; i < data.length; i++) {
          var split = data[i].xAxis.split(",");
          this.CHOLineGraphLabels.push(split[0]);
          this.CHOLineGraphData.push(parseFloat(data[i].yAxis).toFixed(1));
        }

        choLineData.labels = this.CHOLineGraphLabels;
        choLineData.datasets[0].data = this.CHOLineGraphData;

        // =====================
        var salesBarChartMIO = document.getElementById('CHO-WiseSales');

        parseOptions(Chart, chartOptions());
        var salesChart = new Chart(salesBarChartMIO, {
          type: 'bar',
          options: chartExample2.options,
          data: choLineData
        });
      }
    });

    // CHO Bar Data
    this.sales.GetGraphData(2, "CHO").subscribe((result) => {
      // console.log(result);
      // console.log(result.data);
      if(result.data != null)
      {
        var data = JSON.parse(result.data);
        console.log("CHO Bar Data: ");
        console.log(data);

        for (var i = 0; i < data.length; i++) {
          var split = data[i].xAxis.split(",");
          this.CHOBarChartLabels.push(split[0]);
          this.CHOBarChartData.push(parseFloat(data[i].yAxis).toFixed(1));
        }

        choBarData.labels = this.CHOBarChartLabels;
        choBarData.datasets[0].data = this.CHOBarChartData;

        // ===============
        var lineChartSalesCHO = document.getElementById('chart-sales-CHO');

        chartExample1.data.labels = ['2016', '2017', '2018', '2019', '2020', '2021', '2022', '2023'];
        this.salesLineChartCHO = new Chart(lineChartSalesCHO, {
          type: 'line',
          options: chartExample1.options,
          data: choBarData
        });
      }
    });

    // this.updateOptionsMIO();
    // this.updateOptionsCHO();

    // APIS Callback

    this.sales.getCity.subscribe((result) => {
      this.SelectedCity = result;
      console.log("City " + this.SelectedCity);
      this.GetDashboardDataMIO(this.SelectedCity, this.SelectedPeriodFilter);
      this.GetDashboardDataCHO(this.SelectedCity, this.SelectedPeriodFilter);

      this.GetIKONAPIMIOData();
      this.GetIKONAPICHOData();
    });

    this.sales.getPeriod.subscribe((result) => {
      this.SelectedPeriodFilter = result;
      console.log("Period " + this.SelectedPeriodFilter);
      this.GetDashboardDataMIO(this.SelectedCity, this.SelectedPeriodFilter);
      this.GetDashboardDataCHO(this.SelectedCity, this.SelectedPeriodFilter);
    });

    // this.GetDashboardDataMIO(this.SelectedCity, this.SelectedPeriodFilter);
    // this.GetDashboardDataCHO(this.SelectedCity, this.SelectedPeriodFilter);

    // this.sales.getCity.subscribe((result) =>
    // {
    //   this.SelectedCity = result;

    //   this.sales.getPeriod.subscribe((response) =>
    //   {
    //     this.SelectedPeriodFilter = response;

    //     for(let i = 1; i <= 4; i++)
    //     {
    //       this.sales.GetSalesTarget(this.SelectedCity, i, "MIO", this.SelectedPeriodFilter).subscribe((result) =>
    //       {
    //         console.log(result);
    //         if(i == 1)
    //         {
    //           var split = result.data.split(",", 4);
    //           var value = split[1].split(":", 2);
    //           this.SalesTargetMIOValue = value[1];
    //         }
    //         else if(i == 2)
    //         {
    //           var split = result.data.split(",", 4);
    //           var value = split[1].split(":", 2);
    //           this.AchievementMIOValue = value[1];
    //         }
    //         else if(i == 3)
    //         {
    //           var split = result.data.split(",", 4);
    //           var value = split[1].split(":", 2);
    //           this.TotalProvidersMIOValue = value[1];
    //         }
    //         else if(i == 4)
    //         {
    //           var split = result.data.split(",", 4);
    //           var value = split[1].split(":", 2);
    //           this.ActiveProvidersMIOValue = value[1];
    //         }
    //       });

    //       this.sales.GetSalesTarget(this.SelectedCity, i, "CHO", this.SelectedPeriodFilter).subscribe((result) =>
    //       {
    //         console.log(result);
    //         if(i == 1)
    //         {
    //           var split = result.data.split(",", 4);
    //           var value = split[1].split(":", 2);
    //           this.SalesTargetCHOValue = value[1];
    //         }
    //         else if(i == 2)
    //         {
    //           var split = result.data.split(",", 4);
    //           var value = split[1].split(":", 2);
    //           this.AchievementCHOValue = value[1];
    //         }
    //         else if(i == 3)
    //         {
    //           var split = result.data.split(",", 4);
    //           var value = split[1].split(":", 2);
    //           this.TotalProvidersCHOValue = value[1];
    //         }
    //         else if(i == 4)
    //         {
    //           var split = result.data.split(",", 4);
    //           var value = split[1].split(":", 2);
    //           this.ActiveProvidersCHOValue = value[1];
    //         }
    //       });
    //     }
    //   });
    // });
  }

  GetIKONAPIMIOData() {
    this.businessService.GetBusinessData(this.currentYear, this.currentMonth).subscribe((result) => {
      console.log(result);
      this.IKONMIOData = result;

      this.CallPlanMIO = [];
      this.TotalVisitedMIO = [];

      this.CallPlannedMIO = 0;
      this.TotalVisitMIO = 0;

      for(let i = 0; i < this.IKONMIOData.length; i++)
      {
        if(
          this.IKONMIOData[i].street.includes("MIO") && this.IKONMIOData[i].city.includes(this.SelectedCity) && this.SelectedCity != "All Districts"
          ||
          this.IKONMIOData[i].street.includes("MIO") && this.IKONMIOData[i].city.includes(this.SelectedCity.toUpperCase()) && this.SelectedCity != "All Districts"
          ||
          this.IKONMIOData[i].street.includes("MIO") && this.SelectedCity == "All Districts"
          )
          {
            this.CallPlanMIO.push(this.IKONMIOData[i].calls);
            this.TotalVisitedMIO.push(this.IKONMIOData[i].pcalls);
          }
      }
      console.log("CallPlanMIO: " + this.CallPlanMIO);
      console.log("TotalVisitedMIO: " + this.TotalVisitedMIO);

      for(let i = 0; i < this.CallPlanMIO.length; i++)
      {
        this.CallPlannedMIO += parseFloat(this.CallPlanMIO[i]);
      }
      for(let i = 0; i < this.TotalVisitedMIO.length; i++)
      {
        this.TotalVisitMIO += parseFloat(this.TotalVisitedMIO[i]);
      }

      this.TotalVisitedMIOPercentageValue = (this.TotalVisitMIO / this.CallPlannedMIO) * 100;
      this.TotalVisitedMIOPercentageValue = this.TotalVisitedMIOPercentageValue.toFixed(2);
      if (isNaN(this.TotalVisitedMIOPercentageValue) || !isFinite(this.TotalVisitedMIOPercentageValue)) {
        this.TotalVisitedMIOPercentageValue = "-";
      }
    });
  }

  GetIKONAPICHOData() {
    this.businessService.GetBusinessData(this.currentYear, this.currentMonth).subscribe((result) => {
      console.log(result);
      this.IKONCHOData = result;

      this.CallPlanCHO = [];
      this.TotalVisitedCHO = [];

      this.CallPlannedCHO = 0;
      this.TotalVisitCHO = 0;

      for(let i = 0; i < this.IKONCHOData.length; i++)
      {
        if(
          this.IKONCHOData[i].street.includes("MIO") && this.IKONCHOData[i].city.includes(this.SelectedCity) && this.SelectedCity != "All Districts"
          ||
          this.IKONCHOData[i].street.includes("MIO") && this.IKONCHOData[i].city.includes(this.SelectedCity.toUpperCase()) && this.SelectedCity != "All Districts"
          ||
          this.IKONCHOData[i].street.includes("MIO") && this.SelectedCity == "All Districts"
          )
          {
            this.CallPlanCHO.push(this.IKONCHOData[i].calls);
            this.TotalVisitedCHO.push(this.IKONCHOData[i].pcalls);
          }
      }
      console.log("CallPlanCHO: " + this.CallPlanCHO);
      console.log("TotalVisitedCHO: " + this.TotalVisitedCHO);

      for(let i = 0; i < this.CallPlanCHO.length; i++)
      {
        this.CallPlannedCHO += parseFloat(this.CallPlanCHO[i]);
      }
      for(let i = 0; i < this.TotalVisitedCHO.length; i++)
      {
        this.TotalVisitCHO += parseFloat(this.TotalVisitedCHO[i]);
      }

      this.TotalVisitedCHOPercentageValue = (this.TotalVisitCHO / this.CallPlannedCHO) * 100;
      this.TotalVisitedCHOPercentageValue = this.TotalVisitedCHOPercentageValue.toFixed(2);
      if (isNaN(this.TotalVisitedCHOPercentageValue) || !isFinite(this.TotalVisitedCHOPercentageValue)) {
        this.TotalVisitedCHOPercentageValue = "-";
      }
    });
  }

  GetDashboardDataMIO(city: any, period: any) {
    console.log(city, period);

    var salesTarget;
    var achievement;
    var activeProviders;
    var totalProviders;

    setTimeout(() => {

      this.sales.GetSalesTarget(city, 1, "MIO", period).subscribe((result) => {
        console.log(result.data);
        var data = JSON.parse(result.data);
        console.log(data.number);
        this.SalesTargetMIOValue = data.number.toLocaleString();

        salesTarget = data.number;
      });

      this.sales.GetSalesTarget(city, 2, "MIO", period).subscribe((result) => {
        console.log(result.data);
        var data = JSON.parse(result.data);
        console.log(data.number);
        this.AchievementMIOValue = data.number.toLocaleString();

        achievement = data.number;
        this.AchievementMIOPercentageValue = (achievement / salesTarget) * 100;
        this.AchievementMIOPercentageValue = this.AchievementMIOPercentageValue.toFixed();

        if (isNaN(this.AchievementMIOPercentageValue) || !isFinite(this.AchievementMIOPercentageValue)) {
          this.AchievementMIOPercentageValue = 0;
        }
      });


      this.sales.GetSalesTarget(city, 3, "MIO", period).subscribe((result) => {
        console.log(result.data);
        var data = JSON.parse(result.data);
        console.log(data.number);
        this.TotalProvidersMIOValue = data.number;

        totalProviders = data.number;
      });

      this.sales.GetSalesTarget(city, 4, "MIO", period).subscribe((result) => {
        console.log(result.data);
        var data = JSON.parse(result.data);
        console.log(data.number);
        this.ActiveProvidersMIOValue = data.number;

        activeProviders = data.number;
        this.ActiveProvidersMIOPercentageValue = (activeProviders / totalProviders) * 100;
        this.ActiveProvidersMIOPercentageValue = this.ActiveProvidersMIOPercentageValue.toFixed();

        if (isNaN(this.ActiveProvidersMIOPercentageValue) || !isFinite(this.ActiveProvidersMIOPercentageValue)) {
          this.ActiveProvidersMIOPercentageValue = 0;
        }
      });

    }, 1000);
  }

  GetDashboardDataCHO(city: any, period: any) {
    console.log(city, period);

    var salesTarget;
    var achievement;
    var activeProviders;
    var totalProviders;

    setTimeout(() => {

      this.sales.GetSalesTarget(city, 1, "CHO", period).subscribe((result) => {
        console.log(result.data);
        var data = JSON.parse(result.data);
        console.log(data.number);
        this.SalesTargetCHOValue = data.number.toLocaleString();

        salesTarget = data.number;
      });

      this.sales.GetSalesTarget(city, 2, "CHO", period).subscribe((result) => {
        console.log(result.data);
        var data = JSON.parse(result.data);
        console.log(data.number);
        this.AchievementCHOValue = data.number.toLocaleString();

        achievement = data.number;
        this.AchievementCHOPercentageValue = (achievement / salesTarget) * 100;
        this.AchievementCHOPercentageValue = this.AchievementCHOPercentageValue.toFixed();

        if (isNaN(this.AchievementCHOPercentageValue) || !isFinite(this.AchievementCHOPercentageValue)) {
          this.AchievementCHOPercentageValue = 0;
        }
      });

      this.sales.GetSalesTarget(city, 3, "CHO", period).subscribe((result) => {
        console.log(result.data);
        var data = JSON.parse(result.data);
        console.log(data.number);
        this.TotalProvidersCHOValue = data.number;

        totalProviders = data.number;
      });

      this.sales.GetSalesTarget(city, 4, "CHO", period).subscribe((result) => {
        console.log(result.data);
        var data = JSON.parse(result.data);
        console.log(data.number);
        this.ActiveProvidersCHOValue = data.number;

        activeProviders = data.number;
        this.ActiveProvidersCHOPercentageValue = (activeProviders / totalProviders) * 100;
        this.ActiveProvidersCHOPercentageValue = this.ActiveProvidersCHOPercentageValue.toFixed();

        if (isNaN(this.ActiveProvidersCHOPercentageValue) || !isFinite(this.ActiveProvidersCHOPercentageValue)) {
          this.ActiveProvidersCHOPercentageValue = 0;
        }
      });

    }, 1000);
  }


  public updateOptionsMIO() {
    console.log(this.data);
    this.salesLineChartMIO.data.datasets[0].data = this.data;
    this.salesLineChartMIO.update();
  }

  public updateOptionsCHO() {
    console.log(this.data);
    this.salesLineChartMIO.data.datasets[0].data = this.data;
    this.salesLineChartMIO.update();
  }

  public ShowMIODataYTD(): void {
    chartExample1.data.labels = ['2016', '2017', '2018', '2019', '2020', '2021', '2022', '2023'];
    this.updateOptionsMIO();
  }

  public ShowMIODataMTD(): void {
    chartExample1.data.labels = ['May', 'Jun', 'July', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    this.updateOptionsMIO();
  }

  public ShowCHODataYTD(): void {
    chartExample2.data.labels = ['2016', '2017', '2018', '2019', '2020', '2021', '2022', '2023'];
    this.updateOptionsCHO();
  }

  public ShowCHODataMTD(): void {
    chartExample2.data.labels = ['May', 'Jun', 'July', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    this.updateOptionsCHO();
  }

}

// if(
//   this.IKONAPIData[i].street.includes("MIO") && this.IKONAPIData[i].city.includes(this.SelectedCity) && this.SelectedCity != "All Districts"
//   ||
//   this.IKONAPIData[i].street.includes("MIO") && this.IKONAPIData[i].city.includes(this.SelectedCity.toUpperCase()) && this.SelectedCity != "All Districts"
//   ||
//   this.IKONAPIData[i].street.includes("MIO") && this.SelectedCity == "All Districts"
//   ||
//   this.IKONAPIData[i].city.includes(this.SelectedCity.toUpperCase()) && this.SelectedCity != "All Districts"
//   ||
//   this.IKONAPIData[i].city.includes(this.SelectedCity) && this.SelectedCity != "All Districts"
//   ||
//   this.SelectedCity == "All Districts"
//   )
