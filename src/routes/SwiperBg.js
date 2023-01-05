import { Navigation, Pagination, Autoplay, EffectFade} from 'swiper';

import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

function SwiperBg() {
    const items = [
        {
            src : 'https://cdn.dominos.co.kr/admin/upload/banner/20221103_x9m44M2k.jpg'
        },
        {
            src : 'https://cdn.dominos.co.kr/admin/upload/banner/20221215_EFPULxFt.jpg'
        },
        {
            src : 'https://cdn.dominos.co.kr/admin/upload/banner/20221228_nFPXf4Vx.jpg'
        },
        {
            src : 'https://cdn.dominos.co.kr/admin/upload/banner/20221228_t13777sq.jpg'
        },
        {
            src : 'https://cdn.dominos.co.kr/admin/upload/banner/20221227_OkxHNHVd.jpg'
        },
        {
            src : 'https://cdn.dominos.co.kr/admin/upload/banner/20221031_Ym2yTFx4.jpg'
        }
    ]
    return (
        <>
        <Swiper
            effect={"slide"}
            autoplay={{
                delay: 3000,
                disableOnInteraction: false,
            }}
            navigation={true}
            pagination={{
                clickable: true
            }}
            modules={[Navigation, EffectFade, Pagination,Autoplay]}
            className="mySwiper"
            loop={true}
        >
            {items.map((item, idx) => {
                return (
                    <SwiperSlide key={idx}>
                        <img src={item.src} />
                    </SwiperSlide>
                );
            })}
        </Swiper>
    </>
      );
}


  export default SwiperBg