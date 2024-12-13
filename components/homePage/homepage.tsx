'use client'
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import PersonIcon from '@mui/icons-material/Person';
import {useState, useEffect} from "react";
import {CircularProgress} from "@mui/material"
import Image from 'next/image';
import SearchIcon from '@mui/icons-material/Search';
import {ChartData} from '@/interface/interfaces'
import {useAppDispatch, useAppSelector} from "@/redux/store";
import {setTopSongs, setGlobalTrends} from "@/redux/songSlice";
import styles from '@/styles/home.module.css';

export default function HomePage() {
    
    const [mostPlayedSongs, setMostPlayedSongs] = useState<ChartData[]>([])
    const [isLoading, setLoading] = useState<boolean>(false);
    const [searchInput,setSearchInput] = useState<string>('')
    const isOnline = navigator.onLine;
    const dispatch = useAppDispatch();
    const [globalTrends, setGlobalTrendsData] = useState<ChartData[]>([])
    const topSongsPersisted = useAppSelector(state => state.songs.topSongs)
    const globalSongsPersisted = useAppSelector(state => state.songs.globalTrends);

    const getGlobalTrends = async () => { 
        const url = 'https://spotify81.p.rapidapi.com/top_200_tracks?country=GLOBAL';
        const options = {
            method: 'GET',
            headers: {
                'x-rapidapi-key': 'febfd66cf9msh276ca2c333c55b2p17a072jsnb411682e032e',
                'x-rapidapi-host': 'spotify81.p.rapidapi.com'
            }
        };

        try {
            if (navigator.onLine) {
                if (!globalSongsPersisted || globalSongsPersisted.length === 0) {
                    const response = await fetch(url, options);
                    const result = await response.json();
                    setGlobalTrendsData(result)
                    dispatch(setGlobalTrends(globalTrends))
                    console.log("fetch Data 1")
                }
            } else {
                setMostPlayedSongs(topSongsPersisted)
            }
        } catch (error) {
            console.error(error);
        }
    }
    const getMostPlayedTracks = async () => {
            const url = 'https://spotify81.p.rapidapi.com/top_200_tracks?country=NG';
            const options = {
                method: 'GET',
                headers: {
                    'x-rapidapi-key': 'febfd66cf9msh276ca2c333c55b2p17a072jsnb411682e032e',
                    'x-rapidapi-host': 'spotify81.p.rapidapi.com'
                }
            };
            try {
                setLoading(true)
                if (navigator.onLine) {
                    if (!topSongsPersisted || topSongsPersisted.length === 0) {
                        const response = await fetch(url, options);
                        const result = await response.json();
                        setMostPlayedSongs(result);
                        dispatch(setTopSongs(result));
                        console.log("fetch Data 2")
                    }
                } else { 
                    setMostPlayedSongs(topSongsPersisted)
                }
            } catch (error) {
                console.error("Cause of Error: ",error);
                if(error instanceof Error) {
                }
            }finally{
                setLoading(false);
            }
    }
    useEffect(() => {
        getGlobalTrends();
        getMostPlayedTracks()
    },[])
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

    function GlobalTrendsComponent(args: { globalTrends: ChartData[] }) {
        return (
            <div className={''}>
                <div className={styles.headers}>
                    <p>Global Trends</p>
                    <p className={styles.hoverText}>see all</p>
                </div>
                <section className={`flex justify-around items-center w-full`}>
                    {args.globalTrends ?
                        <>
                            {!isLoading ?
                                <>
                                    {
                                        args.globalTrends.slice(0, 5).map((data, index) => (
                                            <section key={index} className={`${styles.mappedImag}`}>
                                                <div>
                                                    <Image src={data.trackMetadata.displayImageUri} width={120} height={120} className={' object-center object-cover'} alt='' />
                                                </div>
                                                <p>{data.trackMetadata.artists[0].name}</p>
                                                <p>{data.trackMetadata.trackName}</p>
                                            </section>
                                        ))
                                    }

                                </>
                                :
                                <div className={'h-[150px] w-full flex justify-center items-center bg-gray-800'}>
                                    <div>
                                        <CircularProgress size={40} />
                                    </div>
                                </div>
                            }
                        </>
                        :
                        <div className={'h-[150px] flex items-center justify-center w-full'}>
                            <p>Sorry, No Data Available </p>
                        </div>
                    }
                </section>
            </div>
        )
    }

    function RightBar(args: { data: ChartData[] }) {
        return (
          <div className={styles.rightBar}>
              <div className={'w-full flex md:justify-end md:pr-[7px] md:pb-[7px]'}>
                  <form className={styles.inputBar}>
                      <input type="text" placeholder={"Search artist"} onChange={(e)=>setSearchInput(e.target.value)}
                             value={searchInput} className={`w-[90%] px-[10px] h-[50px] focus:outline-none outline-none text-black`}/>
                      <div className={'w-[10%]'}>
                          <SearchIcon className={"w-[100%] h-[50px] hover:cursor-pointer hover:bg-gray-300 hover:text-gray-900"}/>
                      </div>
                  </form>
              </div>
              <div className={''}>
                  <div className={styles.headers}>
                      <p>Trending Songs</p>
                      <p>see all</p>
                  </div>
                  <section className={`flex justify-around items-center w-full md:py-[10px]`}>
                      {isOnline ?
                          <>
                                {!isLoading ?
                                    <>
                                        {
                                            args.data.slice(0, 5).map((data, index) => (
                                                <section key={index} className={`${styles.mappedImag}`}>
                                                    <div>
                                                        <Image src={data.trackMetadata.displayImageUri} width={120} height={120} className={' object-center object-cover'} alt='' />
                                                    </div>
                                                    <p>{data.trackMetadata.artists[0].name}</p>
                                                    <p className={styles.trackName}>{data.trackMetadata.trackName}</p>
                                                </section>
                                            ))
                                        }
                                    
                                    </>
                                  :
                                    <div className={'h-[150px] w-full flex justify-center items-center bg-gray-800'}>
                                        <div>
                                            <CircularProgress size={40}/>
                                        </div>
                                    </div>
                                }
                            </>
                            :
                            <div className={'h-[150px] flex items-center justify-center w-full'}>
                                <p>Sorry, No Data Available </p>
                            </div>
                        }
                    </section>
                </div>
                <GlobalTrendsComponent globalTrends={globalTrends}/>
          </div>
        );
    }

    function LeftBar(){
        return (
            <div className={styles.leftBar}>
                <p>Browse</p>
                <p>Discover</p>
                <p>My Library</p>
                <p>Notifications</p>
            </div>
        )

    }

    return (
        <>
           <Navbar/>
            <div className={styles.homePage}>
                <LeftBar/>
                <RightBar data={mostPlayedSongs}/>
            </div>
        </>
    )
}
