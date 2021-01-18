import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, OnInit } from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';

@Component({
  selector: 'app-position',
  templateUrl: './position.component.html',
  styleUrls: ['./position.component.css']
})
export class PositionComponent implements OnInit,AfterViewInit {


  positionDatas = {};
  dataSource = new MatTableDataSource();

  constructor(private http: HttpClient) { }

  getSum(datas): number {
    let sum = 0;
    // tslint:disable-next-line: prefer-for-of
    for (let i = 0; i < datas.length ; i++ ){
      sum += (datas[i].cost * datas[i].amount)
    }
    return sum;
  }

  ngOnInit(): void {
    this.http.get('https://basic-dispatch-298807.df.r.appspot.com/api/positions/')
    .subscribe(res => {
      this.positionDatas = res;
      console.log(this.positionDatas);
    });
  }
  ngAfterViewInit(): void {

  }

}
