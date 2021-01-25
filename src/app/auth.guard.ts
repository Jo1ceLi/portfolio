import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { catchError, tap, map, take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})


export class AuthGuard implements CanActivate {

  constructor(private http: HttpClient, private router: Router) { }

   canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if (localStorage.getItem('access_token')){
        const JWT = localStorage.getItem('access_token');
        return this.http.post('https://basic-dispatch-298807.df.r.appspot.com/verify', {access_token: JWT})
        .pipe(map((res) => {
          if (res){
            console.log(res);
            return true;
          }
          else{
            console.log('not allow');
            this.router.navigateByUrl('/login');
            return false;
          }
        }));
      }else{
        this.router.navigateByUrl('/login');
        return false;
      }
    }
}
