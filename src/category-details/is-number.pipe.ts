import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'isNumber',
})
export class IsNumberPipe implements PipeTransform {
  transform(value: any, args?: any): any {
    let ret = value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    if (!isNaN(Number(value))) return ret;
    else return value;
  }
}
