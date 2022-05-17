import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() { }

  public parsedLocalStorageWeather = JSON.parse(localStorage.getItem('weather'))
  public parsedLocalStorageLocation = JSON.parse(localStorage.getItem('Current City'))

  public setLocalStorageWeather(data) {
    return localStorage.setItem('weather', JSON.stringify(data))
  }

  public setLocalCurrentCity(data) {
    return localStorage.setItem('Current City', JSON.stringify(data))
  }

}
