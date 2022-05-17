import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild, ViewChildren } from '@angular/core';
import { ActivatedRoute, Event, ParamMap } from '@angular/router';
import { debounce, debounceTime, distinctUntilChanged, filter, fromEvent, map, mergeMap, Observable, of, switchMap, takeUntil, tap } from 'rxjs';
import { LocalStorageService } from '../../@services/localstorage.service';
import { WeatherService } from '../../@services/weather.service';
import { CurrentLocationData, Geolocation, Weather } from '../../interfaces/data-structure.interface';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainComponent implements OnInit {

  constructor(
    public cd: ChangeDetectorRef,
    public route: ActivatedRoute,
    public localStorageService: LocalStorageService,
    public _weather: WeatherService) {
  }
  public options: CurrentLocationData[]
  public lastSearchedCityName = JSON.parse(localStorage.getItem('Current City'));
  public generateIconBaseUrl: string = `https://developer.accuweather.com/sites/default/files`

  public generateIconUrl = (weatherIconNumber) => {
    if (weatherIconNumber < 10) {
      return `${this.generateIconBaseUrl}/0` + weatherIconNumber + "-s.png";
    } else {
      return `${this.generateIconBaseUrl}/` + weatherIconNumber + "-s.png";
    }
  };

  public geolocation: Geolocation
  public TLV_WEATHER_DATA = {
    long: 34.7818,
    lat: 32.0853,
    locationKey: '215793',
  }


  public fetchCityWithLocationPermit(resp) {
    this._weather.currentLocationData(
      resp.coords.latitude,
      resp.coords.longitude).pipe(
        mergeMap((res) => {
          this.searchCity(res.LocalizedName.toLowerCase())
          return this._weather.dailyForcastByHours(res.Key)
        })
      ).subscribe(res => {
        this._weather.hourBasedForecast$.next(res)
      })
    this.cd.markForCheck()
  }

  // Check if there's permission for location, if not, it send the req to TLV coords.
  public getPosition() {

    navigator.geolocation.getCurrentPosition(
      (res: GeolocationPosition) => {
        this.fetchCityWithLocationPermit(res)
      }, err => {
        this.searchCity('tel aviv')
      })
  }



  ngOnInit(): void {
    // Check for params in url, if so--> search accroding to parmas. (happens onClick of a favorite location)
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has("cityName")) {
        console.log(paramMap.get('cityName'));
        return this.searchCity(paramMap.get('cityName').toLowerCase())
      }
      this._weather.favoriteLocations = JSON.parse(localStorage.getItem('weather'))

      if (!this.lastSearchedCityName) {
        this.getPosition()
      } else {
        this.searchCity(this.lastSearchedCityName)
      }
    })
    this.cd.markForCheck()
  }

  public searchCity(city: string) {
    this._weather.searchCity(city).pipe(
      debounceTime(300),
      switchMap(res => {
        this.options = res;
        return this.getCityWeather(res)
      })
    )
      .subscribe(data => {
        if (!data) {
          return;
        }
        // fullWeatherValues gathers all indication to one data structure, current and location data + forecast
        const fullWeatherValues = this.fullWeatherValues(data)
        this._weather.weatherData.next(fullWeatherValues.weatherData)
        this._weather.locationData.next(fullWeatherValues.locationData)
        this._weather.hourBasedForecast$.next(fullWeatherValues.locationFutureForecast)

      })
    this.cd.markForCheck()
  }

  getCityWeather(cityInfo):
    Observable<[Weather, Weather[], { cityKey: string, cityName: string, countryName: string }]> {
    if (!cityInfo?.length) {
      return of(null)
    } else {
      this.options = cityInfo

      for (let i = 0; i < cityInfo.length; i++) {
        const city = cityInfo[i];
        return this._weather.getWeatherDataBySearch(
          city.Key,
          city.LocalizedName,
          city.Country.LocalizedName);
      }
    }
  }


  public fullWeatherValues(data) {
    for (let i = 0; i < data.length; i++) {
      this._weather.weatherDataObj = {
        WeatherText: data[i][0].WeatherText,
        MetricUnit: data[i][0].Temperature.Metric.Unit,
        MetricValue: data[i][0].Temperature.Metric.Value,
        ImperialValue: data[i][0].Temperature.Imperial.Value,
        ImperialUnit: data[i][0].Temperature.Imperial.Unit,
        WeatherIcon: data[i][0].WeatherIcon,
        isFavorite: null,
      }

      this._weather.locationDataObj = {
        cityName: data[2].cityName,
        countryName: data[2].countryName,
        key: data[2].cityKey,
      };

      const locationFutureForecast = data[1]
      localStorage.setItem('Current City', JSON.stringify(data[2].cityName.toLowerCase()));

      // Logic to determine is isFavoire is true or falsy value in weatherData
      if (!this._weather.favoriteLocations?.length) {
        this._weather.weatherDataObj.isFavorite = false
      } else if (this._weather.favoriteLocations.length) {
        this._weather.favoriteLocations.find(value => {
          return this._weather.weatherDataObj.isFavorite = value.location.key === data[2].cityKey
        })
      }

      const allWeatherData = {
        weatherData: this._weather.weatherDataObj,
        locationFutureForecast,
        locationData: this._weather.locationDataObj
      }
      return allWeatherData;
    }
  }


}

