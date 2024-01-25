import {TForecastState} from './types';

export const initialState: TForecastState = {
  location: undefined,
  current: undefined,
  forecast: [],

  isLoading: false,
  error: undefined,
};
