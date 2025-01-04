'use client'
import HomePage from "@/components/homePage/homepage";
import {useAppDispatch, useAppSelector} from "@/redux/store";
// import { setGlobalTrends, setTopSongs } from "@/redux/slices/songSlice";
// import { ChartData } from "@/interface/interfaces";
import {useEffect, useMemo} from "react"
import {BASE_URL} from "@/functions/func";
import {setGlobalTrends, setLocalTrends} from "@/redux/slices/songSlice";
import {setMessage} from "@/redux/slices/snackBarSlice";

export default function Home() {
  const dispatch = useAppDispatch()
  const initialSnackMessage = useAppSelector(state => state.snackBarSlice.initialMessage)
  useMemo(()=>{
    fetch(`${BASE_URL}/api/v1/songs/localTrends`)
        .then(result=>result.json())
        .then(localSongs=>dispatch(setLocalTrends(localSongs)))
        .catch(error=> {
          if(error instanceof Error) {
            dispatch(setMessage(error.message))
          }else{
            dispatch(setMessage("Something went wrong"))
          }
          console.log("error fetching localSongs")
        })
    fetch(`${BASE_URL}/api/v1/songs/localTrends`)
        .then(result=>result.json())
        .then(globalSongs=>dispatch(setGlobalTrends(globalSongs)))
        .catch(error=> {
          if(error instanceof Error) {
            dispatch(setMessage(error.message))
          }else{
            dispatch(setMessage("Something went wrong"))
          }
          console.log("error fetching globalSongs")
        })
  },[dispatch])
  useEffect(()=>{

      },
      [initialSnackMessage])
  return (    
    <HomePage/>
  );
}
