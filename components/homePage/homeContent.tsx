'use client'
import TrendComponent from "@/components/homePage/NaijaTops";
import {useAppSelector} from "@/redux/store";

export default function HomeContent(){
    const naijaTopSongs = useAppSelector(state => state.Songs.topSongs);
    const globalTopSongs = useAppSelector(state => state.Songs.globalTrends)

    return(
        <>
            <TrendComponent text={"Naija Top Songs"} songs={naijaTopSongs}/>
            <TrendComponent text={"Global Top Songs"} songs={globalTopSongs}/>
            <TrendComponent text={"Trending Albums"} songs={[]}/>
        </>
    )
}