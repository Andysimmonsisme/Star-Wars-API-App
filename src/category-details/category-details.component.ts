import {
  Component,
  EventEmitter,
  Input,
  Output,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
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
      let itemSelected = changes['activeCategory'].currentValue;
      if (itemSelected === 'planets') this.selectCategory('planets', '');
      else if (itemSelected === 'characters') this.selectCategory('people', '');
      else if (itemSelected === 'starships')
        this.selectCategory('starships', '');
    }
    if (changes['highlightName']) {
      this.getDetailsByName(this.highlightName);
    }
  }

  headerRow: Array<string> = [];
  rows: Array<Object> = [];
  allData: Array<Object> = [];
  selectedRow: any = {};
  showModal: boolean = false;
  loading: boolean;
  lastPage: string = null;
  nextPage: string = null;
  newPage: number = 0;
  @Input() activeCategory: string;
  @Input() mainFields: Array<string>;
  @Input() highlightName: string;
  @Output() sendCurrData = new EventEmitter<Array<Object>>();
  @Output() sendNewPage = new EventEmitter<number>();

  convertToTitleCase(val) {
    let frags = val.split('_');
    for (let i = 0; i < frags.length; i++) {
      frags[i] = frags[i].charAt(0).toUpperCase() + frags[i].slice(1);
    }
    return frags.join(' ');
  }

  selectCategory(category, url) {
    this.headerRow = [];
    this.rows = [];
    this.loading = true;
    this.dataService.getCategory(category, url).then((data: any) => {
      console.log(data);
      this.lastPage = data.lastPage;
      this.nextPage = data.nextPage;
      this.allData = data.results;
      console.log(this.allData);
      this.sendCurrData.emit(data.results);
      this.populateCategoryDetails(data.results);
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
    this.sendNewPageFunc();
    this.selectCategory(
      this.activeCategory.replace('characters', 'people'),
      this.lastPage
    );
  }

  goToNextPage() {
    this.sendNewPageFunc();
    this.selectCategory(
      this.activeCategory.replace('characters', 'people'),
      this.nextPage
    );
  }

  getRowData(index: number) {
    //remove key/value pairs with empty value
    return Object.keys(this.allData[index])
      .filter((key) => this.allData[index][key].length > 0)
      .reduce((cur, key) => {
        return Object.assign(cur, { [key]: this.allData[index][key] });
      }, {});
  }

  showAllDetails(rowIndex) {
    this.selectedRow = this.getRowData(rowIndex);
    console.log(this.selectedRow);
    this.showModal = true;
  }

  getDetailsByName(name: string) {
    let index = -1;
    for (let i = 0; i < this.allData.length; i++) {
      console.log(name, this.allData[i]['name'].toLowerCase());
      if (this.allData[i]['name'].toLowerCase() === name) index = i;
    }
    if (index > -1) this.showAllDetails(index);
  }

  sendNewPageFunc() {
    this.sendNewPage.emit(this.newPage++);
  }
}
