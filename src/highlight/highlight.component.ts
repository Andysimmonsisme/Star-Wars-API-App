import { KeyValue } from '@angular/common';
import {
  Component,
  OnInit,
  Input,
  OnChanges,
  SimpleChanges,
} from '@angular/core';

enum SORT {
  ASC = 'ASC',
  DESC = 'DESC',
}

@Component({
  selector: 'highlight',
  templateUrl: './highlight.component.html',
  styleUrls: ['./highlight.component.scss'],
})
export class HighlightComponent implements OnInit, OnChanges {
  constructor() {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes['clearCurrData']) {
      alert();
    }
    if (changes['currentData'] && changes['currentData'].currentValue) {
      if (this.activeCategory === 'planets') {
        this.title = '5 Largest Planets';
        this.headerRow = ['Name', 'Diameter'];
        this.getHighlights(SORT.DESC, 'diameter', 5, null);
      } else if (this.activeCategory === 'characters') {
        this.title = 'First 5 Blue Eyed Characters Sorted By Mass';
        this.headerRow = ['Name', 'Mass'];
        this.getHighlights(SORT.DESC, 'mass', 5, { eye_color: 'blue' });
      } else if (this.activeCategory === 'starships') {
        this.title = '5 Smallest Starships by Crew';
        this.headerRow = ['Name', 'Crew'];
        //replace ranges with mean
        this.currentData.forEach((row) => {
          if (row.crew.includes('-')) {
            let minAndMax = row.crew.split('-');
            row.crew = Number((minAndMax[0] + minAndMax[1]) / 2);
          }
          if (isNaN(row.crew)) row.crew = row.crew.replace(/,/g, '');
        });
        this.getHighlights(SORT.ASC, 'crew', 5, null);
      }
    }
  }

  title: string;
  headerRow: Array<string>;
  @Input() activeCategory: string;
  @Input() currentData: Array<any>;
  @Input() clearCurrData: number;

  getHighlights(sort, sortCol, numItems, filter) {
    let minMaxItem = this.currentData
      .map((x) => {
        let filterItem = false;
        if (filter)
          Object.keys(filter).forEach((key) => {
            if (x[key] && filter[key] != x[key]) filterItem = true;
          });
        if (filterItem) return -1;
        else {
          return isNaN(x[sortCol]) ? 0 : x[sortCol];
        }
      })
      .sort((a, b) => {
        return sort === SORT.ASC ? a - b : b - a;
      })
      .slice(numItems - 1, numItems); //nth element of arr in sort order
    let topItems = [];

    //iterate through rows
    this.currentData.forEach((row) => {
      let filterItem = false; //if true, item won't make it to list
      let val = isNaN(row[sortCol]) ? 0 : row[sortCol];
      if (filter)
        Object.keys(filter).forEach((key) => {
          if (row[key] && row[key] != filter[key]) {
            filterItem = true;
          }
        });
      if (sort === SORT.ASC) {
        //sort column is within range of number of items
        if (Number(val) <= Number(minMaxItem) && !filterItem) {
          let obj = {};
          this.headerRow.forEach((key) => {
            obj[key.toLowerCase()] = row[key.toLowerCase()];
          });
          topItems.push(obj);
        }
      } else {
        //sort column is within range of number of items
        if (Number(val) >= Number(minMaxItem) && !filterItem) {
          let obj = {};
          this.headerRow.forEach((key) => {
            obj[key.toLowerCase()] = row[key.toLowerCase()];
          });
          topItems.push(obj);
        }
      }
    });

    this.currentData = topItems.sort((a, b) => {
      let c = isNaN(a[sortCol]) ? 0 : a[sortCol];
      let d = isNaN(b[sortCol]) ? 0 : b[sortCol];
      return sort === SORT.ASC ? c - d : d - c;
    });
  }

  // Preserve original property order
  originalOrder = (
    a: KeyValue<number, string>,
    b: KeyValue<number, string>
  ): number => {
    return 0;
  };

  ngOnInit() {}
}
