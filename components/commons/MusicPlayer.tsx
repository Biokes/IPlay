'use client'
import { useAppSelector } from "@/redux/store";
import { TrackMetadata,PausePlayArgs } from '@/interface/interfaces';
import { useState, useRef, useEffect, ChangeEvent } from 'react';
import '@/styles/defaultStyleSheet.css';

export default function MusicPlayer(song: TrackMetadata) {
    const selectedSong = useAppSelector((state) => state.Songs.selectedSongUrl);
    const [isPlaying, setIsPlaying] = useState<boolean>(false);
    const [currentTime, setCurrentTime] = useState<number>(0);
    const [songDuration, setDuration] = useState<number>(0);
    const audioRef = useRef<HTMLAudioElement | null>(null);

    function pausePlay(args: PausePlayArgs) {
        args.setter(!args.isPlaying);
    }

    useEffect(() => {
        if (audioRef.current) {
            if (isPlaying) {
                audioRef.current.play();
            } else {
                audioRef.current.pause();
            }
        }
    }, [isPlaying]);

    function seek(e: ChangeEvent<HTMLInputElement>) {
        if (audioRef.current) {
            const newTime = parseFloat(e.target.value);
            audioRef.current.currentTime = newTime;
            setCurrentTime(newTime);
        }
    }

    function updateTime() {
        if (audioRef.current) {
            setDuration(audioRef.current.duration || 0);
            setCurrentTime(audioRef.current.currentTime || 0);
        }
    }
    useEffect(() => {
        const audioElement = audioRef.current;
        if (audioElement) {
            audioElement.addEventListener("timeupdate", updateTime);
        }
        return () => {
            if (audioElement) {
                audioElement.removeEventListener("timeupdate", updateTime);
            }
        };
    }, []);

    return (
        <div className="h-[50px] md:h-[70px] shadow-white shadow-md flex flex-col md:flex-row items-center justify-around">
            <p>{song.trackName}</p>
            <p>{song.artists[0]?.name}</p>
            <p>{selectedSong || 'no song selected yet'}</p>
            <input type="range" min={0} max={songDuration} value={currentTime} onChange={seek}/>
            <audio src={song.trackUri} ref={audioRef} onTimeUpdate={updateTime} />
            <div>
                <section>
                    <button onClick={() => pausePlay({ ref: audioRef, isPlaying, setter: setIsPlaying })}>
                        <span className="material-symbols-rounded">
                          {isPlaying ? 'pause' : 'play_arrow'}
                        </span>
                    </button>
                </section>
            </div>
        </div>
    );
}
// import {useAppSelector} from "@/redux/store";
// import {TrackMetadata} from '@/interface/interfaces';
// import {useState, useRef, RefObject, Dispatch, SetStateAction, useEffect} from 'react'
// import '@/styles/defaultStyleSheet.css';
//
// export default function MusicPlayer(song:TrackMetadata){
//     const selectedSong = useAppSelector((state)=>state.Songs.selectedSongUrl)
//     const [isPlaying, setIsPlaying] = useState<boolean>(false);
//     const [currentTime, setCurrentTime] = useState(0);
//     const [songDuration, setDuration] = useState<number>(0)
//     const audioRef = useRef(null);
//     function pausePlay (args: {ref: RefObject<AudioElement | null>, isPlaying: boolean, setter:Dispatch<SetStateAction<boolean>> }){
//         args.setter(!args.isPlaying)
//     }
//
//     useEffect(() => {
//         if(isPlaying){
//             audioRef.current.play();
//         }else {
//             audioRef.current.pause();
//         }
//     }, [isPlaying]);
//     function seek(e:ChangeEvent<HTMLInputElement>){
//         audioRef.current.currentTime = e.target.value;
//         setCurrentTime(e.target.value)
//     }
//     function updateTime(){
//         setDuration(audioRef.current.duration);
//         setCurrentTime(audioRef.current.currentTime);
//     }
//     useEffect(()=>{
//         audioRef.current.addEventListener("timeupdate", updateTime);
//         return ()=> audioRef.current.removeEvetListener("timeupdate", updateTime);
//     },[])
//
//     return (
//         <div className={'h-[50px] md:h-[70px] shadow-white shadow-md flex flex-col md:flex-row items-center justify-around'}>
//             <p>{song.trackName}</p>
//             <p>{song.artists[0].name}</p>
//             <p>{selectedSong ? selectedSong : 'no song selected yet'}</p>
//             <input type="range" min={0} max={songDuration} value={currentTime} />
//             <audio src={song.trackUri} ref={audioRef} onTimeUpdate={updateTime}/>
//             <div>
//                 <section>
//                     <button>
//                         <span className='material-symbols-rounded'>
//                             {isPlaying?'pause': 'play_arrow'}
//                         </span>
//                     </button>
//                 </section>
//             </div>
//         </div>
//     )
// }
