import { Injectable } from '@angular/core';
import { planets } from './models/planets';
import { characters } from './models/characters';
import { starships } from './models/starships';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { query } from '@angular/animations';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  constructor(private http: HttpClient) {}

  private baseUrl: String = 'https://swapi.dev/api';
  private headers;
  private config;
  private data: Object = {};
  //will replace below vars with actual data from API later
  private planets = planets;
  private characters = characters;
  private starships = starships;

  doHTTPReq(category, url) {
    if (!url || url !== '') url = this.baseUrl + '/' + category;
    return this.http
      .get(url, {
        observe: 'response',
        responseType: 'json',
      })
      .pipe(catchError(null));
  }

  getData(category, url) {
    return new Promise((resolve) => {
      this.doHTTPReq(category, url).subscribe((resp) => {
        // display its headers
        const keys = resp.headers.keys();

        this.headers = keys.map((key) => `${key}: ${resp.headers.get(key)}`);

        this.config = { ...resp.body! };

        this.config.results.forEach((item) => console.log('getData', item));
        console.log(this.config);
        resolve({
          lastPage: this.config.previous,
          nextPage: this.config.next,
          results: this.config.results,
        });
      });
    });
  }

  getCategory(category, url) {
    return this.getData(category, url);
  }
}
