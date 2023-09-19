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
  // public Values : any = [];

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

  public KHISalesTargetMIOValue: any;
  public KHIAchievementMIOValue: any;
  public KHITotalProvidersMIOValue: any;
  public KHIActiveProvidersMIOValue: any;

  public KHISalesTargetCHOValue: any;
  public KHIAchievementCHOValue: any;
  public KHITotalProvidersCHOValue: any;
  public KHIActiveProvidersCHOValue: any;

  public ISBSalesTargetMIOValue: any;
  public ISBAchievementMIOValue: any;
  public ISBTotalProvidersMIOValue: any;
  public ISBActiveProvidersMIOValue: any;

  public ISBSalesTargetCHOValue: any;
  public ISBAchievementCHOValue: any;
  public ISBTotalProvidersCHOValue: any;
  public ISBActiveProvidersCHOValue: any;

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

    this.sales.getCity.subscribe((result) => {
      this.SelectedCity = result;
    });

    this.sales.getPeriod.subscribe((result) => {
      this.SelectedPeriodFilter = result;
    });

    this.GetDashboardDataMIO(this.SelectedCity, this.SelectedPeriodFilter);
    this.GetDashboardDataCHO(this.SelectedCity, this.SelectedPeriodFilter);

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

    this.businessService.GetBusinessData("2022", "01").subscribe((result) => {
      this.BusinessAPIData = result;
      console.log("Business API: ", this.BusinessAPIData);
    });
  }

  GetDashboardDataMIO(city: any, period: any) {
    console.log(city, period);
    setTimeout(() => {

      this.sales.GetSalesTarget(city, 1, "MIO", period).subscribe((result) => {
        console.log(result.data);
        var data = JSON.parse(result.data);
        console.log(data.number);
        this.SalesTargetMIOValue = data.number;
      });

      this.sales.GetSalesTarget(city, 2, "MIO", period).subscribe((result) => {
        console.log(result.data);
        var data = JSON.parse(result.data);
        console.log(data.number);
        this.AchievementMIOValue = data.number;
      });

      this.sales.GetSalesTarget(city, 3, "MIO", period).subscribe((result) => {
        console.log(result.data);
        var data = JSON.parse(result.data);
        console.log(data.number);
        this.TotalProvidersMIOValue = data.number;
      });

      this.sales.GetSalesTarget(city, 4, "MIO", period).subscribe((result) => {
        console.log(result.data);
        var data = JSON.parse(result.data);
        console.log(data.number);
        this.ActiveProvidersMIOValue = data.number;
      });

    }, 1000);
  }

  GetDashboardDataCHO(city: any, period: any) {
    console.log(city, period);
    setTimeout(() => {

      this.sales.GetSalesTarget(city, 1, "CHO", period).subscribe((result) => {
        console.log(result.data);
        var data = JSON.parse(result.data);
        console.log(data.number);
        this.SalesTargetCHOValue = data.number;
      });

      this.sales.GetSalesTarget(city, 2, "CHO", period).subscribe((result) => {
        console.log(result.data);
        var data = JSON.parse(result.data);
        console.log(data.number);
        this.AchievementCHOValue = data.number;
      });

      this.sales.GetSalesTarget(city, 3, "CHO", period).subscribe((result) => {
        console.log(result.data);
        var data = JSON.parse(result.data);
        console.log(data.number);
        this.TotalProvidersCHOValue = data.number;
      });

      this.sales.GetSalesTarget(city, 4, "CHO", period).subscribe((result) => {
        console.log(result.data);
        var data = JSON.parse(result.data);
        console.log(data.number);
        this.ActiveProvidersCHOValue = data.number;
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
