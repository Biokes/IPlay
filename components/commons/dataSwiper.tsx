import {Box} from "@mui/material";
import {Swiper, SwiperSlide} from "swiper/react";
import {Song} from '@/interface/interfaces'
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import { Navigation, Pagination} from 'swiper/modules';
import EmptyComponent from "@/components/commons/emptyComponent";
import styles from "@/styles/home.module.css"

export default function DataSwiper({ data }: { data: Song[] }){
    if(data.length === 0 || !Array.isArray(data)) {
        return (
            <EmptyComponent/>
        )
    }
    return (
        <Box>
            <Swiper spaceBetween={10}
                    className={'h-[300px]'}
                    modules={[Navigation, Pagination]}
                    slidesPerView={3}
                    pagination={{ clickable: true }}
                    scrollbar={{ draggable: true }}
                    loop={true}
                    style={{
                        '--swiper-pagination-bottom':'#ffffff',
                        '--swiper-navigation-color':'#ffffff',
                        '--swiper-pagination-color':'#ffffff',
                    } as React.CSSProperties & { [key: string]: string }}
            >
                {data.slice(0, 50).map((item, index) => (
                    <SwiperSlide key={index}>
                        <Box sx={{
                                paddingTop: "50%",
                                width:{
                                    xs:'400px',
                                    sm:'500px',
                                    md:'650px'
                                },
                                height:{
                                    xs:'400px',
                                    sm:'500px',
                                    md:'650px'
                                },
                                backgroundPosition: "center",
                                backgroundSize: "cover",
                                backgroundRepeat: "no-repeat",
                                backgroundImage: `url(${item.trackMetadata.displayImageUri})`,
                                transition: "transform 300ms ease-in-out, opacity 300ms ease-in-out",
                                "&:hover": {
                                    opacity: 0.5,
                                    transform: "scale(1.01)",
                                },
                                overflow: "hidden",
                                display: {
                                    xs: "flex",
                                    md: "block",
                                },
                            }}>
                            <div className={styles.trackMetaData}>
                                <p>{item.trackMetadata.trackName}</p>
                                <p>{item.trackMetadata.artists[0].name}</p>
                            </div>
                        </Box>
                    </SwiperSlide>
                ))}
            </Swiper>

        </Box>
    )

}