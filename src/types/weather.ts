export type TForecastResponse = {
  location: TLocation;
  current: TCurrentWeather;
  forecast: {
    forecastday: TForecast[];
  };
};

export type TLocation = {
  name: string;
  region: string;
  country: string;
  lat: number;
  lon: number;
  tz_id: string;
};

export type TCurrentWeather = {
  condition: TWeatherCondition;

  temp_c: number;
  temp_f: number;
  is_day: 1 | 0;
  wind_kph: number;
  wind_dir: string;
  pressure_mb: number;
  pressure_in: number;
  precip_mm: number;
  precip_in: number;
  humidity: number;
  cloud: number;
  feelslike_c: number;
  feelslike_f: number;
  vis_km: number;
  vis_miles: number;
  uv: number;
  gust_mph: number;
  gust_kph: number;
};

export type TWeatherCondition = {
  text: string;
  icon: string; // example - //cdn.weatherapi.com/weather/64x64/night/122.png
  code: number;
};

export type TForecast = {
  date: string;
  date_epoch: number;
  day: TDayWeather;
  astro: TAstro;
  hour: TCurrentWeather[];
};

export type TDayWeather = {
  maxtemp_c: number;
  maxtemp_f: number;
  mintemp_c: number;
  mintemp_f: number;
  avgtemp_c: number;
  avgtemp_f: number;
  maxwind_mph: number;
  maxwind_kph: number;
  totalprecip_mm: number;
  totalprecip_in: number;
  totalsnow_cm: number;
  avgvis_km: number;
  avgvis_miles: number;
  avghumidity: number;
  daily_will_it_rain: number;
  daily_chance_of_rain: number;
  daily_will_it_snow: number;
  daily_chance_of_snow: number;
  condition: TWeatherCondition;
  uv: number;
};

export type TAstro = {
  sunrise: string; // '07:51 AM';
  sunset: string; //  '04:34 PM';
  moonrise: string; //  '02:47 PM';
  moonset: string; //  '07:48 AM';
  moon_phase: string; //  'Waxing Gibbous';
  moon_illumination: number;
  is_moon_up: number;
  is_sun_up: number;
};
