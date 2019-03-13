import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap, catchError, take } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Storage } from '@ionic/storage';
import { Platform, AlertController } from '@ionic/angular';
import { BehaviorSubject } from 'rxjs';

export const URL = 'http://localhost:3000/api/register';
export const URL_LOGIN = 'http://localhost:3000/api/login';

const TOKEN_KEY = 'access_token';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  authenticationState = new BehaviorSubject(false);
  user = null;

  constructor(private http: HttpClient, private storage: Storage, private helper: JwtHelperService,  private plt: Platform) {
    this.plt.ready().then(() => {
      this.checkToken();
    });
   }
   checkToken() {
    this.storage.get(TOKEN_KEY).then(token => {
      if (token) {
        let decoded = this.helper.decodeToken(token);
        let isExpired = this.helper.isTokenExpired(token);

        if (!isExpired) {
          this.user = decoded;
          this.authenticationState.next(true);
        } else {
          this.storage.remove(TOKEN_KEY);
        }
      }
    });
  }
  register(data) {
    return this.http.post(URL, data).pipe(
      take(1),
      tap((res) => { }),
      catchError(e => {
        throw new Error(e);
      })
    );
  }
  login(credentials) {
    return this.http.post(URL_LOGIN, credentials)
      .pipe(
        take(1),
        tap(res => {
          this.storage.set(TOKEN_KEY, res['token']);
          this.user = this.helper.decodeToken(res['token']);
          this.authenticationState.next(true);
       }),
        catchError(e => {
          throw new Error(e);
        })
      );
  }

  logout() {
    this.storage.remove(TOKEN_KEY).then(() => {
      this.authenticationState.next(false);
    });
  }
}
