import { FormBuilder } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

interface JWT {
  access_token: string;
}

interface loginInfo {
    email: string;
    password: string;
}
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})



export class LoginComponent implements OnInit {


  constructor(private fb: FormBuilder, private http: HttpClient, private router: Router) { }
  loginForm = this.fb.group({
    email: [''],
    password: ['']
  });


  async doLogin() {
    let login: loginInfo;
    login = {
      email: this.loginForm.get('email').value,
      password: this.loginForm.get('password').value
    };
    console.log(login);
    // const jwt = await this.http.post<JWT>('http://localhost:8080/login', login).toPromise();
    this.http.post<JWT>('https://basic-dispatch-298807.df.r.appspot.com/login', login)
    .subscribe(res => {
      console.log('res', res);
      localStorage.setItem('access_token', res.access_token);
      this.router.navigateByUrl('/');
    }, (err) => {
      alert('Wrong email or password');
      console.log('err', err);
    });

  }
  ngOnInit(): void {

  }

}
