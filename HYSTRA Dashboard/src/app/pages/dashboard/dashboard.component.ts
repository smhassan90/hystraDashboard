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
    // khi = karachi
    // isb = islamabad
    this.sales.GetSalesTarget("Karachi", 1, "MIO", "MTD").subscribe((result) => {
      var split = result.data.split(",", 4);
      var value = split[1].split(":", 2);
      this.KHISalesTargetMIOValue = value[1];
    });
    this.sales.GetSalesTarget("Karachi", 1, "CHO", "MTD").subscribe((result) => {
      var split = result.data.split(",", 4);
      var value = split[1].split(":", 2);
      this.KHISalesTargetCHOValue = value[1];
    });
    // -------------------------------------------------------------------
    this.sales.GetSalesTarget("Islamabad", 1, "MIO", "MTD").subscribe((result) => {
      var split = result.data.split(",", 4);
      var value = split[1].split(":", 2);
      this.ISBSalesTargetMIOValue = value[1];
    });
    this.sales.GetSalesTarget("Islamabad", 1, "CHO", "MTD").subscribe((result) => {
      var split = result.data.split(",", 4);
      var value = split[1].split(":", 2);
      this.ISBSalesTargetCHOValue = value[1];
    });
    // ====================================================================
    this.sales.GetSalesTarget("Karachi", 2, "MIO", "MTD").subscribe((result) => {
      var split = result.data.split(",", 4);
      var value = split[1].split(":", 2);
      this.KHIAchievementMIOValue = value[1];
    });
    this.sales.GetSalesTarget("Karachi", 2, "CHO", "MTD").subscribe((result) => {
      var split = result.data.split(",", 4);
      var value = split[1].split(":", 2);
      this.KHIAchievementCHOValue = value[1];
    });
    // -------------------------------------------------------------------
    this.sales.GetSalesTarget("Islamabad", 2, "MIO", "MTD").subscribe((result) => {
      var split = result.data.split(",", 4);
      var value = split[1].split(":", 2);
      this.ISBAchievementMIOValue = value[1];
    });
    this.sales.GetSalesTarget("Islamabad", 2, "CHO", "MTD").subscribe((result) => {
      var split = result.data.split(",", 4);
      var value = split[1].split(":", 2);
      this.ISBAchievementCHOValue = value[1];
    });
    // ====================================================================
    this.sales.GetSalesTarget("Karachi", 3, "MIO", "MTD").subscribe((result) => {
      var split = result.data.split(",", 4);
      var value = split[1].split(":", 2);
      this.KHITotalProvidersMIOValue = value[1];
    });
    this.sales.GetSalesTarget("Karachi", 3, "CHO", "MTD").subscribe((result) => {
      var split = result.data.split(",", 4);
      var value = split[1].split(":", 2);
      this.KHITotalProvidersCHOValue = value[1];
    });
    // -------------------------------------------------------------------
    this.sales.GetSalesTarget("Islamabad", 3, "MIO", "MTD").subscribe((result) => {
      var split = result.data.split(",", 4);
      var value = split[1].split(":", 2);
      this.ISBTotalProvidersMIOValue = value[1];
    });
    this.sales.GetSalesTarget("Islamabad", 3, "CHO", "MTD").subscribe((result) => {
      var split = result.data.split(",", 4);
      var value = split[1].split(":", 2);
      this.ISBTotalProvidersCHOValue = value[1];
    });
    // ====================================================================
    this.sales.GetSalesTarget("Karachi", 4, "MIO", "MTD").subscribe((result) => {
      var split = result.data.split(",", 4);
      var value = split[1].split(":", 2);
      this.KHIActiveProvidersMIOValue = value[1];
    });
    this.sales.GetSalesTarget("Karachi", 4, "CHO", "MTD").subscribe((result) => {
      var split = result.data.split(",", 4);
      var value = split[1].split(":", 2);
      this.KHIActiveProvidersCHOValue = value[1];
    });
    // -------------------------------------------------------------------
    this.sales.GetSalesTarget("Islamabad", 4, "MIO", "MTD").subscribe((result) => {
      var split = result.data.split(",", 4);
      var value = split[1].split(":", 2);
      this.ISBActiveProvidersMIOValue = value[1];
    });
    this.sales.GetSalesTarget("Islamabad", 4, "CHO", "MTD").subscribe((result) => {
      var split = result.data.split(",", 4);
      var value = split[1].split(":", 2);
      this.ISBActiveProvidersCHOValue = value[1];
    });
    // ====================================================================


    this.sales.getCity.subscribe((result) => {
      this.SelectedCity = result;

      if(this.SelectedCity == "Karachi")
      {
        this.SalesTargetMIOValue = this.KHISalesTargetMIOValue;
        this.AchievementMIOValue = this.KHIAchievementMIOValue;
        this.TotalProvidersMIOValue = this.KHITotalProvidersMIOValue;
        this.ActiveProvidersMIOValue = this.KHIActiveProvidersMIOValue;

        this.SalesTargetCHOValue = this.KHISalesTargetCHOValue;
        this.AchievementCHOValue = this.KHIAchievementCHOValue;
        this.TotalProvidersCHOValue = this.KHITotalProvidersCHOValue;
        this.ActiveProvidersCHOValue = this.KHIActiveProvidersCHOValue;
      }

      else if(this.SelectedCity == "Islamabad")
      {
        this.SalesTargetMIOValue = this.ISBSalesTargetMIOValue;
        this.AchievementMIOValue = this.ISBAchievementMIOValue;
        this.TotalProvidersMIOValue = this.ISBTotalProvidersMIOValue;
        this.ActiveProvidersMIOValue = this.ISBActiveProvidersMIOValue;

        this.SalesTargetCHOValue = this.ISBSalesTargetCHOValue;
        this.AchievementCHOValue = this.ISBAchievementCHOValue;
        this.TotalProvidersCHOValue = this.ISBTotalProvidersCHOValue;
        this.ActiveProvidersCHOValue = this.ISBActiveProvidersCHOValue;
      }

      else if(this.SelectedCity == "All Districts")
      {
        this.SalesTargetMIOValue = 0;
        this.SalesTargetCHOValue = 0;
        this.SalesTargetMIOValue = parseInt(this.KHISalesTargetMIOValue) + parseInt(this.ISBSalesTargetMIOValue);
        this.SalesTargetCHOValue = parseInt(this.KHISalesTargetCHOValue) + parseInt(this.ISBSalesTargetCHOValue);
        // ----------------------------------------------
        this.AchievementMIOValue = 0;
        this.AchievementCHOValue = 0;
        this.AchievementMIOValue = parseInt(this.KHIAchievementMIOValue) + parseInt(this.ISBAchievementMIOValue);
        this.AchievementCHOValue = parseInt(this.KHIAchievementCHOValue) + parseInt(this.ISBAchievementCHOValue);
        // ----------------------------------------------
        this.TotalProvidersMIOValue = 0;
        this.TotalProvidersCHOValue = 0;
        this.TotalProvidersMIOValue = parseInt(this.KHITotalProvidersMIOValue) + parseInt(this.ISBTotalProvidersMIOValue);
        this.TotalProvidersCHOValue = parseInt(this.KHITotalProvidersCHOValue) + parseInt(this.ISBTotalProvidersCHOValue);
        // ----------------------------------------------
        this.ActiveProvidersMIOValue = 0;
        this.ActiveProvidersCHOValue = 0;
        this.ActiveProvidersMIOValue = parseInt(this.KHIActiveProvidersMIOValue) + parseInt(this.ISBActiveProvidersMIOValue);
        this.ActiveProvidersCHOValue = parseInt(this.KHIActiveProvidersCHOValue) + parseInt(this.ISBTotalProvidersCHOValue);
        // ----------------------------------------------
      }
    });

    this.businessService.GetBusinessData("2022", "01").subscribe((result) => {
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

}
