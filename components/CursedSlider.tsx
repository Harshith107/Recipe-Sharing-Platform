"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import CursedCard from "./CursedCard";

export default function CursedSlider({ recipes }: { recipes: any[] }) {
  return (
    <Swiper spaceBetween={20} slidesPerView={3} loop={true} autoplay>
      {recipes.map((recipe) => (
        <SwiperSlide key={recipe._id}>
          <CursedCard {...recipe} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
