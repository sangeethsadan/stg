import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  constructor(
    private http: HttpClient
  ) { }

  search(text: string) {
    return this.http.get(`https://jsonplaceholder.typicode.com/comments?q=${text}`);
  }
}
