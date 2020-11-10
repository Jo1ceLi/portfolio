import { StockData } from './../stockdata';
import { Component, EventEmitter, OnChanges, OnInit, Output, NgModule } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  @Output() newStockDataEvent = new EventEmitter<any>();
  constructor(private fb: FormBuilder) { }
  toggle: boolean;
  stockdd: StockData;
  stockdata = this.fb.group({
    stock: ['AAPL', Validators.required],
    price: [120, [Validators.required, Validators.pattern('^[0-9]*$')]],
    amount: [456, [Validators.required, Validators.pattern('^[0-9]*$')]],
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
                      stock: this.stockdata.get('stock').value,
                      price: +this.stockdata.get('price').value,
                      amount: +this.stockdata.get('amount').value,
                      type: this.stockdata.get('type').value,
                      tradeDate: this.stockdata.get('tradeDate').value
                    };
    this.newStockDataEvent.emit(this.stockdd);
  }
}
