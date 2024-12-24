'use client'
import HomePage from "@/components/homePage/homepage";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { setGlobalTrends, setTopSongs } from "@/redux/slices/songSlice";
import { ChartData } from "@/interface/interfaces";
import {useEffect , useState} from "react"

export default function Home() {
  const dispatch = useAppDispatch()
  const persistedGlobalTrends = useAppSelector((state)=>state.Songs.globalTrends)
  const [globalTrend, setGlobalTrendData] = useState<ChartData[]>([])
  const [mostPlayed, setMostPlayedTracks] = useState<ChartData[]>([])
  const [loading, setLoading] = useState<boolean>(false)

  const getGlobalTrends = async () => {
    const url = 'https://spotify81.p.rapidapi.com/top_200_tracks?country=GLOBAL';
    const options = {
        method: 'GET',
        headers: {
            'x-rapidapi-key': '568118d0ecmsh434c99fc5aed6a5p113d8ajsn9f1059a2d88d',
            'x-rapidapi-host': 'spotify81.p.rapidapi.com'
        }
    };

    try {
      if (navigator.onLine) {
        if (persistedGlobalTrends.length === 0) {
            setLoading(true)
            const response = await fetch(url, options);
            const result = await response.json();
            setGlobalTrendData(result)
            dispatch(setGlobalTrends(globalTrend))
        }
      }
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message)
      }
    } finally {
      setLoading(!loading)
    }
  }

const getMostPlayedTracks = async () => {
    const url = 'https://spotify81.p.rapidapi.com/top_200_tracks?country=NG';
    const options = {
        method: 'GET',
        headers: {
            'x-rapidapi-key': '568118d0ecmsh434c99fc5aed6a5p113d8ajsn9f1059a2d88d',
            'x-rapidapi-host': 'spotify81.p.rapidapi.com'
        }
    };
    try {
        setLoading(true)
        if (navigator.onLine) {
            if (mostPlayed.length === 0) {
                const response = await fetch(url, options);
                const result = await response.json();
                setMostPlayedTracks(result)
                dispatch(setTopSongs(result));
                console.log("Top Songs persisted = ", result)
            }
        }
    } catch (error) {
      if (error instanceof Error) {
          console.log(error.message)
        }
    } finally {
        setLoading(false);
    }
}
    useEffect(() => {
        getGlobalTrends();
        getMostPlayedTracks();
  },[])
  return (    
    <HomePage loading={loading}/>
  );
}
