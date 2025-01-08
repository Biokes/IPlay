import DataSwiper from "@/components/commons/dataSwiper";
import {useAppSelector} from "@/redux/store";

export default function NaijaTops(){
    const naijaTopSongs = useAppSelector(state => state.Songs.topSongs)
    return (
        <div>
            <p>Top Songs</p>
            <DataSwiper data={naijaTopSongs}/>
        </div>
    )
}