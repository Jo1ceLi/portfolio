import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { DataTableDirective } from 'angular-datatables';
import { data } from 'jquery';
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
  lastClosingPriceDatas;
  constructor(private http: HttpClient) { }

  positionSum;
  getSum(datas): number {
    let sum = 0;
    // tslint:disable-next-line: prefer-for-of
    for (let i = 0; i < datas.length; i++ ){
      if (i < datas.length - 1){
        sum += (datas[i].cost * datas[i].amount);
      }else{
        sum += datas[i].closingprice;
      }

    }
    return sum;
  }

  ngOnInit(): void {
    const today = new Date();
    today.setDate(today.getDate() - 1);
    const todayString = (today.toISOString().slice(0, 10));
    this.http.get(`http://localhost:8080/api/closingprice/2021-01-15`)
    .subscribe(res => {
      this.lastClosingPriceDatas = res;
    });
    this.http.get('https://basic-dispatch-298807.df.r.appspot.com/api/positions/')
    .subscribe(res => {
      this.positionDatas = res;
      this.positionDatas.forEach(element => {
        this.lastClosingPriceDatas.map(el => {
          if (element.symbol === el.symbol){
            element.closingprice = el.closingprice;
          }
        });
      });
      this.positionDatas.push({symbol: 'CASH', closingprice: 14778, amount: 1});
      this.positionSum = this.getSum(this.positionDatas);
      this.dtTrigger.next();

    });
  }

}
