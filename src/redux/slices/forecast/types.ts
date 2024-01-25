import {TCurrentWeather, TForecast, TLocation} from '../../../types/weather';

export interface TForecastState {
  location: TLocation | undefined;
  current: TCurrentWeather | undefined;
  forecast: TForecast[];

  isLoading: boolean;
  error: string | undefined;
}
