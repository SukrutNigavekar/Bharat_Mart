import React, { useContext, useEffect, useState } from "react";
import Header from "./Header";
import { Maincontext } from "./contextWork/Cartcontext";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

export default function AddtoCart() {
  let { wish, setWish, cart, setCart } = useContext(Maincontext);

  return (
    <>
      <Header />
      <h1 className="text-white text-4xl font-serif font-bold p-5 text-center">
        Cart
      </h1>
      <div className="container text-white mx-auto">
        <div className="row">
          <div className="col-12">
            <div className="table-responsive wishlist_table grid grid-cols-[70%_auto]">
              <table className=" w-[95%]  mx-auto p-5">
                <thead className=" border border-white-100 ">
                  <tr>
                    <th className="p-5 ">Product Image</th>
                    <th className="p-5 "> Title</th>
                    <th className="p-5 ">Price</th>
                    <th className="p-5 ">Quantity</th>
                    <th className="p-5 ">Action</th>
                  </tr>
                </thead>
                <tbody>
                  <>
                    {cart.length > 0
                      ? cart.map((v, i) => {
                          return (
                            <>
                              <Tr data={v} id={i} />
                            </>
                          );
                        })
                      : <div className="text-white text-[24px] text-center mt-5">Cart is empty</div>
                      }
                  </>
                </tbody>
              </table>
              <div className="w-[90%] border border-white-100 mx-auto">
                <TotalAmount/>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

let Tr = ({ data, id }) => {
  let { wish, setWish, cart, setCart } = useContext(Maincontext); 

  let Delete = (DelID) => {
    let newCartList = cart.filter((v, i) => DelID != i);
    setCart(newCartList);
    toast.error("Item removed from cart");
  };

  let handlecount = (e) => {
    let newQuantity = e.target.value;
    let oldData = [...cart];
    oldData[id].quantity = newQuantity;
    setCart(oldData);
  };

  return (
    <>
      <tr key={id} className="border border-white-100 p-10">
        <td className=" p-10">
          <a href="#">
            <img width="80px" height="80px" src={data.img} alt="product1" />
          </a>
        </td>
        <td className=" p-10 text-center" data-title="Product">
          {data.name}
          <br />
        </td>
        <td className="p-10" data-title="Price">
          ₹{(data.price * data.quantity).toFixed(2)}
        </td>
        <td className="p-10" data-title="category">
          <input
            onChange={handlecount}
            type="number"
            className="text-black p-1"
            min={1}
            defaultValue={data.quantity}
            max={10}
          />
        </td>
        <td className="p-10 " data-title="Remove">
          <button
            onClick={() => Delete(id)}
            className="bg-red-600 rounded p-2 mx-auto"
          >
            Remove
          </button>
        </td>
      </tr>
    </>
  );
};

let TotalAmount = () => {
  let { wish, setWish, cart, setCart } = useContext(Maincontext);
  const [total,setTotal]=useState([]);
  let sum;

  let Total=()=>{
    sum = 0;
    cart.map((v,i)=>{
      return(
        sum = sum +((v.price)*(v.quantity))
      );
    })
    setTotal(sum)
  }
  useEffect(()=>{
    Total()
  },[cart])
  return (
    <table className="w-full">
      <thead>
        <tr className=" w-[80%] mx-auto ">
          <th className="text-white w-[70%] text-[26px] text-left ps-5 p-4">
            Price details
          </th>
          <th className=" w-[30%] text-[26px] text-left p-4"></th>
        </tr>
      </thead>
      <tbody>
        <tr className=" w-[80%] mx-auto">
          <td className="ps-5 text-[20px] p-1">Total MRP :</td>
          <td className="text-center text-[20px] p-1">{Math.ceil(total)}/-</td>
        </tr>
        <tr className=" w-[80%] mx-auto">
          <td className="ps-5 text-[20px] p-1">Tax charge :</td>
          <td className="text-center text-[20px] p-1">18%</td>
        </tr>
        <tr className=" w-[80%] mx-auto">
          <td className="ps-5 bg-blue-600 text-[20px] p-1">Total amount :</td>
          <td className="bg-blue-600 text-center text-[20px] p-1">{Math.ceil(total*1.18)}/-</td>
        </tr>
        <tr className=" w-full mx-auto">
          <Link to={"/orderplaced"}>
          <button className="rounded w-[90%] bg-green-600 m-2 p-2 text-[20px] ">
            Place order
          </button>
          </Link>
        </tr>
      </tbody>
    </table>
  );
};
