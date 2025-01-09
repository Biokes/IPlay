import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import songSlice from '@/redux/slices/songSlice';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import userSlice from "@/redux/slices/userSlice";
import snackBarSlice from "@/redux/slices/snackBarSlice";
import appSlice from "@/redux/slices/AppSlice";

const persistConfig = {
  key: 'song_root',
  storage,
  whitelist: ['Songs','app'],
};

const rootReducer = combineReducers({
  Songs: songSlice, user: userSlice,snack: snackBarSlice,app:appSlice
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
export const persist = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
