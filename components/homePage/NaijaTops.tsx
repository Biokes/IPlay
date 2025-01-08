import DataSwiper from "@/components/commons/dataSwiper";
import styles from '@/styles/home.module.css'
import {Song} from "@/interface/interfaces";
export default function TrendComponent(props:{text:string, songs:Song[]}){
    return (
        <div className={'w-full sm:w-[70%] px-[12px] pt-[20px]'}>
            <p className={styles.componentTitle}>{props.text}</p>
            <DataSwiper data={props.songs}/>
        </div>
    )
}