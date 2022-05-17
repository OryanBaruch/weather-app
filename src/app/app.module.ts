import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainComponent } from './weather-module/components/main/main.component';
import { FavoritesComponent } from './weather-module/components/favorites/favorites.component';
import { CurrentWeatherComponent } from './weather-module/components/current-weather/current-weather.component';
import { HourlyWeatherForecastComponent } from './weather-module/components/hourly-weather-forecast/hourly-weather-forecast.component';
import { CitySearchComponent } from './weather-module/components/city-search/city-search.component';
import { convertDateToHours } from './weather-module/pipes/hours-format.pipe';
import { FetchIconPipe } from './weather-module/pipes/day-time-icon.pipe';
import { ErrorInterceptor } from './interceptors/error.interceptor';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatRippleModule} from '@angular/material/core';
import { MatAutocompleteModule } from "@angular/material/autocomplete";
import { UniquePipe } from './weather-module/pipes/unique.pipe';
import {MatCardModule} from '@angular/material/card';
import {MatDividerModule} from '@angular/material/divider';
import {MatToolbarModule} from '@angular/material/toolbar';
import { NavbarComponent } from './weather-module/components/navbar/navbar.component';

const MODULES = [
  HttpClientModule,
  ReactiveFormsModule,
  FormsModule
]

const MATERIAL_MODULES =[
  MatButtonModule,
  MatFormFieldModule,
  MatInputModule,
  MatRippleModule,
  MatAutocompleteModule,
  MatCardModule,
  MatDividerModule,
  MatToolbarModule,
]

const PIPES=[
  FetchIconPipe,
  convertDateToHours,
  UniquePipe,
]
@NgModule({
  declarations: [
    ...PIPES,
    AppComponent,
    MainComponent,
    FavoritesComponent,
    CurrentWeatherComponent,
    HourlyWeatherForecastComponent,
    CitySearchComponent,
    NavbarComponent,
  ],
  imports: [
    ...MODULES,
    ...MATERIAL_MODULES,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule
  ],
  exports:[
    ...MATERIAL_MODULES
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
