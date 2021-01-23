import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

interface JWT {
  access_token: string;
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})



export class LoginComponent implements OnInit {


  constructor(private http: HttpClient) { }


  async doLogin() {
    const jwt = await this.http.post<JWT>('http://localhost:8080/login', {user: 'alan'}).toPromise();

    localStorage.setItem('access_token', jwt.access_token);
  }
  ngOnInit(): void {

  }

}
