import { Injectable } from '@angular/core';
import { planets } from './models/planets';
import { characters } from './models/characters';
import { catchError } from 'rxjs/operators';
import { query } from '@angular/animations';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  constructor() {}

  private baseUrl: String = 'https://swapi.co/api';
  private data: Object = {};
  //will replace below vars with actual data from API later
  private planets = planets;
  private characters = characters;

  getPlanets() {
    return this.planets;
  }

  getCharacters() {
    return this.characters;
  }
}
