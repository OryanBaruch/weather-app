import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of, forkJoin, Subject, BehaviorSubject } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';
import { CurrentLocationData, Weather } from '../interfaces/data-structure.interface';
import { environment  } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  public weatherData: BehaviorSubject<Weather> = new BehaviorSubject<Weather>(null);
  public hourBasedForecast$: Subject<Weather[]> = new Subject<Weather[]>();
  public locationData: BehaviorSubject<CurrentLocationData> = new BehaviorSubject<CurrentLocationData>(null);
  public favoriteLocations = [];
  public key:string='xjIcAJXAKAsGFmITmbkaa9HrA4aVoTjN'

  public weatherDataObj: Weather = {}
  public locationDataObj: CurrentLocationData = {}

  constructor(public http: HttpClient) { }

  public currentLocationData(lat: number, long: number): Observable<CurrentLocationData> {
    return this.http.get<CurrentLocationData>(`https://dataservice.accuweather.com/locations/v1/cities/geoposition/search?apikey=${this.key}&q=${lat}%2C${long}`)
  }
  public currentWeather(locationKey: string): Observable<Weather> {
    return this.http.get<Weather>(`https://dataservice.accuweather.com/currentconditions/v1/${locationKey}?apikey=${this.key}`)
  }

  public dailyForcastByHours(locationKey: string): Observable<Weather[]> {
    return this.http.get<Weather[]>(`https://dataservice.accuweather.com/forecasts/v1/hourly/12hour/${locationKey}?apikey=${this.key}`)
  }

  public searchCity(searchText: string): Observable<CurrentLocationData[]> {
    return this.http.get<CurrentLocationData[]>(`https://dataservice.accuweather.com/locations/v1/cities/autocomplete?apikey=${this.key}&q=${searchText}`)
  }

  public getWeatherDataBySearch(cityKey: string, cityName: string, countryName: string):
    Observable<[Weather, Weather[], { cityKey: string, cityName: string, countryName: string }]> {
    return forkJoin([
      this.currentWeather(cityKey),
      this.dailyForcastByHours(cityKey),
      of({ cityKey, cityName, countryName })]
    );
  }

}
