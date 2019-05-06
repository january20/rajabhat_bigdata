import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'striphtml'
})
export class StriphtmlPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    return value.replace(/<.*?>/g, '');
  }

}
