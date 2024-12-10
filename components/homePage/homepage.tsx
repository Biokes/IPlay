'use client'
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import PersonIcon from '@mui/icons-material/Person';
import {useEffect, useState} from "react";
import {CircularProgress} from "@mui/material"
import Image from 'next/image';
import SearchIcon from '@mui/icons-material/Search';
import {ChartData} from '@/interface/interfaces'
import getLastThursday from '@/functions/func';

export default function HomePage(){
    const [mostPlayedSongs, setMostPlayedSongs] = useState<ChartData[]>([])
    const [isLoading, setLoading] = useState<boolean>(false);
    const [searchInput,setSearchInput] = useState<string>('')
    // const HandleSearch=()=>{
    // }

    const getMostPlayedTracks= async ()=>{
        const url = `https://spotify81.p.rapidapi.com/top_200_tracks?country=NG&period=weekly&date=${getLastThursday()}`;
        const options = {
                method: 'GET',
                headers: {
                    'x-rapidapi-key': 'febfd66cf9msh276ca2c333c55b2p17a072jsnb411682e032e',
                    'x-rapidapi-host': 'spotify81.p.rapidapi.com'
                }
        };

            try {
                if(navigator.onLine){
                    const response = await fetch(url, options);
                    const result = await response.json();
                    console.log(result);
                    setMostPlayedSongs(result)
                }
            } catch (error) {
                console.error("Cause of Error: ",error);
            }
        }

        useEffect(()=> {
            setLoading(true);
            getMostPlayedTracks();
        }, [])
    
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

    function RightBar (args: {data: ChartData[]}){
        return (
          <div className={'px-[20px] md:px-0 mt-[50px]'}>
                <form className='border-[1px] border-white flex w-full md:w-[400px] rounded-[10px] overflow-hidden' >
                    <input type="text" placeholder={"Search artist"} onChange={(e)=>setSearchInput(e.target.value)} value={searchInput}
                        className={`w-[90%] px-[10px] h-[50px] focus:outline-none outline-none`}/>
                        <div className='w-[10%]'>
                            <SearchIcon className={"w-[100%] h-[50px] hover:cursor-pointer hover:bg-gray-300 hover:text-gray-900"}/>
                        </div>
                </form>
              <div>
                    <div className='flex justify-between items-center px-[10px] h-[40px]'>
                        <p>Most Played Songs</p>
                        <p>see all</p>
                    </div>
                    <section className={'flex justify-between items-center w-full px-[20px]'}>
                        {navigator.onLine?
                            <>
                                {!isLoading?
                                    args.data.slice(0,4).map((data, index)=>(
                                        <section key={index}>
                                            <div className={'w-[150px]'}>
                                                <Image src={data.trackMetadata.displayImageUri} width={100} height={100} alt=''/>
                                            </div>
                                            <p>{data.trackMetadata.artists[0].name}</p>
                                        </section>
                                    )):
                                    <div className={'h-[150px] w-full'}>
                                        <CircularProgress size={40}/>
                                    </div>
                                }
                            </>
                            :
                            <div className='h-[150px] items-center justify-center'>
                                <p>You are currently offline</p>
                            </div>
                        }
                    </section>
              </div>
              <div>
              </div>
          </div>
        );
    }

    return (
        <>
           <Navbar/>
            <RightBar data={mostPlayedSongs}/>
        </>
    )
}