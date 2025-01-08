import {Box} from "@mui/material";
// import { Navigation, Pagination } from "swiper/modules";
import {Swiper, SwiperSlide} from "swiper/react";
import {Song} from '@/interface/interfaces'
export default function DataSwiper({ data }: { data: Song[] }){
    return (
        <Box sx={{paddingInline:'15px'}}>
            <Swiper spaceBetween={5} style={{ width: "100%", height: "400px", display:'flex'}}>
                {
                    data.splice(0, 50).map((item, index) => (
                        <SwiperSlide key={index}>
                            <Box sx={{
                                paddingTop: "50%",
                                backgroundPosition: "center",
                                backgroundSize: "cover",
                                repeat:'no repeat',
                                backgroundImage: `url(${item.trackMetadata.displayImageUri})`
                            }}
                                 className="hover:opacity-20 hover:scale-105 hover:transition-transform hover:duration-300"
                            >
                                <div className={'bg-gray-800 opacity-10 flex pl-[10px] pr-[10px]'}>
                                    <p>{item.trackMetadata.trackName}</p>
                                    <p>{item.trackMetadata.artists[0].name}</p>
                                </div>
                            </Box>
                        </SwiperSlide>
                    ))
                }
            </Swiper>
        </Box>
    )

}