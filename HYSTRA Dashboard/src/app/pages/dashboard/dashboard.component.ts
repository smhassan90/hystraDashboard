import { Component, OnInit } from '@angular/core';
import Chart from 'chart.js';
import { SalesService } from '../../Services/Sales/sales.service';
import { BusinessService } from '../../Services/Business/business.service';

// core components
import { chartOptions, parseOptions, chartExample1, chartExample2 } from "../../variables/charts";
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

  public MIOBarChartLabels: any = [];
  public MIOBarChartData: any = [];

  constructor(private sales: SalesService, private businessService: BusinessService) {}

  ngOnInit() {

    this.datasets = [
      [0, 20, 10, 30, 15, 40, 20, 60, 60],
      [0, 20, 5, 25, 10, 30, 15, 40, 40],
    ];
    this.data = this.datasets[0];

    const mioData = {
      labels: [],
      datasets: [
        {
          label: "Sales",
          data: [],
          maxBarThickness: 10
        }
      ]
    }

    this.sales.GetGraphData(2, "MIO").subscribe((result) => {
      // console.log(result);
      // console.log(result.data);
      var data = JSON.parse(result.data);
      console.log(data);

      for(var i = 0; i < data.length; i++)
      {
        var split = data[i].xAxis.split(",");
        this.MIOBarChartLabels.push(split[0]);
        this.MIOBarChartData.push(parseFloat(data[i].yAxis).toFixed(1));
      }

      mioData.labels = this.MIOBarChartLabels;
      mioData.datasets[0].data = this.MIOBarChartData;
    });

    // MIO Wise Sales Bar Chart

    setTimeout(() => {
      var salesBarChartMIO = document.getElementById('MIO-WiseSales');
      parseOptions(Chart, chartOptions());

      var salesChart = new Chart(salesBarChartMIO, {
        type: 'bar',
        options: chartExample2.options,
        data: mioData
      });
    }, 5000);

    // --------------------------

    // Sales MIO Line Chart
    setTimeout(() => {
    var lineChartSalesMIO = document.getElementById('chart-sales-MIO');

    chartExample1.data.labels = ['2016', '2017', '2018', '2019', '2020', '2021', '2022', '2023'];

    this.salesLineChartMIO = new Chart(lineChartSalesMIO, {
      type: 'line',
      options: chartExample1.options,
      data: chartExample1.data
    });
  }, 5000);
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

    // this.updateOptionsMIO();
    // this.updateOptionsCHO();

    // APIS Callback

    this.sales.getCity.subscribe((result) => {
      this.SelectedCity = result;
      console.log("City " + this.SelectedCity);
      this.GetDashboardDataMIO(this.SelectedCity, this.SelectedPeriodFilter);
      this.GetDashboardDataCHO(this.SelectedCity, this.SelectedPeriodFilter);
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

    this.businessService.GetBusinessData("2022", "01").subscribe((result) => {
      this.BusinessAPIData = result;
      console.log("Business API: ", this.BusinessAPIData);
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
        this.AchievementMIOPercentageValue = (achievement/salesTarget) * 100;
        this.AchievementMIOPercentageValue = this.AchievementMIOPercentageValue.toFixed();
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
        this.ActiveProvidersMIOPercentageValue = (activeProviders/totalProviders) * 100;
        this.ActiveProvidersMIOPercentageValue = this.ActiveProvidersMIOPercentageValue.toFixed();
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
        this.AchievementCHOPercentageValue = (achievement/salesTarget) * 100;
        this.AchievementCHOPercentageValue = this.AchievementCHOPercentageValue.toFixed();
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
        this.ActiveProvidersCHOPercentageValue = (activeProviders/totalProviders) * 100;
        this.ActiveProvidersCHOPercentageValue = this.ActiveProvidersCHOPercentageValue.toFixed();
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
