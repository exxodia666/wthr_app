import {createSlice} from '@reduxjs/toolkit';
import {fetchForecast} from '../../thunk/forecast';
import {initialState} from './initialState';

const slice = createSlice({
  name: 'people',
  initialState: initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchForecast.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(fetchForecast.fulfilled, (state, action) => {
      state.current = action.payload?.current;
      state.forecast = action.payload?.forecast.forecastday ?? [];
      state.location = action.payload?.location;

      state.error = undefined;
      state.isLoading = false;
    });
    builder.addCase(fetchForecast.rejected, (state, action) => {
      state.error = action.error.message;
      state.isLoading = true;
    });
  },
});

export const forecastReducer = slice.reducer;
