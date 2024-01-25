import {createAsyncThunk} from '@reduxjs/toolkit';
import {forecastService} from '../../services/forecast.service';
import {TForecastResponse} from '../../types/weather';

export const fetchForecast = createAsyncThunk<
  TForecastResponse | undefined,
  {
    period: number;
    coords: {
      lat: number;
      lon: number;
    };
  }
>('people/fetch', async ({period, coords}) => {
  const forecast = await forecastService.getForecast(period, coords);
  return forecast;
});
