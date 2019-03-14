import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap, catchError, take } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Storage } from '@ionic/storage';
import { Platform, AlertController } from '@ionic/angular';
import { BehaviorSubject } from 'rxjs';
import { StorageService} from '../service/storage.service';
export const URL = 'http://localhost:3000/api/register';
export const URL_LOGIN = 'http://localhost:3000/api/login';

const TOKEN_KEY = 'access_token';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  authenticationState = new BehaviorSubject(false);
  user = null;

  constructor(private http: HttpClient, private storage: StorageService, private helper: JwtHelperService,  private plt: Platform) {
    this.plt.ready().then(() => {
      this.checkToken();
    });
   }
   checkToken() {
   const token =  this.storage.getData(TOKEN_KEY);
   console.log(token)
   console.log(this.authenticationState)

      if (!!token) {
        const decoded = this.helper.decodeToken(token);
        const isExpired = this.helper.isTokenExpired(token);

        if (!isExpired) {
          this.user = decoded;
          this.authenticationState.next(true);
        } else {
          this.storage.remove(TOKEN_KEY);
        }
      }
      console.log(this.authenticationState.value)

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
          console.log(res);
          this.storage.setData(TOKEN_KEY, res['token']);
          this.user = this.helper.decodeToken(res['token']);
          this.authenticationState.next(true);
       }),
        catchError(e => {
          throw new Error(e);
        })
      );
  }

  logout() {
  this.storage.remove(TOKEN_KEY);
      this.authenticationState.next(false);
  }

  isAuthenticated() {
    return this.authenticationState.value;
  }
}


