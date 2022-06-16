import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss'],
})
export class CategoryComponent implements OnInit {
  constructor() {}
  @Input() name: string;
  @Output() sendNavItemVal = new EventEmitter<string>();

  navClick(event) {
    this.sendNavItemVal.emit(event.srcElement.innerHTML.toLowerCase());
  }
  ngOnInit() {}
}
