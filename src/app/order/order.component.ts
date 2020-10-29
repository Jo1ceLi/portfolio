import { StockData } from './../stockdata';
import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';


@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit, OnChanges {

  @Input() stockdata: StockData;

  form: FormGroup;

  constructor(private fb: FormBuilder) { }


  stockdatas = [];

  addStockData(data: StockData): void {
    this.stockdatas.push(data);
    console.log(this.stockdatas);
  }


  ngOnInit(): void {
    this.form = this.fb.group({
      stock: 'AAPL',
      amount: 1,
      price: 200
    });

  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log(this.stockdatas);
  }

}
