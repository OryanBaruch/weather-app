import { Pipe, PipeTransform } from "@angular/core";
import { isDayTime } from "../utilities/utilities";

@Pipe({
  name: "fetch_icon_phrase"
})
export class FetchIconPhrasePipe implements PipeTransform {
  transform(value: any, ...args: any[]): any {
    if (isDayTime()) {
      return value.Day.IconPhrase;
    } else {
      return value.Night.IconPhrase;
    }
  }
}
