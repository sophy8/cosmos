import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'availablePlanet'
})
export class AvailablePlanetPipe implements PipeTransform {

  transform(value: any, args?: any[]): any {
    const array = [];
    if (args) {
      args.forEach((el) => {
        value.forEach(element => {
          if (el.from === element.name) {
            array.push(element);
            return array;
          }
        });
      });

    }
    value = array;
    return value;
  }

}
