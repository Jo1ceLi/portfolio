import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'porS'
})
export class PorSPipe implements PipeTransform {

  transform(value: boolean): string {
    return value ? 'Buy' : 'Sell';
  }

}
