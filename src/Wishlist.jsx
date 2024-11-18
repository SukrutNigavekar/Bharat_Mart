import React, { useContext } from 'react'
import { Maincontext } from './contextWork/Cartcontext';
import Header from './Header';
import 'react-toastify/dist/ReactToastify.css';
import { toast, ToastContainer } from 'react-toastify';

export default function Wishlist() {
  let {wish,setWish,cart,setCart}=useContext(Maincontext);


  //item remove func
  let Delete=(id)=>{
    let newWishList = wish.filter((v,i)=>id!=i)
    setWish(newWishList)
    toast.warning("Item removed")
  }



  // item move to cart and delete from wishlist func
  let movetocart=(addtocart,old_id)=>{
    setCart([...cart,addtocart])
    let newCart = wish.filter((v,i)=>old_id!=i)
    setWish(newCart)
    toast.success("Item moved to cart")
  }
  return (
    <>
    <ToastContainer/>
    <Header/>
      <h1 className="text-white text-4xl font-serif font-bold p-5 text-center">
        Wishlist
      </h1>
      <div className="container text-white mx-auto">
        <div className="row">
          <div className="col-12">
            <div className="table-responsive wishlist_table ">
              <table
                
                className="border border-white-100 mx-auto p-5"
              >
                <thead className="border border-white ">
                  <tr>
                    <th className="p-5 border">Product Image</th>
                    <th className="p-5 border"> Title</th>
                    <th className="p-5 border">Price</th>
                    <th className="p-5 border">Category</th>
                    <th className="p-5 border">Brand</th>
                    <th className="p-5 border">Quantity</th>
                    <th className="p-5 border ">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {wish.length > 0
                    ? wish.map((v, i) => {
                        return (
                          <tr key={i} className="border border-white-100 p-10">
                            <td className="border p-10">
                              <a href="#">
                                <img
                                  width="80px"
                                  height="80px"
                                  src={v.img}
                                  alt="product1"
                                />
                              </a>
                            </td>
                            <td className="border p-10" data-title="Product">
                              {v.name}
                              <br />
                            </td>
                            <td className="border p-10" data-title="Price">
                              ₹ {v.price}
                            </td>
                            <td className="border p-10" data-title="category">
                              {v.category}
                            </td>
                            <td className="border p-10">{v.brand}</td>
                            <td className="border p-10">{v.quantity}</td>

                            <td className="border p-10 " data-title="Remove">
                              <button
                                onClick={()=>Delete(i)}
                                className="bg-red-600 rounded p-2 me-4"
                              >
                                Remove
                              </button>
                              <button
                                onClick={() => movetocart(v, i)}
                                className="bg-green-600 rounded p-2 "
                              >
                                Move to Cart
                              </button>
                            </td>
                          </tr>
                        );
                      })
                    : "No Data Found"}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
