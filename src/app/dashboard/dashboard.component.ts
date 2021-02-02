import { Component, Input, OnInit } from '@angular/core';
import { ChartDataSets, ChartOptions, ChartType, plugins, PluginServiceGlobalRegistration } from 'chart.js';
import { Color, BaseChartDirective, Label, PluginServiceGlobalRegistrationAndOptions } from 'ng2-charts';
import * as pluginAnnotations from 'chartjs-plugin-annotation';
import { HttpClient } from '@angular/common/http';

interface rawData{
  symbol: string;
  cost: number;
}
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {


  @Input() tradedata;
  public pieChartLabels: Label[] = [['Download', 'Sales'], ['In', 'Store', 'Sales'], 'Mail Sales'];
  public pieChartData: number[] = [300, 500, 100];
  // public pieChartLabels: Label[] = [];
  // public pieChartData: number[] = [];
  public pieChartType: ChartType = 'pie';
  public pieChartLegend = true;
  public pieChartPlugins = {
  };
  public pieChartColors = [
    {
      backgroundColor: ['rgba(255,0,0,0.3)', 'rgba(0,255,0,0.3)', 'rgba(0,0,255,0.3)'],
    },
  ];
  public pieChartOptions = {
    responsive: true,
    legend: {
      position: 'right',
    },

      labels: {
          render: 'percentage',
          fontColor: ['green', 'white', 'red'],
          precision: 2
      }
  };


  public lineChartData: ChartDataSets[] = [
    {data: [27120, 27757, 28883, 30581, 31106, 32450, 32975, 35180], label: 'Stock portfolio'}
  ];

  public lineChartLabels: Label[] = ['2020-10-22', '2020-11-04', '2020-11-17', '2020-11-30', '2020-12-11', '2020-12-24', '2021-01-06', '2021-01-19'];
  public lineChartOptions = {
    responsive: true,
    maintainAspectRatio : false,

  };
  public lineChartColors: Color[] = [
    { // grey
      backgroundColor: 'rgba(148,159,177,0.2)',
      borderColor: 'rgba(148,159,177,1)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    },
    { // dark grey
      backgroundColor: 'rgba(77,83,96,0.2)',
      borderColor: 'rgba(77,83,96,1)',
      pointBackgroundColor: 'rgba(77,83,96,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(77,83,96,1)'
    },
    { // red
      backgroundColor: 'rgba(255,0,0,0.3)',
      borderColor: 'red',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    }
  ];
  public lineChartLegend = true;
  public lineChartType: ChartType = 'line';
  public lineChartPlugins = [pluginAnnotations];

  position_data;
  closing_price;
  constructor(private http: HttpClient){}

  getPositionSumData(){
    const res = new Array<rawData>();
    const subscription = this.http.get('https://basic-dispatch-298807.df.r.appspot.com/api/positions')
    .subscribe(positions => {

      this.pieChartData.push(12007);
      this.pieChartLabels.push('CASH');
      this.position_data = positions;
      this.http.get('https://basic-dispatch-298807.df.r.appspot.com/api/closingprice/2021-01-25')
      .subscribe(closingprice => {
        this.closing_price = closingprice;
        console.log(this.position_data, this.closing_price);
        this.closing_price.map(eleClosingPrice => {
          this.position_data.forEach(elePosition => {
            if (elePosition.symbol === eleClosingPrice.symbol){
              this.pieChartData.push(eleClosingPrice.closingprice * elePosition.amount);
              this.pieChartLabels.push(elePosition.symbol);
              console.log(elePosition.symbol, eleClosingPrice.closingprice * elePosition.amount);
            }
          });
        });
      });
    });
  }

  ngOnInit(): void {
    // this.getPositionSumData();
  }
}
