import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  url = `https://auth.tdameritrade.com/auth?response_type=code&redirect_uri=https%3A%2F%2Fportfolio-298915.df.r.appspot.com%2F&client_id=VUFPF8RYVMMTP1QV0J1VWDUGCF2VTJQ6%40AMER.OAUTHAP`;
  constructor(private router: Router) { }

  ngOnInit(): void {
  }
  // auth() {

  //   this.router.navigate(['../']);
  // }
  goAuth() {
    window.location.href = this.url;
  }

}
