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
  allData: Object = {};
  selectedRow: any = {};
  @Input() activeCategory: string;
  @Input() mainFields: Array<string>;

  convertToTitleCase(val) {
    let frags = val.split('_');
    for (let i = 0; i < frags.length; i++) {
      frags[i] = frags[i].charAt(0).toUpperCase() + frags[i].slice(1);
    }
    return frags.join(' ');
  }

  selectPlanets() {
    let planets = this.dataService.getPlanets();
    this.allData = planets.results;
    console.log(this.allData);
    this.populateCategoryDetails(planets);
  }

  selectCharacters() {
    let characters = this.dataService.getCharacters();
    this.allData = characters.results;
    console.log(this.allData);
    this.populateCategoryDetails(characters);
  }

  selectStarships() {
    let starships = this.dataService.getStarships();
    this.allData = starships.results;
    console.log(this.allData);
    this.populateCategoryDetails(starships);
  }

  populateCategoryDetails(category) {
    let maxCols = 0;
    this.rows = [];
    category.results.forEach((obj) => {
      let numKeys = Object.keys(obj).length;
      let resetHeader = numKeys > maxCols;
      let cols = [];
      if (resetHeader) {
        maxCols = numKeys;
        this.headerRow = [];
      }
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

  getRowData(index: number) {
    return this.allData[index];
  }

  showAllCategoryDetails(rowIndex) {
    this.selectedRow = this.getRowData(rowIndex);
    console.log(this.selectedRow);
    this.showModal();
  }

  showModal() {
    document.getElementById('modal-bg').classList.remove('hide');
    document.getElementById('modal').classList.remove('hide');
  }

  closeModal() {
    document.getElementById('modal-bg').classList.add('hide');
    document.getElementById('modal').classList.add('hide');
  }

  ngOnInit() {
    this.selectPlanets();
    this.closeModal();
  }
}
