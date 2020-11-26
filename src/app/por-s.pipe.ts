import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'porS'
})
export class PorSPipe implements PipeTransform {

  transform(value: number): string {
    return value > 0 ? 'Buy' : 'Sell';
  }

}
