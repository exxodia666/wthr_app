import {
  combineReducers,
  configureStore,
  getDefaultMiddleware,
} from '@reduxjs/toolkit';
import {persistStore, persistReducer} from 'redux-persist';
import {forecastReducer} from './slices';
//   import AsyncStorage from '@react-native-async-storage/async-storage';

// const persistConfig = {
//   key: 'root',
//   storage: AsyncStorage,
//   whitelist: ['favorites'],
// };

// const customizedMiddleware = getDefaultMiddleware({
//   serializableCheck: false,
// });

// export const store = configureStore({
//   reducer: persistReducer(
//     persistConfig,
//     combineReducers({
//       people: peopleReducer,
//       favorites: favoritesReducer,
//     }),
//   ),
// //   middleware: customizedMiddleware,
// });

// export const persistor = persistStore(store);

// import rootReducer from './reducers'

const store = configureStore({
  reducer: {
    forecast: forecastReducer,
  },
});

export default store;
