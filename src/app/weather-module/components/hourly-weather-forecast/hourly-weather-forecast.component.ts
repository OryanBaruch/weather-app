import { Component , Input, OnInit } from '@angular/core';
import { WeatherService } from '../../@services/weather.service';

@Component({
  selector: 'app-hourly-weather-forecast',
  templateUrl: './hourly-weather-forecast.component.html',
  styleUrls: ['./hourly-weather-forecast.component.scss']
})
export class HourlyWeatherForecastComponent implements OnInit {

  @Input() public generateIconUrl:string;
  constructor( public _weather: WeatherService) { }

  ngOnInit(): void {

  }

}
