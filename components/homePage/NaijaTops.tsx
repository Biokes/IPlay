import DataSwiper from "@/components/commons/dataSwiper";
import {useAppSelector} from "@/redux/store";
import styles from '@/styles/home.module.css'
export default function NaijaTops(){
    const naijaTopSongs = useAppSelector(state => state.Songs.topSongs)
    return (
        <div className={'w-full sm:w-[70%] px-[12px] pt-[20px]'}>
            <p className={styles.componentTitle}>Top Songs</p>
            <DataSwiper data={naijaTopSongs}/>
        </div>
    )
}