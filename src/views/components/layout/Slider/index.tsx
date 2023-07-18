import { useEffect, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react/swiper-react";

// Import Swiper styles
import 'swiper/modules/pagination/pagination.min.css';
import 'swiper/swiper.min.css';

// import required modules
import { Autoplay, EffectFade } from "swiper";
import { apiGet } from "utils/api";

interface IBannerList {
    "banner_link_512": "string",
    "banner_link_1024": "string",
    "banner_link_2560": "string"
}

export default function SliderSwiper() {
    const [bannerList, setBannerList] = useState<IBannerList[]>([]);

    const getBannerList = async () => {
        try {
            const data = await apiGet<IBannerList[]>('s2/v2/banners');
            setBannerList(data.data ?? [])
        }
        catch (e) {
            setBannerList([])
        }
    };

    useEffect(() => {
        getBannerList()
    }, []);

    
    return (
        <>
             <Swiper
                loop={true}
                speed={2000}
                autoplay={{
                    delay: 2000,
                    disableOnInteraction: true,
                }}
                effect={"fade"}
                modules={[Autoplay, EffectFade]}
                className="mySwiper">
                {bannerList && bannerList.map((img, index) => <SwiperSlide key={index}><img src={img.banner_link_1024} alt={''} /></SwiperSlide>
                )}
            </Swiper>
        </>
    );
}
