'use client'
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import PersonIcon from '@mui/icons-material/Person';
import React, {useState, useMemo} from "react";
import {CircularProgress} from "@mui/material"
import Image from 'next/image';
import { useEffect} from 'react'
import {ChartData} from '@/interface/interfaces'
import styles from '@/styles/home.module.css';
import {Mapper} from '@/interface/interfaces'
import { useAppSelector, useAppDispatch } from '@/redux/store';
import { saveSong } from "@/redux/songSlice"
import Browse from './browse';

export default function HomePage(props: { loading:boolean }) {
    
    const [topSongs, setTopSongs] = useState<ChartData[]>([])
    const isOnline = navigator.onLine;
    const [globalTrends, setGlobalTrendsData] = useState<ChartData[]>([])
    const [rightComponent, setRightComponent] = useState<React.ReactNode>(<></>)
    const [suggestionData, setSuggestionData] = useState<ChartData[]>([])
    const [isLoading, setLoading] = useState<boolean>(props.loading)
    const suggestion = async () => {
        setSuggestionData([])
    }
    const globalData = useAppSelector((state) => state.Songs.globalTrends);
    const topData = useAppSelector((state)=> state.Songs.topSongs)
    useEffect(() => { 
        setTopSongs(topData)
        setGlobalTrendsData(globalData)
        setLoading(isLoading);
    }, [])
    const dispatch = useAppDispatch()
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

    const TrendsComponent = ({ data, leftText, loading }: { data: ChartData[]; leftText: string; loading:boolean}) => {
        if (!data || data.length === 0) {
            return (
                <div className="h-[120px] flex items-center justify-center w-full">
                    <p>Sorry, No Data Available</p>
                </div>
            );
        }
        const save = (data: ChartData) => { 
            dispatch(saveSong(data))
        }

        return (
            <div>
                <div className={styles.headers}>
                    <p>{leftText}</p>
                    <p>see all</p>
                </div>
                <section className="flex justify-around items-center w-full md:px-[10px]">
                    {!loading ?
                            data.slice(0, 5).map((song, index) => (
                                <section key={index} className={`${styles.mappedImag}`} onClick={() => {
                                    save(song)
                                }}>
                                <div>
                                    <Image src={song.trackMetadata.displayImageUri} width={120} height={120} className="object-center object-cover"alt=""/>
                                </div>
                                <p>{song.trackMetadata.artists[0].name}</p>
                                <p>{song.trackMetadata.trackName}</p>
                            </section>
                            )) :
                            <div className={'h-[150px] w-full flex justify-center items-center bg-gray-800'}>
                                <div>
                                    <CircularProgress size={40} />
                                </div>
                            </div>
                }
                </section>
            </div>
        );
    };

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
                                {!props.loading ?
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
                <TrendsComponent data={globalTrends} leftText={"Global Trends"} loading={isLoading} />
                <TrendsComponent data={suggestionData} leftText={"Global Chart"} loading={isLoading} />
            </div>
        );
    }
    const componentsMapping: Mapper[] = [
        { text: "All", component: <RightBar data={topSongs} /> },
        {
            text: "Browse", component: <Browse firstComponent={<TrendsComponent data={globalTrends} leftText={"Global Trends"}
                loading={isLoading} />} secondComponent={ <TrendsComponent data={suggestionData} leftText={"Global Chart"} loading={isLoading}/>} />
        },
        { text: "Favourite", component: <></> },
    ]

    useMemo(() => {
        suggestion()
        setRightComponent(<RightBar data={topSongs} />);
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
