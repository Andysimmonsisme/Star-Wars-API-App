import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatDetails',
})
export class FormatDetailsPipe implements PipeTransform {
  transform(value: any, args?: any): any {
    let ret = value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    if (!isNaN(Number(value))) return ret;
    else if (Array.isArray(value)) return 'See more';
    else return ret;
  }
}
