import { data } from 'jquery';
import { Aspect6 } from 'chartjs-plugin-colorschemes/src/colorschemes/colorschemes.office';
import { Component, Input, OnInit } from '@angular/core';
import { ChartDataSets, ChartType} from 'chart.js';
import { Color, Label } from 'ng2-charts';
import * as pluginDataLabels from 'chartjs-plugin-datalabels';
import * as pluginAnnotations from 'chartjs-plugin-annotation';
import 'chartjs-plugin-labels';
import * as name from 'chartjs-plugin-colorschemes';
import * as moment from 'moment';
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

  public pieChartLabels: Label[] = [];
  public pieChartData: number[] = [];
  public pieChartType: ChartType = 'pie';
  public pieChartLegend = true;
  // public pieChartPlugins = [pluginDataLabels];
  public pieChartOptions = {
    responsive: true,
    legend: {
      position: 'right',
    },
    labels: {
        render: 'percentage',
        arc: true,
        precision: 2
    }
    // ,
    // options: {
    //   plugins: {
    //     colorschemes: {
    //       scheme: 'brewer.Paired12'
    //     }
    //   }
    // }
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

  private getLastBusinessDay(): Date {
    const workday = moment();
    const day = workday.day();
    let diff = 1;  // returns yesterday
    if (day === 0 || day === 1){  // is Sunday or Monday
      diff = day + 2;  // returns Friday
    }
    return workday.subtract(diff, 'days').toDate();
  }
  getPositionSumData(){
    const lastBusinessDate = this.getLastBusinessDay().toJSON().slice(0, 10);
    const res = new Array<rawData>();
    const subscription = this.http.get('https://basic-dispatch-298807.df.r.appspot.com/api/positions')
    .subscribe(async positions => {
      const cashDatas = await this.http.get('https://basic-dispatch-298807.df.r.appspot.com/api/cash/')
      .toPromise();
      this.pieChartData.push(cashDatas[0].amount);
      this.pieChartLabels.push('$$CASH');
      // console.log(cashDatas);
      this.position_data = positions;
      this.http.get(`https://basic-dispatch-298807.df.r.appspot.com/api/closingprice/${lastBusinessDate}`)
      .subscribe(closingprice => {
        this.closing_price = closingprice;
        // console.log(this.position_data, this.closing_price);
        this.closing_price.map(eleClosingPrice => {
          this.position_data.forEach(elePosition => {
            if (elePosition.symbol === eleClosingPrice.symbol){
              this.pieChartData.push(eleClosingPrice.closingprice * elePosition.amount);
              this.pieChartLabels.push(elePosition.symbol);
              // console.log(elePosition.symbol, eleClosingPrice.closingprice * elePosition.amount);
            }
          });
        });
      });
    });
  }

  ngOnInit(): void {
    this.getPositionSumData();
  }
}
