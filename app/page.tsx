'use client'
import {BASE_URL} from "@/functions/func";
import {setGlobalTrends, setLocalTrends} from "@/redux/slices/songSlice";
import {setError} from "@/redux/slices/snackBarSlice";
import {useAppDispatch} from "@/redux/store";
import {useEffect} from "react";
import HomePage from "@/components/homePage/homepage";

export default function Home() {
    const dispatch = useAppDispatch()

    useEffect(()=>{
        const fetchGlobalTrends = async () => {
            try {
                const response = await fetch(`${BASE_URL}/api/v1/songs/globalTrends`);
                const globalSongs = await response.json();
                dispatch(setGlobalTrends(globalSongs));
            } catch (error) {
                if (error instanceof Error) {
                    dispatch(setError(error.message));
                }
                else {
                    dispatch(setError("Pls check your internet connection."));
                }
            }
        }
        const naijaTop = async()=> {
            try {
                const response = await fetch(`${BASE_URL}/api/v1/songs/globalTrends`);
                const naijaSongs = await response.json();
                dispatch(setLocalTrends(naijaSongs));
            } catch (error) {
                if (error instanceof Error) {
                    dispatch(setError(error.message));
                }
                else {
                    dispatch(setError("Pls check your internet connection."));
                }
            }
        }
        naijaTop();
        fetchGlobalTrends();
    },[dispatch])

  return (
      <>
          <HomePage/>
      </>
  );
}
