import {useAppSelector} from "@/redux/store";

export default function MusicPlayer(){
    const selectedSong = useAppSelector((state)=>state.Songs.selectedSongUrl)
    return (
        <div className={'h-[50px] md:h-[70px] shadow-white shadow-md flex flex-col md:flex-row items-center justify-around'}>
            <p>{selectedSong ? selectedSong : 'no song selected yet'}</p>
        </div>
    )
}