import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }
  getData(key: string): any {
    return JSON.parse(localStorage.getItem(key));
  }
  setData(key: string, data: any) {
    localStorage.setItem(key, JSON.stringify(data));
  }
  remove(key: string) {
    localStorage.removeItem(key);
  }
  getImg(key: string): any {
    return localStorage.getItem(key);
  }
  setImg(key: string, data: any) {
    localStorage.setItem(key, data);
  }
}
