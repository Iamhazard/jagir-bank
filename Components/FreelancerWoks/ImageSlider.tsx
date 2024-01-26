/* eslint-disable @next/next/no-img-element */

import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

interface Image {
  url: string;
}

interface ImageSliderProps {
  images: Image[] | string[];
}

const ImageSlider: React.FC<ImageSliderProps> = ({ images }) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
  };

  return (
    <Slider {...settings}>
      {(images as Image[] | string[]).map((image, index) => (
        <div key={index}>
          <img
            src={typeof image === "string" ? image : image.url}
            alt={`Image ${index + 1}`}
            className="w-full h-64 object-cover rounded-lg"
          />
        </div>
      ))}
    </Slider>
  );
};

export default ImageSlider;
