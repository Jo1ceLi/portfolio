import { StockData } from './../stockdata';
import { Component, EventEmitter, OnChanges, OnInit, Output, NgModule } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';


@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  constructor(private fb: FormBuilder) { }
  @Output() newStockDataEvent = new EventEmitter<any>();


  stockdata = this.fb.group({
    stock: 'AAPL',
    price: 123,
    amount: 456,
    type: true,
    tradeDate: Date().toString().substring(4, 15)
  });



  // stockname: string;
  // amount: number;
  // price: number;
  // type: boolean;

  stockdd: StockData = {
    stock: 'a',
    price: 1,
    amount: 2,
    type: true,
    tradeDate: ''
  };


  ngOnInit(): void {


  }
  // setType(option: boolean): void{
  //   this.type = option;
  // }

  onSubmit(): void {
    this.stockdd =  {
                      stock: this.stockdata.get('stock').value,
                      price: +this.stockdata.get('price').value,
                      amount: +this.stockdata.get('amount').value,
                      type: this.stockdata.get('type').value,
                      tradeDate: this.stockdata.get('tradeDate').value
                    };
    this.newStockDataEvent.emit(this.stockdd);
  }
  // submitStock(): void{
  //   this.stockdd.stock = this.stockname;
  //   this.stockdd.price = this.price;
  //   this.stockdd.amount = this.amount;

  //   this.stockdd.type = this.type;

  //   this.stockdd.tradeDate = new Date().toLocaleDateString().substring(0, 10);
  //   this.stockAdd.emit(this.stockdd);
  // }

}
