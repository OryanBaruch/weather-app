import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { Observable, take, takeUntil } from 'rxjs';
import { LocalStorageService } from '../../@services/localstorage.service';
import { OnDestoryService } from '../../@services/on-destory.service';
import { WeatherService } from '../../@services/weather.service';
import { CurrentLocationData, Weather } from '../../interfaces/data-structure.interface';

@Component({
  selector: 'app-current-weather',
  templateUrl: './current-weather.component.html',
  styleUrls: ['./current-weather.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CurrentWeatherComponent extends OnDestoryService implements OnInit {
  ngOnDestroy(): void {
  }

  @Input() public currentWeatherData: Observable<CurrentLocationData>;
  @Input() public data;
  @Input() public generateIconUrl: string;
  public localStorageData = JSON.parse(localStorage.getItem('weather'))

  constructor(
    public cd: ChangeDetectorRef,
    public localStorageService: LocalStorageService,
    public _weather: WeatherService) {
    super()
  }

  saveLocation() {
    this._weather.weatherDataObj.isFavorite = true
    this._weather.favoriteLocations?.push({ weather: this._weather.weatherDataObj, location: this._weather.locationDataObj })

    this.localStorageService.setLocalStorageWeather(this._weather.favoriteLocations)
    this.localStorageService.setLocalCurrentCity(this._weather.locationDataObj.cityName.toLowerCase())
  }

  unsaveLocation(key) {
    this._weather.weatherDataObj.isFavorite = false
    this._weather.favoriteLocations = this._weather.favoriteLocations.filter(val => {
      return val.location.key !== key
    })
    this.localStorageService.setLocalStorageWeather(this._weather.favoriteLocations)
  }

  public toggleLocationToFavorites(location: Observable<CurrentLocationData>, foreCast: Observable<Weather>) {
    // compareing location and weather objects to the results of parameters subscription.
    location.pipe(
      take(1),
      takeUntil(this.onDestroy))
      .subscribe((location: CurrentLocationData) => {
        this._weather.locationDataObj = location
      })

    foreCast.pipe(take(1),
      takeUntil(this.onDestroy))
      .subscribe((weather: Weather) => {
        this._weather.weatherDataObj = weather
      })

    if (!!this._weather.weatherDataObj && this._weather.weatherDataObj.isFavorite) {
      this.cd.markForCheck()
      return this.unsaveLocation(this._weather.locationDataObj.key)
    } else {
      this.cd.markForCheck()
      return this.saveLocation()
    }

  }

  ngOnInit(): void {

    if (!this.localStorageData) {
      this.localStorageService.setLocalStorageWeather([])
    }
    this._weather.favoriteLocations =
      !!this.localStorageData ?
        this.localStorageData :
        [];
  }


}
