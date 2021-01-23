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
        // return true;
        const JWT = localStorage.getItem('access_token');
        // console.log('got access', JWT);
        return this.http.post('http://localhost:8080/verify', {access_token: JWT})
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


        // .pipe(map((res: {authenticated: boolean}) => {
        //   if (res.authenticated === true){
        //     return true;
        //   }
        // }) );


        // tslint:disable-next-line: object-literal-key-quotes
        // this.http.post('http://localhost:8080/verify', {'access_token': access_toekn})
        // .pipe(
        //   map((res) => true )
        // );
      }else{
        console.log('else');
        return false;
      }

    }
    // .subscribe((res) => {
    //   console.log(res);
    //   return true;
    // }, (err) => {
    //   console.log(err);
    //   console.log(state);
    //   return this.router.navigateByUrl('/login?returnUrl=' + state.url);
    // });

}
