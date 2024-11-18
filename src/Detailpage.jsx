import React, { useContext, useEffect, useState } from "react";
import Header from "./Header";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Maincontext } from "./contextWork/Cartcontext";
import { toast, ToastContainer } from 'react-toastify';

export default function Detailpage() {
  let [singleProduct, setSingleProd] = useState([]);
  let [smallImg, setSamllImg] = useState([]);
  let [bigImg, setBigImg] = useState([]);

  
  let para = useParams();
  let prod_id = para.id;
  let singleProdDetail = () => {
    axios
      .get(`https://dummyjson.com/products/${prod_id}`)
      .then((res) => {
        setSingleProd(res.data);
        setSamllImg(res.data.images);
        setBigImg(res.data.thumbnail);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    singleProdDetail();
  }, []);

  let { wish, setWish } = useContext(Maincontext);

  let AddtoWish=(e)=>{
    let wishObj = {
      name: e.title,
      category:e.category,
      brand:e.brand,
      img: e.thumbnail,
      price: e.price,
      quantity: 1,
    }
    setWish([...wish,wishObj])
    toast.success("Item moved to wishlist")
  }

  return (
    <div>
      <ToastContainer/>
      <Header />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
        <div className="flex flex-col md:flex-row -mx-4">
          <div className="md:flex-1 px-4">
            <div className="grid grid-cols-[30%_auto]">
              <div className="flex flex-col gap-2 my-auto">
                {smallImg.map((v, i) => {
                  return (
                    <div key={i} className="w-[80px] h-[80px] mx-auto bg-white">
                      <img
                        src={v}
                        onMouseOver={() => setBigImg(v)}
                        // onMouseOut={()=> setBigImg("https://cdn.dummyjson.com/products/images/laptops/Asus%20Zenbook%20Pro%20Dual%20Screen%20Laptop/1.png")}
                        alt=""
                        className="w-[100%] mx-auto h-[80px]"
                      />
                    </div>
                  );
                })}
              </div>
              <div className="h-64 md:h-80 rounded-lg bg-gray-100 mb-4">
                <img src={bigImg} className=" h-[100%] mx-auto" alt="" />
              </div>
            </div>
          </div>
          <div className="md:flex-1 px-4">
            <h2 className="mb-2 leading-tight tracking-tight font-bold text-white text-2xl md:text-3xl">
              {singleProduct.title}
            </h2>
            <p className="text-gray-500 text-sm">
              By{" "}
              <a href="#" className="text-indigo-600 hover:underline">
                {singleProduct.brand}
              </a>
            </p>

            <div className="flex items-center space-x-4 my-4">
              <div>
                <div className="rounded-lg bg-gray-100 flex py-2 px-3">
                  <span className="text-indigo-400 mr-1 mt-1">&#x20b9;</span>
                  <span className="font-bold text-indigo-600 text-3xl">
                    {singleProduct.price}
                  </span>
                </div>
              </div>
              <div className="flex-1">
                <p className="text-green-500 text-xl font-semibold">
                  Save {singleProduct.discountPercentage}
                </p>
                <p className="text-gray-400 text-sm">Inclusive of all Taxes.</p>
              </div>
            </div>

            <p className="text-white">{singleProduct.description}</p>

            <div className="flex py-4 space-x-4">
              <button 
                onClick={(e)=>AddtoWish(singleProduct)}
                type="button"
                className="h-14 px-6 py-2 font-semibold rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white"
              >
                Add to Wishlist
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
