import { Component, OnInit } from '@angular/core';
import Chart from 'chart.js';
import { SalesService } from '../../Services/Sales/sales.service';
import { BusinessService } from '../../Services/Business/business.service';

// core components
import {
  chartOptions,
  parseOptions,
  chartExample1,
  chartExample2
} from "../../variables/charts";
import { importExpr } from '@angular/compiler/src/output/output_ast';

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

  public BusinessAPIData : any = [];
  public Values : any = [];

  public SelectedCity: string = "Karachi";
  public SelectedPeriodFilter: string = "MTD";

  public SalesTargetMIOValue: any;
  public AchievementMIOValue: any;
  public TotalProvidersMIOValue: any;
  public ActiveProvidersMIOValue: any;

  public SalesTargetCHOValue: any;
  public AchievementCHOValue: any;
  public TotalProvidersCHOValue: any;
  public ActiveProvidersCHOValue: any;

  constructor(private sales: SalesService, private businessService: BusinessService) {}

  ngOnInit() {

    this.datasets = [
      [0, 20, 10, 30, 15, 40, 20, 60, 60],
      [0, 20, 5, 25, 10, 30, 15, 40, 40],
    ];
    this.data = this.datasets[0];

    // MIO Wise Sales Bar Chart
    var salesBarChartMIO = document.getElementById('MIO-WiseSales');

    parseOptions(Chart, chartOptions());

    var salesChart = new Chart(salesBarChartMIO, {
      type: 'bar',
      options: chartExample2.options,
      data: chartExample2.data
    });
    // --------------------------

    // Sales MIO Line Chart
    var lineChartSalesMIO = document.getElementById('chart-sales-MIO');

    chartExample1.data.labels = ['2016', '2017', '2018', '2019', '2020', '2021', '2022', '2023'];

    this.salesLineChartMIO = new Chart(lineChartSalesMIO, {
      type: 'line',
      options: chartExample1.options,
      data: chartExample1.data
    });
    // --------------------------

    // CHO Wise Sales Bar Chart
    var salesBarChartMIO = document.getElementById('CHO-WiseSales');

    parseOptions(Chart, chartOptions());

    var salesChart = new Chart(salesBarChartMIO, {
      type: 'bar',
      options: chartExample2.options,
      data: chartExample2.data
    });
    // --------------------------

    // Sales CHO Line Chart
    var lineChartSalesCHO = document.getElementById('chart-sales-CHO');

    chartExample1.data.labels = ['2016', '2017', '2018', '2019', '2020', '2021', '2022', '2023'];

    this.salesLineChartCHO = new Chart(lineChartSalesCHO, {
      type: 'line',
      options: chartExample1.options,
      data: chartExample1.data
    });
    // --------------------------

    this.updateOptionsMIO();
    this.updateOptionsCHO();

    // APIS Callback
    // for(let i = 1; i <= 4; i++)
    // {
    //   this.sales.GetSalesTarget("Karachi", i, "MIO").subscribe((result) => {
    //     var split = result.data.split(",", 4);
    //     var value = split[1].split(":", 2);
    //     this.Values.push(value[1]);

    //   });
    // }
    // console.log(this.Values);

    // ----------------- Get Sales Target API for MIO ------------------
    this.businessService.getCity.subscribe((result) => {
      this.SelectedCity = result;

      this.sales.GetSalesTarget(this.SelectedCity, 1, "MIO").subscribe((result) => {
        var split = result.data.split(",", 4);
        var value = split[1].split(":", 2);
        this.SalesTargetMIOValue = value[1];

        console.log("SalesTargetMIOValue: " + this.SalesTargetMIOValue);
      });

      this.sales.GetSalesTarget(this.SelectedCity, 2, "MIO").subscribe((result) => {
        var split = result.data.split(",", 4);
        var value = split[1].split(":", 2);
        this.AchievementMIOValue = value[1];

        console.log("AchievementMIOValue: " + this.AchievementMIOValue);
      });

      this.sales.GetSalesTarget(this.SelectedCity, 3, "MIO").subscribe((result) => {
        var split = result.data.split(",", 4);
        var value = split[1].split(":", 2);
        this.TotalProvidersMIOValue = value[1];

        console.log("TotalProvidersMIOValue: " + this.TotalProvidersMIOValue);
      });

      this.sales.GetSalesTarget(this.SelectedCity, 4, "MIO").subscribe((result) => {
        var split = result.data.split(",", 4);
        var value = split[1].split(":", 2);
        this.ActiveProvidersMIOValue = value[1];

        console.log("ActiveProvidersMIOValue: " + this.ActiveProvidersMIOValue);
      });

      // ---------------- Get Sales Target API for MIO -------------------------
      this.sales.GetSalesTarget(this.SelectedCity, 1, "CHO").subscribe((result) => {
        var split = result.data.split(",", 4);
        var value = split[1].split(":", 2);
        this.SalesTargetCHOValue = value[1];

        console.log("SalesTargetCHOValue: " + this.SalesTargetCHOValue);
      });

      this.sales.GetSalesTarget(this.SelectedCity, 2, "CHO").subscribe((result) => {
        var split = result.data.split(",", 4);
        var value = split[1].split(":", 2);
        this.AchievementCHOValue = value[1];

        console.log("AchievementCHOValue: " + this.AchievementCHOValue);
      });

      this.sales.GetSalesTarget(this.SelectedCity, 3, "CHO").subscribe((result) => {
        var split = result.data.split(",", 4);
        var value = split[1].split(":", 2);
        this.TotalProvidersCHOValue = value[1];

        console.log("TotalProvidersCHOValue: " + this.TotalProvidersCHOValue);
      });

      this.sales.GetSalesTarget(this.SelectedCity, 4, "CHO").subscribe((result) => {
        var split = result.data.split(",", 4);
        var value = split[1].split(":", 2);
        this.ActiveProvidersCHOValue = value[1];

        console.log("ActiveProvidersCHOValue: " + this.ActiveProvidersCHOValue);
      });

    });


    this.businessService.GetBusinessData("2022", "02").subscribe((result) => {
      this.BusinessAPIData = result;
      console.log("Business API: ", this.BusinessAPIData);
    });
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

  // public SelectKarachi(): void
  // {
  //   this.SelectedCity = "Karachi";
  // }

  // public SelectRawalpindi(): void
  // {
  //   this.SelectedCity = "Rawalpindi";
  // }

  // public SelectAllDistricts(): void
  // {
  //   this.SelectedCity = "All Districts";
  // }

  // public SelectMTD(): void
  // {
  //   this.SelectedPeriodFilter = "MTD";
  // }

  // public SelectYTI(): void
  // {
  //   this.SelectedPeriodFilter = "YTI";
  // }

  // public SelectPTD(): void
  // {
  //   this.SelectedPeriodFilter = "PTD";
  // }

}
