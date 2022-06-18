import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { CategoryComponent } from '../category/category.component';
import { CategoryDetailsComponent } from '../category-details/category-details.component';

import { DataService } from '../data/data.service';

import { RenderDetailsDirective } from '../category-details/render-details.directive';

@NgModule({
  imports: [BrowserModule, FormsModule],
  declarations: [
    AppComponent,
    CategoryComponent,
    CategoryDetailsComponent,
    RenderDetailsDirective,
  ],
  providers: [DataService],
  bootstrap: [AppComponent],
})
export class AppModule {}
