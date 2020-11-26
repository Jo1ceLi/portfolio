import { EditComponent } from './edit/edit.component';
import { StockData } from './stockdata';
import { Component, ViewChild } from '@angular/core';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})



export class AppComponent {
  title = 'portfolio';
  stockdatas: StockData[] = [

  ];

  // @ViewChild(EditComponent) private editComponent: EditComponent;

  // onStockAdded(stock: StockData): void{
  //   console.log(stock);
  //   this.stockdatas.push({
  //     symbol: stock.symbol,
  //     amount: stock.amount,
  //     price: stock.price,
  //     type: stock.type,
  //     tradeDate: stock.tradeDate
  //   });

  // }
}
