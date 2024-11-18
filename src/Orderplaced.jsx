import React from "react";
import { Link } from "react-router-dom";

export default function Orderplaced() {


  return (
    <div className="w-[80%] mx-auto mt-[5%]">
      <img
        className="w-[20%] mx-auto"
        src="https://www.bikaji.com/pub/media/animation.gif"
        alt=""
      />
      <h1 className="text-[#51AD7F] text-center text-[46px]">
        Order successfully placed!
      </h1>
      <Link to={"/"}>
        <button className="flex justify-center p-2 text-[18px] text-white bg-green-600 rounded mx-auto mt-5">
          Another shopping
        </button>
      </Link>
    </div>
  );
}
