import {
  Component,
  OnInit,
  Input,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { DataService } from '../data/data.service';

@Component({
  selector: 'category-details',
  templateUrl: './category-details.component.html',
  styleUrls: ['./category-details.component.scss'],
})
export class CategoryDetailsComponent implements OnInit, OnChanges {
  constructor(private dataService: DataService) {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes['activeCategory'] && changes['activeCategory'].currentValue) {
      let itemSelected = changes['activeCategory'].currentValue;
      if (itemSelected === 'planets') this.selectPlanets();
      else if (itemSelected === 'characters') this.selectCharacters();
      else if (itemSelected === 'starships') this.selectStarships();
    }
  }

  headerRow: Array<string> = [];
  rows: Array<Object> = [];
  @Input() activeCategory: string;
  @Input() mainFields: Array<string>;

  convertToTitleCase(val) {
    return val
      .split(/(?=[_])/)
      .map((p) => {
        return (p[0].toUpperCase() + p.slice(1)).replace(/(_)/, '');
      })
      .join(' ');
  }

  selectPlanets() {
    let planets = this.dataService.getPlanets();
    this.populateCategoryDetails(planets);
  }

  selectCharacters() {
    let characters = this.dataService.getCharacters();
    this.populateCategoryDetails(characters);
  }

  selectStarships() {
    let starships = this.dataService.getStarships();
    this.populateCategoryDetails(starships);
  }

  populateCategoryDetails(category) {
    let maxCols = 0;
    this.rows = [];
    category.results.forEach((obj) => {
      let numKeys = Object.keys(obj).length;
      let resetHeader = numKeys > maxCols;
      if (resetHeader) {
        maxCols = numKeys;
        this.headerRow = [];
      }
      let cols = [];
      Object.keys(obj).forEach((key) => {
        //mainFields contains key
        if (this.mainFields.indexOf(key) > -1) {
          if (resetHeader) this.headerRow.push(this.convertToTitleCase(key));

          cols.push(obj[key]);
        }
      });
      this.rows.push(cols);
    });
  }

  ngOnInit() {
    this.selectPlanets();
  }
}
