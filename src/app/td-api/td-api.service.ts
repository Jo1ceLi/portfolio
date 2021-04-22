import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { exception } from 'console';
import fetch from 'node-fetch';

@Injectable({
  providedIn: 'root'
})
export class TdApiService {

  encodedCode: string;
  // tslint:disable-next-line:variable-name
  access_token: string;
  // tslint:disable-next-line:variable-name
  refresh_token: string;
  constructor(private router: Router) { }

  redir(encodedCode: string, dir: string = 'dashboard'): void {
    this.encodedCode = encodedCode;
    this.router.navigate([dir]);
  }
  async getAccessTokenByRefreshToken(): Promise<Token> {
    const apiUrl = `https://api.tdameritrade.com/v1/oauth2/token`;
    let body: any = {
        grant_type: 'refresh_token',
        refresh_token: localStorage.getItem('refresh_token'),
        client_id: 'VUFPF8RYVMMTP1QV0J1VWDUGCF2VTJQ6',
    };
    body = Object.keys(body).map(key => encodeURIComponent(key) + '=' + encodeURIComponent(body[key])).join('&');
    const token = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': `application/x-www-form-urlencoded`},
        body
    }).then(res => res.json().then(data => {
      const tokens = data as Token;
      this.access_token = tokens.access_token;
      localStorage.setItem('token', this.access_token);
      return tokens;
    })).catch(err => {
      console.log(err, 'invalid refresh_token');
      throw new Error(err);
    });
    return token;
  }


  async getToken(): Promise<AccessTokenResponse> {
    const apiUrl = `https://api.tdameritrade.com/v1/oauth2/token`;

    const code = decodeURIComponent(decodeURIComponent(this.encodedCode));
    let body: any = {
        grant_type: 'authorization_code',
        access_type: 'offline',
        code: this.encodedCode,
        client_id: 'VUFPF8RYVMMTP1QV0J1VWDUGCF2VTJQ6',
        redirect_uri: 'http://localhost:4200'
    };
    body = Object.keys(body).map(key => encodeURIComponent(key) + '=' + encodeURIComponent(body[key])).join('&');
    const res = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': `application/x-www-form-urlencoded`},
        body
    }).then(resp => resp.json().then(data => {
      const tokens = data as AccessTokenResponse;
      this.refresh_token =  tokens.refresh_token;
      localStorage.setItem('refresh_token', this.refresh_token);
      return tokens;
    }));
    return res;
  }
  // tslint:disable-next-line:variable-name
  async fetchWithAuthHeaders<T>(apiUrl: string, method: string = 'POST', access_token?: string ,
                                searchParams?: URLSearchParams, body?: string): Promise<T> {
      method = method.toUpperCase();
      const url = new URL(apiUrl);
      if (searchParams){
          url.search = searchParams.toString();
      }
      const response: T = await fetch(url, {
          method,
          headers: { Authorization: `Bearer ` + access_token },
          body
      }).then(res => res.json());
      return response;
  }
  // tslint:disable-next-line:variable-name
  async getAccount(accoundId: string, access_token: string, fields: string): Promise<any> {
    const searchParams = new URLSearchParams({
        fields
      });
    const apiUrl = `https://api.tdameritrade.com/v1/accounts/`;
    const res = await this.fetchWithAuthHeaders<any>(apiUrl, 'GET', access_token,  searchParams);
    return res;
  }
}
interface AccessTokenResponse {
  access_token: string;
  refresh_token: string;
  scope: string;
  expires_in: number;
  refresh_token_expires_in: number;
  token_type: string;
}
export interface Token
{
    access_token: string;
    refresh_token: string;
    token_type: string;
    expires_in: number;
    scope: string;
    refresh_token_expires_in: number;
}
