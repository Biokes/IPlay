'use client'
import Navbar from "@/components/commons/Navbar";
import MusicPlayer from "@/components/commons/MusicPlayer";
import styles from '@/styles/home.module.css';
import HomeContent from "@/components/homePage/homeContent";
import {useAppSelector} from "@/redux/store";

export default function HomePage() {
    const selectedSong= useAppSelector(state => state.Songs.selectedSongUrl)
    return (
        <div className={styles.main}>
            <section>
                <Navbar />
                <div className={`${selectedSong?'h-[75vh] overflow-y-auto':''}`}>
                    <HomeContent/>
                </div>
            </section>
            { selectedSong &&
                <MusicPlayer
                    artists={[]}
                    displayImageUri="https://i.scdn.co/"
                    trackName="https://i.scdn.co/"
                    trackUri="https://i.scdn.co/"
                />
            }

        </div>
    );
}
