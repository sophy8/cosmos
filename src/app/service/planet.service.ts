import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { switchMap, catchError, tap, take } from 'rxjs/operators';
import {forkJoin, of} from 'rxjs';

const URL = 'http://localhost:3000/api/planet';
@Injectable({
  providedIn: 'root'
})
export class PlanetService {

  constructor(private http: HttpClient) { }


  getAllPlanets() {
    return this.http.get(URL).pipe(
      take(1),
      tap((res) => {}),
      catchError((res) => {
        throw new Error(res);
      })
    );
  }
}

