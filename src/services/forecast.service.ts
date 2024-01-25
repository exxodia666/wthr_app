import Axios from 'axios';
import {ENDPOINTS} from '../config/ENDPOINTS';
import {axiosService} from './axios.service';
import {TForecastResponse} from '../types/weather';

class ForecastService {
  async getForecast(period: number, coords: {lat: number; lon: number}) {
    try {
      const res = await axiosService.get<TForecastResponse>(
        ENDPOINTS.forecast,
        {
          params: {
            q: `${coords.lat},${coords.lon}`,
            days: period,
            aqi: 'no',
            alerts: 'no',
          },
        },
      );
      return res.data;
    } catch (e) {
      console.log(e);
    }
  }
}

export const forecastService = new ForecastService();
