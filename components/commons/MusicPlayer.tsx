import {useAppSelector} from "@/redux/store";
import {TrackMetadata} from '@/interface/interfaces';
import {useState, useRef, RefObject, Dispatch, SetStateAction, useEffect} from 'react'
import '@/styles/defaultStyleSheet.css';

export default function MusicPlayer(song:TrackMetadata){
    const selectedSong = useAppSelector((state)=>state.Songs.selectedSongUrl)
    const [isPlaying, setIsPlaying] = useState<boolean>(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [songDuration, setDuration] = useState<number>(0)
    const audioRef = useRef(null);
    function pausePlay (args: {ref: RefObject<null>, isPlaying: boolean, setter:Dispatch<SetStateAction<boolean>> }){
        args.setter(!args.isPlaying)
    }

    useEffect(() => {
        if(isPlaying){
            audioRef.current.play();
        }else {
            audioRef.current.pause();
        }
    }, [isPlaying]);
    function seek(e){

    }
    function updateTime(){
        const duration = audioRef.current.duration;
        setCurrentTime(audioRef.current.currentTime)3;
    }
    return (
        <div className={'h-[50px] md:h-[70px] shadow-white shadow-md flex flex-col md:flex-row items-center justify-around'}>
            <p>{song.trackName}</p>
            <p>{song.artists[0].name}</p>
            <p>{selectedSong ? selectedSong : 'no song selected yet'}</p>
            <input type="range" min={0} max={songDuration} value={currentTime} />
            <audio src={song.trackUri} ref={audioRef} onTimeUpdate={updateTime}/>
            <div>
                <section>
                    <button>
                        <span className='material-symbols-rounded'>
                            {isPlaying?'pause': 'play_arrow'}
                        </span>
                    </button>
                </section>
            </div>
        </div>
    )
}