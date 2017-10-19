import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { Http, Headers, Response, ResponseContentType, RequestOptions } from "@angular/http";
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs';
import 'rxjs/Rx';


@Injectable()
export class AuthService implements CanActivate {

  	root_url:string = 'http://127.0.0.1:8000';
  	login_address:string = '/api/auth/token/';
  	register_address:string = '/api/users/register/';
    token_verify_url = '/api-token-verify/';
    username:string;
  	constructor(private http: Http, private router: Router) { } 

  	canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        if (localStorage.getItem('token')) {
          this.verify_token(localStorage.getItem('token'))
            .subscribe(
                data => {
                  return true;
                },
                error => {
                    this.router.navigate(['/authentication']);
                    return false;
            });
            return true;
        }
        // not logged in so redirect to login page with the return url
        this.router.navigate(['/authentication']);
        return false;
    }

    get_root_url():string {
        return this.root_url;
    }

    getToken() {
        return localStorage.getItem('token');
    }

    getUsername() {
        return localStorage.getItem('username');
    }
    getUserId() {
        return localStorage.getItem('user_id');
    }

    isAuthenticated() {
        if (localStorage.getItem('token')){
            return true;
        }else {
            return false;
        }
    }

    logout() {
        localStorage.removeItem('token');
        localStorage.removeItem('username');
        this.router.navigate(['/authentication']);
    }

    verify_token(token: string) {
        let myheaders = new Headers();
            myheaders.append('access-control-allow-headers', 'x-xsrf-token');
            myheaders.append('content-type', 'application/json');
            myheaders.append('X-Requested-With', 'XMLHttpRequest');
            myheaders.append('accept', 'application/json');

          return this.http.post( this.root_url + this.token_verify_url,
          {
              token: token
          },
          {
              headers: myheaders
          })
          .map((res) => {
            return res.json();
          })
          .do((res) => {
            
            }
          );
    }

    signup(username: string, email: string, password: string) {
        let myheaders = new Headers();
          myheaders.append('Content-Type', 'application/json');
          myheaders.append('X-Requested-With', 'XMLHttpRequest');
          myheaders.append('Accept', 'application/json');
        return this.http.post(this.root_url + this.register_address,
          {
              username: username, email: email, password: password
          },
          {
                headers: myheaders
          });
    }

    signin(username:string, password: string) {
          console.log(username + " " + password);
          this.username = username;
          let myheaders = new Headers();
          myheaders.append('Content-Type', 'application/json');
          myheaders.append('X-Requested-With', 'XMLHttpRequest');
          myheaders.append('Accept', 'application/json');
          // myheaders.append('access-control-allow-headers', 'x-xsrf-token');
          //     /api/auth/token/
          //     /api/users/login/
          return this.http.post(this.root_url + this.login_address,
          {
              username: username, password: password
          },
          {
              headers: myheaders
          })
          .map((res) => {
              return res.json();
          })
          .do((res) => {
              localStorage.setItem('token', res.token);
              localStorage.setItem('username', this.username);
            }
          );
  	}

  getUsers(user_list_url:string, token:string): Observable<any> {
      console.log(user_list_url);
      let myheaders = new Headers();
      let jwt_token = 'JWT ' + token;
      myheaders.append('X-Requested-With', 'XMLHttpRequest');
      myheaders.append('Accept', 'application/json');
      myheaders.append('Content-Type', 'application/json');
      myheaders.append('Authorization', jwt_token);
      return this.http.get( user_list_url, {
        headers: myheaders
      })
      .map((res) => {
        return res.json();
      });
  }

}
