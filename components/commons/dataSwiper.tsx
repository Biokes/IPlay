import {Box} from "@mui/material";
import { Navigation, Pagination } from "swiper/modules";
import {Swiper, SwiperSlide} from "swiper/react";
import {Song} from '@/interface/interfaces'
export default function DataSwiper({ data }: { data: Song[] }){
    return (
        <Box sx={{
            "& .swiper-slide": {
                width: "100%",
                opacity: "0.6",
                paddingBottom: "3rem"
            },
            "& .swiper-slide-active": { opacity: 1 },
            "& .swiper-pagination-bullet": {
                backgroundColor: "text.primary"
            },
            "& .swiper-button-next, & .swiper-button-prev": {
                color: "text.primary",
                "&::after": {
                    fontSize: { xs: "1rem", md: "2rem" }
                }
            },
            "& .swiper": {
                paddingInline: { xs: "1rem", md: "4rem" }
            }
        }}
        >

            <Swiper
                spaceBetween={10}
                grabCursor={true}
                pagination={{ clickable: true }}
                navigation={true}
                modules={[Navigation, Pagination]}
                style={{ width: "100%", height: "max-content" }}>
                {
                    data.splice(0, 10).map((item, index) => (
                        <SwiperSlide key={index}>
                            <Box sx={{
                                paddingTop: "60%",
                                backgroundPosition: "top",
                                backgroundSize: "cover",
                                backgroundImage: `url(${item.trackMetadata.displayImageUri})`
                            }}
                            />
                        </SwiperSlide>
                    ))
            }
            </Swiper>
        </Box>
    )

}