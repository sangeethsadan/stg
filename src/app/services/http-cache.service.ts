import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpCacheService {

  constructor() { }

  private cache: any = {};

  put(url: string, body: any) {
    this.cache[url] = body;
  }

  get(url: string) {
    return this.cache[url];
  }
}
