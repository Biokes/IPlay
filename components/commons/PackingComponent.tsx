import {Song} from "@/interface/interfaces";
import EmptyComponent from "@/components/commons/emptyComponent";
import styles from "@/styles/home.module.css";
import DataSwiper from "@/components/commons/dataSwiper";
import React from "react";

export default function TrendsComponent({ data, leftText}: { data: Song[]; leftText: string}){
    console.log(typeof data);
    return (
        <div>
            <div className={styles.headers}>
                <p>{leftText}</p>
            </div>
            <section className="flex justify-around items-center w-full md:px-[10px]">
                {
                    Array.isArray(data) ?
                         <DataSwiper  data={data}/>
                        :
                        <EmptyComponent/>
                }
            </section>
        </div>
    );
};
