import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'isNumber',
})
export class IsNumberPipe implements PipeTransform {
  transform(value: any, args?: any): any {
    if (isNaN(Number(value))) return 123;
    else return value;
  }
}
