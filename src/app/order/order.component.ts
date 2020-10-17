import { StockData } from './../stockdata';
import { Component, Input, OnInit } from '@angular/core';


@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {

  @Input() stockdata: StockData;
  // stockdatas: StockData[] = [
  //   {stock: 'AAPL', amount: 1, price: 120, type: true, tradeDate: '2020-10-15'},
  //   {stock: 'TSLA', amount: 2, price: 370, type: true, tradeDate: '2020-10-15'},
  //   {stock: 'MSFT', amount: 3, price: 220, type: true, tradeDate: '2020-10-15'},
  // ];
  show: boolean;



  constructor() { }

  ngOnInit(): void {

  }


}
