import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { DataTableDirective } from 'angular-datatables';
import { data } from 'jquery';
import * as moment from 'moment';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-position',
  templateUrl: './position.component.html',
  styleUrls: ['./position.component.css']
})
export class PositionComponent implements OnInit {
  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  positionDatas;
  cashDatas;
  lastClosingPriceDatas;
  constructor(private http: HttpClient) { }

  positionSum: number;
  getSum(datas): number {
    let sum = 0;
    // tslint:disable-next-line: prefer-for-of
    for (let i = 0; i < datas.length; i++ ){
        sum += (datas[i].closingprice * datas[i].amount);
    }
    return sum;
  }

  private getLastBusinessDay(): Date {
    const workday = moment();
    const day = workday.day();
    let diff = 1;  // returns yesterday
    if (day === 0 || day === 1){  // is Sunday or Monday
      diff = day + 2;  // returns Friday
    }
    return workday.subtract(diff, 'days').toDate();
  }

  private async fetchDataFromHTTP(): Promise<void>  {
    const lastBusinessDate = this.getLastBusinessDay().toJSON().slice(0, 10);
    await this.http.get('https://basic-dispatch-298807.df.r.appspot.com/api/cash/')
    .toPromise()
    .then(res => {
      this.cashDatas = res;
    });
    await this.http.get(`https://basic-dispatch-298807.df.r.appspot.com/api/closingprice/${lastBusinessDate}`)
    .toPromise()
    .then(res => {
      this.lastClosingPriceDatas = res;
    });
    await this.http.get('https://basic-dispatch-298807.df.r.appspot.com/api/positions/')
    .toPromise()
    .then(res => {
      this.positionDatas = res;
      this.positionDatas.forEach(element => {
        this.lastClosingPriceDatas.map(el => {
          if (element.symbol === el.symbol){
            element.closingprice = el.closingprice;
          }
        });
      });
      this.positionSum = this.getSum(this.positionDatas);
      this.positionSum += this.cashDatas[0].amount;
      this.positionDatas.push({symbol: 'CASH', closingprice: this.cashDatas[0].amount, amount: 1});
      this.dtTrigger.next();
    });
  }

  ngOnInit(): void {
    this.fetchDataFromHTTP();
  }

}
