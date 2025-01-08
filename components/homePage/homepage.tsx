'use client'
import Navbar from "@/components/commons/Navbar";
import {useAppSelector} from "@/redux/store";
import MusicPlayer from "@/components/commons/MusicPlayer";
import styles from '@/styles/home.module.css'
export default function HomePage() {
    const currentComponent = useAppSelector(state=>state.app.component)

    return (
        <div className={styles.main}>
            <section>
                <Navbar/>
                <div className={'h-[80vh] overflow-y-auto'}>
                    {currentComponent}
                </div>
            </section>
            <MusicPlayer artists={[]} displayImageUri={'https://i.scdn.co/image/in9ojd/kd'} trackName={' '} trackUri={'https://i.scdn.co/wuj'}/>
        </div>
    )
}
