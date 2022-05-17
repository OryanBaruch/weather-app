import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LocalStorageService } from '../../@services/localstorage.service';
import { WeatherService } from '../../@services/weather.service';
import { MainComponent } from '../main/main.component';


@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss']
})
export class FavoritesComponent extends MainComponent implements OnInit {


constructor(
  public cd: ChangeDetectorRef,
  public route: ActivatedRoute,
  public localStorageService: LocalStorageService,
  public _weather: WeatherService) {
    super( cd, route, localStorageService, _weather)
}

  ngOnInit(): void {
    // compare favorites array to saved locations in local
    this._weather.favoriteLocations=JSON.parse(localStorage.getItem('weather'))

  }

}
