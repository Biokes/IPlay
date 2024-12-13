'use client'
import React from "react";
import { Provider } from "react-redux";
import { store } from "@/redux/store";
import { persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";
import { CircularProgress } from "@mui/material";

export default function ReduxProvider({ children }: {children: React.ReactNode}) {
  const persistor = persistStore(store);
  const Loading = (
    <div className='flex w-full h-full  justify-center items-center'>
        <div>
          <CircularProgress size={40} />
        </div>
=    </div>
  )

  return (
    <Provider store={store}>
      <PersistGate loading={Loading} persistor={persistor}>
        {children}
      </PersistGate>
    </Provider>
);
}