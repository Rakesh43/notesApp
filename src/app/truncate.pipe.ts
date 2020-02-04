import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'truncate'
})
export class TruncatePipe implements PipeTransform {

  transform(value: any, ...args: any[]): any {
    if(value.length > 44) {
      return value.substring(0,45) + "...";
    } else {
      return value;
    }

  }

}
