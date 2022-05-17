import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, Input, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import {  debounceTime, distinctUntilChanged,  fromEvent, Observable,  Subject, switchMap, takeUntil } from 'rxjs';
import { LocalStorageService } from '../../@services/localstorage.service';
import { WeatherService } from '../../@services/weather.service';
import { CurrentLocationData,  } from '../../interfaces/data-structure.interface';
import { MainComponent } from '../main/main.component';

@Component({
  selector: 'app-city-search',
  templateUrl: './city-search.component.html',
  styleUrls: ['./city-search.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CitySearchComponent extends MainComponent implements OnInit, OnDestroy {

  @ViewChild('city', { static: true }) city: ElementRef;
  @ViewChild('submit', { static: true }) submit: ElementRef;
  @ViewChild('option', { static: true }) option: ElementRef;
  @Output() keyupEvent: Subject<string> = new Subject<string>();
  @Input() options: CurrentLocationData[]
  public filteredOptions: Observable<CurrentLocationData[]>;
  public onDestroy$: Subject<boolean> = new Subject<boolean>();
  public selectedOption: CurrentLocationData

  constructor(
    public cd: ChangeDetectorRef,
    public route: ActivatedRoute,
    public localStorageService: LocalStorageService,
    public _weather: WeatherService,
    public fb: FormBuilder
  ) {
    super(cd, route, localStorageService, _weather)

  }

  ngOnDestroy(): void {
    this.onDestroy$.next(true);
    this.onDestroy$.unsubscribe();
  }

  searchForm = this.fb.group({
    city: new FormControl('', [Validators.pattern(/^[A-Za-z ]+$/)])
  })

  onSelectionChanged(event) {
    this.selectedOption = event
  }

  ngOnInit(): void {

    // Update options list accoridng to keyup event resuluts
    fromEvent(this.city.nativeElement, 'keyup').pipe(
      debounceTime(300),
      takeUntil(this.onDestroy$),
      switchMap((event: Event) => {
        const value = (<HTMLInputElement>event.target).value;
        return this._weather.searchCity(value).pipe(
          switchMap((res) => {
            return this.options = res;
          })
        )
      }),
      distinctUntilChanged(),
    ).subscribe()

  }

}
