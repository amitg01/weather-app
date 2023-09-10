import { CurrentWeatherDetailsModel, EmptyWeather, WeatherModel } from '.'

export interface CurrentWeatherModel {
  dt: number
  timezone_offset: number
  weather: WeatherModel
  temp: number
  feels_like: number
  details?: CurrentWeatherDetailsModel
}

export const EmptyCurrentWeather: CurrentWeatherModel = {
  dt: 0,
  weather: EmptyWeather,
  timezone_offset: 0,
  temp: 0,
  feels_like: 0,
  details: undefined,
}
