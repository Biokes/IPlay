'use client'
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import PersonIcon from '@mui/icons-material/Person';
import {useEffect, useState} from "react";
import {CircularProgress} from "@mui/material"
import {TrackData} from '@/interface/interfaces'

export default function HomePage(){
    const [mostPlayedSongs, setMostPlayedSongs] = useState<TrackData[]>([])
    const [isLoading, setLoading] = useState<boolean>(false);
    const HandleSearch=()=>{
    }

    const getMostPlayedTracks= async (): Promise<TrackData[]> =>{
        const options = {
            method: 'GET',
            headers: {
                'x-rapidapi-key': 'febfd66cf9msh276ca2c333c55b2p17a072jsnb411682e032e',
                'x-rapidapi-host': 'spotify-most-listened-songs.p.rapidapi.com'
            }
        };
        try {
            if(navigator.onLine){
                const response = await fetch('https://spotify-most-listened-songs.p.rapidapi.com/mnlwmM/100_most_spotify_listened_songs_of_2024', options);
                const data = await response.json();
                const trackData : TrackData[]= data.map((item: { [x: string]: string; id: string; streams: string; track_name: string;
                    released_day: string; released_year: string; released_month: string; in_spotify_charts: string; in_spotify_playlists: string; }) => ({
                    id: item.id,
                    streams: item.streams || "",
                    track_name: item.track_name || "",
                    released_day: item.released_day || "",
                    released_year: item.released_year || "",
                    "artist(s)_name": item["artist(s)_name"] || "",
                    released_month: item.released_month || "",
                    in_spotify_charts: item.in_spotify_charts || "",
                    in_spotify_playlists: item.in_spotify_playlists || ""
                }));
                console.log(mostPlayedSongs)
                return trackData
            }
           else{
               console.log('You are offline')
               return []
            }
        }catch(error){
            console.log(error)
            return []
        }
        
    }

    useEffect(()=> {
        setLoading(true)
        const fetchTracks = async () => {
            const tracks :TrackData[] = await getMostPlayedTracks();
            setMostPlayedSongs(tracks);
        };
            fetchTracks()
        setLoading(!isLoading)
        }, [mostPlayedSongs])
    
    const Navbar=()=>{
        return (
            <div className={'flex items-center justify-between bg-blue-500 p-[5px_10%] rounded-md'}>
                <div className={'flex'}>
                    <div>
                        <PlayCircleOutlineIcon/>
                    </div>
                    <p className={'text-[20px]'}>IPlay</p>
                </div>
                <div className={'bg-white rounded-2xl flex items-center px-[10px] hover:cursor-pointer'}>
                    <div className={'p-[5px]'}>
                        <PersonIcon className={'text-black'}/>
                    </div>
                    <p className={'text-blue-500'}>{'no data'}</p>
                </div>
            </div>
        )
    }

    const RightBar = ()=>{
        return (
          <div>
              <div>
                  <input type="text" onClick={HandleSearch}/>
              </div>
              <div>
                  <div>
                      <p>most listened tracks</p>
                          {
                              isLoading ?
                                  <div className={'w-[100%] h-[300px] items-center flex justify-center'}>
                                      <CircularProgress size={40}/>
                                  </div>
                              :
                                  <div>
                                      {mostPlayedSongs.length===0 ?
                                          <p>No Data available</p>
                                      :
                                          mostPlayedSongs.map((songData, index)=>(
                                              <div key={index} className={'flex flex-col gap-[5px] py-[5px] border-[1px] border-white rounded-md w-[200px]'}>
                                                  <p>{songData["artist(s)_name"]}</p>
                                                  <p>{songData.track_name}</p>
                                              </div>
                                          ))
                                      }
                                  </div>
                          }
                  </div>
                  <div>
                      <p>favourites</p>
                      <section>

                      </section>
                  </div>
              </div>
          </div>
        );
    }
    return (
        <>
           <Navbar/>
            <RightBar/>
        </>
    )
}