import { Component, OnChanges, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit, OnChanges {

  constructor() { }

  stock: string;
  amount: number;
  price: number;

  ngOnInit(): void {
  }

  ngOnChanges(): void{

  }
  submitStock(): void{

  }

}
