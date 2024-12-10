'use client'
import React, {useEffect}from "react";
import { Provider } from "react-redux";
import { store } from "@/redux/store";
import { persistStore } from "redux-persist";

export default function ReduxProvider({ children }: {children: React.ReactNode}) {

  const persistor = persistStore(store);

  useEffect(() => {
    const handleBeforeUnload = () => {
      persistor.purge();
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
    
  }, [persistor]);

  return (
            <Provider store={store}>
                {children}
            </Provider>
        );
}