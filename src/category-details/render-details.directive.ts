import {
  Directive,
  ElementRef,
  Input,
  OnChanges,
  SimpleChanges,
} from '@angular/core';

@Directive({
  selector: '[renderDetails]',
})
export class RenderDetailsDirective implements OnChanges {
  @Input() renderDetails;
  constructor(private el: ElementRef) {}

  isValidHttpUrl(string) {
    let url;
    console.log(string);
    try {
      url = new URL(string);
    } catch (_) {
      return string;
    }
    return '<a target="_blank" href="' + string + '">' + string + '</a>';
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['renderDetails'] && changes['renderDetails'].currentValue) {
      let value = changes['renderDetails'].currentValue;
      let ret = value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
      if (!isNaN(Number(value))) this.el.nativeElement.innerHTML = ret;
      else if (Array.isArray(value)) {
        value.forEach((el) => {
          this.el.nativeElement.innerHTML +=
            '<br>' + '<a target="_blank" href="' + el + '">' + el + '</a>';
        });
      } else this.el.nativeElement.innerHTML = this.isValidHttpUrl(value);
    }
  }
}
