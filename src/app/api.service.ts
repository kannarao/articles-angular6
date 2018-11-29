import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  getArticles(): Promise<any> {
    let url = "https://hn.algolia.com/api/v1/search_by_date?tags=story";
    return this.http.get(url).toPromise();
  }
}
