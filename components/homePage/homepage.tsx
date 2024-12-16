'use client'
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import PersonIcon from '@mui/icons-material/Person';
import React, {useState, useMemo} from "react";
import {CircularProgress} from "@mui/material"
import Image from 'next/image';
import {ChartData} from '@/interface/interfaces'
import { useAppDispatch, useAppSelector} from "@/redux/store";
import {setTopSongs, setGlobalTrends} from "@/redux/songSlice";
import styles from '@/styles/home.module.css';
import {Mapper} from '@/interface/interfaces'

export default function HomePage() {
    
    const [mostPlayedSongs, setMostPlayedSongs] = useState<ChartData[]>([])
    const [isLoading, setLoading] = useState<boolean>(false);
    const isOnline = navigator.onLine;
    const dispatch = useAppDispatch();
    const [globalTrends, setGlobalTrendsData] = useState<ChartData[]>([])
    const topSongsPersisted = useAppSelector(state => state.Songs.topSongs)
    const globalSongsPersisted = useAppSelector(state => state.Songs.globalTrends);
    const [rightComponent, setRightComponent] = useState<React.ReactNode>(<></>)
    const [suggestionData, setSuggestionData] = useState<ChartData[]>([])
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
                'x-rapidapi-key': '568118d0ecmsh434c99fc5aed6a5p113d8ajsn9f1059a2d88d',
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
            console.error("Cause of Error: ", error);
            if (error instanceof Error) {
            }
        } finally {
            setLoading(false);
        }
    }
    const suggestion = async () => {
        setSuggestionData([])
    }

    const Navbar = () => {
        return (
            <div className={'flex items-center justify-between bg-blue-500 p-[5px_10%] rounded-md'}>
                <div className={'flex'}>
                    <div>
                        <PlayCircleOutlineIcon />
                    </div>
                    <p className={'text-[20px]'}>IPlay</p>
                </div>
                <div className={'bg-white rounded-2xl flex items-center px-[10px] hover:cursor-pointer'}>
                    <div className={'p-[5px]'}>
                        <PersonIcon className={'text-black'} />
                    </div>
                    <p className={'text-blue-500'}>{'no data'}</p>
                </div>
            </div>
        )
    }

    function TrendsComponent(args: { data: ChartData[], leftText: string }) {
        return (
            <div className={''}>
                <div className={styles.headers}>
                    <p>{args.leftText}</p>
                    <p>see all</p>
                </div>
                <section className={`flex justify-around items-center w-full md:px-[10px]`}>
                    {isOnline ?
                        <>
                            {!isLoading ?
                                <>
                                    {args?
                                        args.data.slice(0, 5).map((data, index) => (
                                            <section key={index} className={`${styles.mappedImag}`}>
                                                <div>
                                                    <Image src={data.trackMetadata.displayImageUri} width={120} height={120} className={' object-center object-cover'} alt='' />
                                                </div>
                                                <p>{data.trackMetadata.artists[0].name}</p>
                                                <p>{data.trackMetadata.trackName}</p>
                                            </section>
                                        ))
                                        :
                                        <div className={'h-[120px] flex items-center justify-center w-full'}>
                                            <p>Something went wrong</p>
                                        </div>
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
                        <div className={'h-[120px] flex items-center justify-center w-full'}>
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
                <div className={''}>
                    <div className={styles.headers}>
                        <p>Trending Songs</p>
                        <p>see all</p>
                    </div>
                    <section className={`flex justify-around items-center w-full md:py-[10px] md:px-[10px]`}>
                        {isOnline ?
                            <>
                                {!isLoading ?
                                    <>
                                        {args?
                                            args.data.slice(0, 5).map((data, index) => (
                                                <section key={index} className={`${styles.mappedImag}`}>
                                                    <div>
                                                        <Image src={data.trackMetadata.displayImageUri} width={120} height={120} className={' object-center object-cover'} alt='' />
                                                    </div>
                                                    <p>{data.trackMetadata.artists[0].name}</p>
                                                    <p>{data.trackMetadata.trackName}</p>
                                                </section>
                                            ))
                                            :
                                            <div className={'h-[120px] flex items-center justify-center w-full'}>
                                                <p>Something went wrong</p>
                                            </div>
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
                            <div className={'h-[120px] flex items-center justify-center w-full md:px-[20px]'}>
                                <p>Sorry, No Data Available </p>
                            </div>
                        }
                    </section>
                </div>
                <TrendsComponent data={globalTrends} leftText={"Global Trends"} />
                <TrendsComponent data={suggestionData} leftText={"Global Chart"} />
            </div>
        );
    }
    const componentsMapping: Mapper[] = [
        { text: "All", component: <RightBar data={mostPlayedSongs} /> },
        { text: "Browse", component: <></> },
        { text: "My Library", component: <></> },
    ]

    useMemo(() => {
        suggestion()
        getGlobalTrends();
        getMostPlayedTracks()
        setRightComponent(<RightBar data={mostPlayedSongs} />);
    }, [])
    
    function LeftBar() {
        return (
            <div className={styles.leftBar}>
                {componentsMapping.map((data, index)=>(
                    <p key={index} className={`${styles.currentText} ${rightComponent !== data.component ? "hover:bg-blue-400":"bg-blue-400" }`} onClick={()=>setRightComponent(data.component)}>{data.text}</p>
                ))
                }
               
            </div>
        )

    }

    return (
        <>
           <Navbar/>
            <div className={styles.homePage}>
                <LeftBar />
                {rightComponent}
            </div>
        </>
    )
}
