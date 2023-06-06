import { Component, OnInit } from '@angular/core';
import Chart from 'chart.js';

// core components
import {
  chartOptions,
  parseOptions,
  chartExample1,
  chartExample2
} from "../../variables/charts";

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

  public SelectedCity: string = "Karachi";
  public SelectedPeriodFilter: string = "MTD";

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

  public SelectKarachi(): void
  {
    this.SelectedCity = "Karachi";
  }

  public SelectRawalpindi(): void
  {
    this.SelectedCity = "Rawalpindi";
  }

  public SelectAllDistricts(): void
  {
    this.SelectedCity = "All Districts";
  }

  public SelectMTD(): void
  {
    this.SelectedPeriodFilter = "MTD";
  }

  public SelectYTI(): void
  {
    this.SelectedPeriodFilter = "YTI";
  }

  public SelectPTD(): void
  {
    this.SelectedPeriodFilter = "PTD";
  }

}
