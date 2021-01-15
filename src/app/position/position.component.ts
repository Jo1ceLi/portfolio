import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';


@Component({
  selector: 'app-position',
  templateUrl: './position.component.html',
  styleUrls: ['./position.component.css']
})
export class PositionComponent implements OnInit {

  @ViewChild(DataTableDirective)dtElement: DataTableDirective;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();

  lastClosingPrice;
  positionDatas;
  constructor(private http: HttpClient) { }

  getSum(datas): number {
    let sum = 0;
    // tslint:disable-next-line: prefer-for-of
    for (let i = 0; i < datas.length ; i++ ){
      sum += (datas[i].cost * datas[i].amount)
    }
    return sum;
  }

  async getDatas() {
    await this.http.get('https://basic-dispatch-298807.df.r.appspot.com/api/positions/').toPromise().then(
      res=>{
        this.positionDatas = res;
        // this.dtTrigger.next();
      }
    );
    await this.http.get('http://localhost:8080/api/last-closing-price').toPromise().then(
      res=>{
        this.lastClosingPrice = res;
        this.dtTrigger.next();
      }
    );
  }

  ngOnInit(): void {
    // this.getDatas();
    this.http.get('https://basic-dispatch-298807.df.r.appspot.com/api/positions/')
    .subscribe(res => {
      this.positionDatas = res;
      this.dtTrigger.next();
    });

    // this.http.get('http://localhost:8080/api/last-closing-price')
    // .subscribe(res => {
    //   this.lastClosingPrice = res;
    //   console.log(this.lastClosingPrice)
    // })

  }

}
