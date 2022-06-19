import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { DataService } from '../data/data.service';

@Component({
  selector: 'category-details',
  templateUrl: './category-details.component.html',
  styleUrls: ['./category-details.component.scss'],
})
export class CategoryDetailsComponent implements OnChanges {
  constructor(private dataService: DataService) {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes['activeCategory'] && changes['activeCategory'].currentValue) {
      let activeCategory = changes['activeCategory'].currentValue;
      let itemSelected = activeCategory;
      this.headerRow = [];
      this.rows = [];
      this.loading = true;
      if (itemSelected === 'planets') this.selectCategory('planets', '');
      else if (itemSelected === 'characters') this.selectCategory('people', '');
      else if (itemSelected === 'starships')
        this.selectCategory('starships', '');
    }
  }

  headerRow: Array<string> = [];
  rows: Array<Object> = [];
  allData: Object = {};
  selectedRow: any = {};
  showModal: boolean = false;
  loading: boolean;
  lastPage: string = null;
  nextPage: string = null;
  @Input() activeCategory: string;
  @Input() mainFields: Array<string>;

  convertToTitleCase(val) {
    let frags = val.split('_');
    for (let i = 0; i < frags.length; i++) {
      frags[i] = frags[i].charAt(0).toUpperCase() + frags[i].slice(1);
    }
    return frags.join(' ');
  }

  handleReceivedDetails(data) {
    console.log(data);
    this.lastPage = data.lastPage;
    this.nextPage = data.nextPage;
    this.allData = data.results;
    console.log(this.allData);
    this.populateCategoryDetails(data.results);
  }

  selectCategory(category, url) {
    this.dataService.getCategory(this.activeCategory, url).then((data: any) => {
      this.handleReceivedDetails(data);
    });
  }

  populateCategoryDetails(category) {
    let maxCols = 0;
    this.rows = [];
    category.forEach((obj) => {
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
    this.loading = false;
  }

  goToLastPage() {
    this.selectCategory(
      this.activeCategory.replace('characters', 'people'),
      this.lastPage
    );
  }

  goToNextPage() {
    this.selectCategory(this.activeCategory.replace('characters', 'people'), this.nextPage);
  }

  getRowData(index: number) {
    //remove key/value pairs with empty value
    return Object.keys(this.allData[index])
      .filter((key) => this.allData[index][key].length > 0)
      .reduce((cur, key) => {
        return Object.assign(cur, { [key]: this.allData[index][key] });
      }, {});
  }

  showAllCategoryDetails(rowIndex) {
    this.selectedRow = this.getRowData(rowIndex);
    console.log(this.selectedRow);
    this.showModal = true;
  }
}
