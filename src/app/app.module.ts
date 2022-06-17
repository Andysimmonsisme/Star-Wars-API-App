import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { CategoryComponent } from '../category/category.component';
import { CategoryDetailsComponent } from '../category-details/category-details.component';

import { IsNumberPipe } from '../category-details/is-number.pipe';

import { DataService } from '../data/data.service';

@NgModule({
  imports: [BrowserModule, FormsModule],
  declarations: [
    AppComponent,
    CategoryComponent,
    CategoryDetailsComponent,
    IsNumberPipe,
  ],
  providers: [DataService],
  bootstrap: [AppComponent],
})
export class AppModule {}
