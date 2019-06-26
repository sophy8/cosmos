import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'availablePlanetTo'
})
export class AvailablePlanetToPipe implements PipeTransform {

  transform(value: any, args?: any, availableFrom?: any): any {
    const array = [];
    if (args) {
      args.forEach((el) => {
        value.forEach(element => {
          if (availableFrom) {
            if (el.to === element.name && el.from === availableFrom.name) {
              array.push(element);
              return array;
            }
          }
        });
      });

    }
    value = array;
    return value;
  }

}
