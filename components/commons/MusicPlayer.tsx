'use client'
import { useAppSelector } from "@/redux/store";
import { TrackMetadata,PausePlayArgs } from '@/interface/interfaces';
import { useState, useRef, useEffect, ChangeEvent } from 'react';
import {KeyboardArrowRight, KeyboardArrowLeft, Pause, PlayArrow} from "@mui/icons-material";

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
        <div className="h-[100px] shadow-white shadow-md flex flex-col md:flex-row items-center justify-around">
            <section className={"hidden md:flex"}>
                <p>{song.trackName}</p>
                <p>{song.artists[0]?.name}</p>
                <p>{selectedSong || 'no song selected yet'}</p>
            </section>
            <section>
                <input type="range" min={0} max={songDuration} value={currentTime} onChange={seek}/>
                <audio src={song.trackUri} ref={audioRef} onTimeUpdate={updateTime}/>
                <div>
                    <KeyboardArrowLeft/>
                    <button onClick={() => pausePlay({ref: audioRef, isPlaying, setter: setIsPlaying})}>
                        <span>{isPlaying? <PlayArrow/> : <Pause/>}</span>
                    </button>
                    <KeyboardArrowRight/>
                </div>
            </section>

            <div>
                {/*<Slider defaultValue={30} aria-label="Volume"/>*/}

            </div>

        </div>
    );
}