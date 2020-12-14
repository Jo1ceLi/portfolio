import { StockData } from './../stockdata';
import { Component, EventEmitter, OnChanges, OnInit, Output, NgModule } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  @Output() newStockDataEvent = new EventEmitter<any>();
  constructor(private fb: FormBuilder, private http: HttpClient) { }
  toggle: boolean;
  stockdd: StockData;
  stockdata = this.fb.group({
    symbol: ['', Validators.required],
    price: [, [Validators.required, Validators.pattern('^[0-9]*$')]],
    amount: [, [Validators.required]],
    type: true,
    tradeDate: Date().toString().substring(4, 15)
  });

  ngOnInit(): void {


  }

  toggleBtn(tg: boolean): void{
    if (tg){
      this.toggle = false;

    }else{
      this.toggle = !this.toggle;
    }
    // console.log(this.toggle);
  }

  onSubmit(): void {
    this.stockdd =  {
                      symbol: this.stockdata.get('symbol').value,
                      price: +this.stockdata.get('price').value,
                      amount: +this.stockdata.get('amount').value,
                      type: this.stockdata.get('type').value,
                      tradeDate: this.stockdata.get('tradeDate').value
                    };
    this.newStockDataEvent.emit(this.stockdd);
  }
}
