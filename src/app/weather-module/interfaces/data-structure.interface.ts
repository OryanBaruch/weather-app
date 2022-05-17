export interface Geolocation {
  enableHighAccuracy?: boolean;
  latitude?: number
  longitude?: number
}

export interface Weather {
  DateTime?: string
  EpochTime?: number
  HasPrecipitation?: boolean
  IconPhrase?: string
  IsDaylight?: boolean
  Link?: string
  MobileLink?: string
  PrecipitationProbability?: number
  WeatherIcon?: number
  WeatherText?: string
  Temperature?: Temperature
  isFavorite?: boolean

  MetricUnit?: any
  MetricValue?: any
  ImperialValue?: any
  ImperialUnit?: any
}

export interface Temperature {
  Unit?: string
  UnitType?: number
  Value?: number
  Metric?: Metric
  Imperial?: Imperial
}

export interface shortenCurrentLocationData {
  cityKey?: string;
  cityName?: string
}
//
export interface CurrentLocationData {
  AdministrativeArea?: AdministrativeArea
  Country?: Country
  DataSets?: any
  EnglishName?: string
  GeoPosition?: GeoPosition
  IsAlias?: boolean
  Key?: string
  key?: string
  LocalizedName?: string
  ParentCity?: ParentCity
  PrimaryPostalCode?: string
  Rank?: number
  Region?: Region
  SupplementalAdminAreas?: any[]
  TimeZone?: TimeZone
  Type?: string
  Version?: number
  cityKey?: string;
  cityName?: string
  countryName?: string
  weather?: Weather
}

export interface AdministrativeArea {
  CountryID?: string
  EnglishName?: string
  EnglishType?: string
  ID?: string
  Level?: number
  LocalizedName?: string
  LocalizedType?: string
}

export interface Country {
  EnglishName?: string
  ID?: string
  LocalizedName?: string
}

export interface GeoPosition {
  Elevation?: Elevation
  Latitude?: number
  Longitude?: number
}

export interface Elevation {
  Imperial?: Imperial
  Metric?: Metric
}

export interface Imperial {
  Unit?: string
  UnitType?: number
  Value?: number
}

export interface Metric {
  Unit?: string
  UnitType?: number
  Value?: number
}

export interface ParentCity {
  EnglishName?: string
  Key?: string
  LocalizedName?: string
}

export interface Region {
  EnglishName?: string
  ID?: string
  LocalizedName?: string
}

export interface TimeZone {
  Code?: string
  GmtOffset?: number
  IsDaylightSaving?: boolean
  Name?: string
  NextOffsetChange?: string

}
