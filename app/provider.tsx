'use client'
import React, {useEffect} from "react";
import { Provider } from "react-redux";
import { store } from "@/redux/store";
import { persist } from "@/redux/store";
import { PersistGate } from "redux-persist/integration/react";
import { CircularProgress } from "@mui/material";

export default function ReduxProvider({ children }: {children: React.ReactNode}) {
    useEffect(() => {
        const handleBeforeUnload = () => {
            persist.purge();
        };

        window.addEventListener("beforeunload", handleBeforeUnload);
        return () => {
            window.removeEventListener("beforeunload", handleBeforeUnload);
        };

    }, [persist]);

  const Loading = (
    <div className='flex flex-col w-[100vw] h-[100vh]  justify-center items-center'>
          <CircularProgress size={40} />
      <p className='text-[13px] md:text-[17px] py-[10px]' style={{fontFamily:'Dm sans'}}>Please wait...</p>
    </div>
  )


  return (
    <Provider store={store}>
      <PersistGate loading={Loading} persistor={persist}>
        {children}
      </PersistGate>
    </Provider>
);
}