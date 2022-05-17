import { Pipe, PipeTransform } from "@angular/core";
import { isDayTime } from "../utilities/utilities";

@Pipe({
  name: "fetch_icon"
})
export class FetchIconPipe implements PipeTransform {
  transform(value: any, ...args: any[]): any {
    if (isDayTime()) {
      return value.Day.Icon;
    } else {
      return value.Night.Icon;
    }
  }
}
