import { Component } from '@angular/core';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  constructor() {}
  categories = ['Planets', 'Characters', 'Starships'];
  activeCategory = 'planets';

  receiveNavItemVal($event) {
    this.activeCategory = $event;
  }
  ngOnInit() {}
}
