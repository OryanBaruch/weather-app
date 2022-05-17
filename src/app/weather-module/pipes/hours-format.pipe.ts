import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'extractTimeFromDate' })
export class convertDateToHours implements PipeTransform {
  transform(date: string) {
    let convertedValue=date.substring(11, 16)
    const checkHourSlicedValue=+convertedValue.substring(0,2)

    if (checkHourSlicedValue > 12 || checkHourSlicedValue> 24) {
      convertedValue+=' PM ';
    }else {
      convertedValue+=' AM ';
    }
    return convertedValue;
  }
}

