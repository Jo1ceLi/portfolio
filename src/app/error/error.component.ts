import { TdApiService } from './../td-api/td-api.service';
import { data } from 'jquery';
import { map } from 'rxjs/operators';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.css']
})
export class ErrorComponent implements OnInit {

  constructor(private activatedRoute: ActivatedRoute,
              private tdService: TdApiService) { }
  code_data: string;
  ngOnInit(): void {
    const res = this.activatedRoute.queryParams.pipe(
      map(data => data as access_code)
    );
    // ).subscribe(res => console.log(res));
    res.subscribe(
      data1 => this.code_data = data1.code
    );
    this.tdService.redir(this.code_data);
  }

}

interface access_code {
  code: string;
}
