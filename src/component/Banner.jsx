import React from 'react'
import bannerImg from "../assets/bannerImg.jpg";
function Banner() {
 return (
    <div
      className="h-[600px] bg-cover bg-center relative"
      style={{ backgroundImage: `url(${bannerImg})` }}
    >
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 text-center w-full bg-gray-900/60 ">
        <h1 className="text-white text-3xl font-bold">
          Avengers Endgame
        </h1>
      </div>
    </div>
  );
}

export default Banner