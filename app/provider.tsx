'use client'
import React from "react";
import { Provider } from "react-redux";
import { store } from "@/redux/store";
import { persistor } from "@/redux/store";
import { PersistGate } from "redux-persist/integration/react";
import { CircularProgress } from "@mui/material";

export default function ReduxProvider({ children }: {children: React.ReactNode}) {
  const Loading = (
    <div className='flex flex-col w-[100vw] h-[100vh]  justify-center items-center'>
          <CircularProgress size={40} />
      <p className='text-[13px] md:text-[17px] py-[10px]' style={{fontFamily:'Dm sans'}}>Please wait...</p>
    </div>
  )

  return (
    <Provider store={store}>
      <PersistGate loading={Loading} persistor={persistor}>
        {children}
      </PersistGate>
    </Provider>
);
}