import { StockData } from './stockdata';
import { Component } from '@angular/core';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})



export class AppComponent {
  title = 'portfolio';
  stockdatas: StockData[] = [
  // {stock: 'AAPL', amount: 1, price: 120, type: true, tradeDate: '2020-10-15'},
  // {stock: 'TSLA', amount: 2, price: 370, type: true, tradeDate: '2020-10-15'},
  // {stock: 'MSFT', amount: 3, price: 220, type: true, tradeDate: '2020-10-15'},
  ];
  onStockAdded(stock: StockData): void{
    console.log(stock);
    this.stockdatas.push({
      stock: stock.stock,
      amount: stock.amount,
      price: stock.price,
      type: stock.type,
      tradeDate: stock.tradeDate
    });

  }
}
