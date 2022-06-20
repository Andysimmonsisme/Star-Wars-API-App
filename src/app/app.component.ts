import { Component } from '@angular/core';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  constructor() {}
  categories = [
    { name: 'Planets', mainFields: ['name', 'population', 'terrain'] },
    { name: 'Characters', mainFields: ['name', 'gender', 'birth_year'] },
    { name: 'Starships', mainFields: ['name', 'model', 'manufacturer'] },
  ];
  activeCategory: string = 'planets';
  mainFields: Array<string> = this.categories[0].mainFields;
  currentData: Array<Object>;

  receiveNavItemVal($event) {
    this.activeCategory = $event;
    this.categories.forEach((category) => {
      //get mainFields for active category
      if (category.name.toLowerCase() === this.activeCategory)
        this.mainFields = category.mainFields;
    });
  }

  receiveCurrData($event) {
    this.currentData = $event;
  }

  ngOnInit() {}
}
