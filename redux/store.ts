// import { combineReducers, configureStore } from '@reduxjs/toolkit';
// import { persistReducer } from 'redux-persist';
// import storage from 'redux-persist/lib/storage';
// import songSlice from '@/redux/songSlice';
// import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
// import persistStore from 'redux-persist/es/persistStore';

// const persistConfig = {
//     key: 'song_root',
//     storage,
//     whitelist: ['songs'],
// };
// const persistedReducer = persistReducer(persistConfig, combineReducers({"Songs": songSlice}));

// export const store = configureStore({reducer:  persistedReducer});
// export const persistor = persistStore(store)
// export type AppDispatch = typeof store.dispatch;
// export type RootState = ReturnType<typeof store.getState>;
// export const useAppDispatch = ()=> useDispatch<AppDispatch>();
// export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
// store.subscribe(() => console.log("State stored: ",store.getState()));
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import songSlice from '@/redux/songSlice';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

const persistConfig = {
  key: 'song_root',
  storage,
  whitelist: ['Songs'],
};

const rootReducer = combineReducers({
  Songs: songSlice,
});
const persistedReducer = persistReducer(persistConfig, rootReducer);
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST', 'persist/REGISTER'],
      },
    }),
});
export const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
