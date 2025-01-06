'use client'
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import PersonIcon from '@mui/icons-material/Person';
import React, {useState, useMemo} from "react";
import {CircularProgress} from "@mui/material"
import Image from 'next/image';
import {Song,} from '@/interface/interfaces'
import styles from '@/styles/home.module.css';
import {Mapper} from '@/interface/interfaces'
import { useAppSelector, useAppDispatch } from '@/redux/store';
import { saveSong } from "@/redux/slices/songSlice"
import EmptyComponent from "@/components/commons/emptyComponent";
import MusicPlayer from "@/components/commons/MusicPlayer";

export default function HomePage() {
    const [topSongs, setTopSongs] = useState<Song[]>([])
    const [globalTrends, setGlobalTrendsData] = useState<Song[]>([])
    const [rightComponent, setRightComponent] = useState<React.ReactNode>(<></>)
    // const [suggestionData, setSuggestionData] = useState<ChartData[]>([])
    const dispatch = useAppDispatch()
    // const suggestion = async () => {
    //     setSuggestionData([])
    // }
    const username = useAppSelector((state)=>state.user.username)
    const globalData = useAppSelector((state) => state.Songs.globalTrends);
    const topData = useAppSelector((state)=> state.Songs.topSongs)
    useMemo(() => {
        if (!globalData || globalData.length !== 0) {
            setGlobalTrendsData(globalData);
        }
        if(!topData || topData.length !== 0) {
            setTopSongs(topData)
        }
    }, [globalData, topData]);

    const Navbar = () => {
        return (
            <div className={'flex items-center justify-between bg-blue-500 p-[5px_10%] rounded-md'}>
                <div className={'flex'}>
                    <div>
                        <PlayCircleOutlineIcon />
                    </div>
                    <p className={'text-[20px]'}>IPlay</p>
                </div>
                <button className={'bg-white rounded-2xl flex items-center px-[10px] hover:cursor-pointer'}>
                    <div className={'p-[5px]'}>
                        <PersonIcon className={'text-black'} />
                    </div>
                    <p className={'text-blue-500'}>{ !username? "Login" : username}</p>
                </button>
            </div>
        )
    }

    const TrendsComponent = ({ data, leftText }: { data: Song[]; leftText: string}) => {
        if (!data || data.length === 0) {
            return <EmptyComponent/>
        }
        const save = (data: Song) => {
            dispatch(saveSong(data))
        }

        return (
            <div>
                <div className={styles.headers}>
                    <p>{leftText}</p>
                    <p>see all</p>
                </div>
                <section className="flex justify-around items-center w-full md:px-[10px]">
                    {data?
                            data.slice(0, 5).map((song, index) => (
                                <section key={index} className={`${styles.mappedImag}`} onClick={()=>{save(song)}}>
                                    <div>
                                        <Image src={song.trackMetadata.displayImageUri} className="object-center object-cover w-[150] h-[150] sm:w-[250] sm:h-[250] md:w-[250] md:h-[250]" alt=""/>
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

    function RightBar(args: { data: Song[] }) {
        return (
            <div className={styles.rightBar}>
                <div className={''}>
                    <div className={styles.headers}>
                        <p>Trending Songs</p>
                        <p>see all</p>
                    </div>
                    <section className={`flex justify-around items-center w-full md:py-[10px] md:px-[10px]`}>
                        {args ?
                            <>
                                {args ?
                                    args.data.slice(0, 5).map((data, index) => (
                                        <section key={index} className={`${styles.mappedImag}`}>
                                            <div>
                                                <Image src={data.trackMetadata.displayImageUri} width={120}
                                                       height={120} className={' object-center object-cover'}
                                                       alt=''/>
                                            </div>
                                            <p>{data.trackMetadata.artists[0].name}</p>
                                            <p>{data.trackMetadata.trackName}</p>
                                        </section>
                                    ))
                                    :
                                    <div
                                        className={'h-[150px] w-full flex justify-center items-center bg-gray-800'}>
                                        <div>
                                            <CircularProgress size={40}/>
                                        </div>
                                    </div>
                                }

                            </>
                            :
                            <EmptyComponent/>
                        }
                    </section>
                </div>
                <TrendsComponent data={globalTrends} leftText={"Nigeria Chart"}/>
                <TrendsComponent data={[]} leftText={"Global Chart"}/>
            </div>
        );
    }
    const componentsMapping: Mapper[] = [
        { text: "Home", component: <RightBar data={topSongs}/> },
        {text: "Browse", component: <></>},
        { text: "Favourite", component: <></> },
        {text: "Profile", component:<></>}
    ]

    useMemo(() => {
        // suggestion()
        setRightComponent(<RightBar data={topSongs} />);
    }, [topSongs])
    
    function LeftBar() {
        return (
            <div className={styles.leftBar}>
                {componentsMapping.map((data, index)=>(
                    <p key={index} className={`${styles.currentText} 
                        ${rightComponent !== data.component ? "hover:bg-blue-400":"bg-blue-400" }`}
                        onClick={()=>setRightComponent(data.component)}>{data.text}</p>
                ))
                }
               
            </div>
        )

    }
    return (
        <div className={'h-[100vh] flex  flex-col justify-between'}>
            <div className={'relative'}>
                <Navbar/>
                <div className={styles.homePage}>
                    <LeftBar />
                    {rightComponent}
                </div>
            </div>
            <MusicPlayer displayImageUri={'defaultSongData.displayImageUri'} artists={[]} trackName={'defaultSongData.trackName'} trackUri={'defaultSongData.trackUri'}
            />
        </div>
    )
}
