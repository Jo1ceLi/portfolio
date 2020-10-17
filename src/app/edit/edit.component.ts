import { StockData } from './../stockdata';
import { Component, EventEmitter, OnChanges, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  constructor() { }

  @Output() stockAdd = new EventEmitter<StockData>();

  stockname: string;
  amount: number;
  price: number;
  type: boolean;

  stockdd: StockData = {
    stock: null,
    price: null,
    amount: null,
    type: null,
    tradeDate: null
  };



  ngOnInit(): void {


  }
  setType(option: boolean): void{
    this.type = option;
  }

  submitStock(): void{
    this.stockdd.stock = this.stockname;
    this.stockdd.price = this.price;
    this.stockdd.amount = this.amount;

    this.stockdd.type = this.type;

    this.stockdd.tradeDate = new Date().toLocaleDateString().substring(0, 10);
    this.stockAdd.emit(this.stockdd);
  }

}
