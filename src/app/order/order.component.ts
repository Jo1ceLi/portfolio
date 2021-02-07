import { StockData } from './../stockdata';
import { Component, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DataTableDirective } from 'angular-datatables';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';


@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {
  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  @Input() stockdata: StockData;

  form: FormGroup;

  constructor(private fb: FormBuilder, private http: HttpClient, private router: Router) { }


  // stockdatas = [];
  stockdatas;
  tradeData = {
    symbol: '',
    price: 0,
    amount: 0,
    date: Date()
  };
  // tslint:disable-next-line: typedef
  async addStockData(data: StockData) {
    // this.stockdatas.push(data);
    this.tradeData.symbol = data.symbol;
    this.tradeData.price = data.price;
    if (data.type === false){
      this.tradeData.amount = data.amount * -1;
    }else{
      this.tradeData.amount = data.amount;
    }
    this.tradeData.date = data.tradeDate;
    console.log(this.tradeData);
    await this.http.post('https://basic-dispatch-298807.df.r.appspot.com/api/trade'
    , this.tradeData)
    .subscribe();
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate(['/order']);
  });

  }

  async ngOnInit() {
    this.form = this.fb.group({
      stock: 'AAPL',
      amount: 1,
      price: 200
    });
    await this.http.get('https://basic-dispatch-298807.df.r.appspot.com/api/trade')
    .toPromise()
    .then(res => {
      this.stockdatas = res;
    });
    this.dtTrigger.next();
    // .subscribe(result => {
    //   this.stockdatas = result;
    //   // console.log(result);
    // });
  }

  // ngOnChanges(changes: SimpleChanges): void {
  //   console.log(this.stockdatas);
  // }

}
