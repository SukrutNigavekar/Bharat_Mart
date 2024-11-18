import { useContext, useEffect } from "react";
import "./App.css";
import axios from "axios";
import { useState } from "react";
import Header from "./Header";
import { Link } from "react-router-dom";
import { Maincontext } from "./contextWork/Cartcontext";

function App() {
  
  const [allCat, setCat] = useState([]);
  const [allCard, setCard] = useState([]);

  let {wish,setWish} = useContext(Maincontext)
  // console.log("This is app wish :"+wish)

  function displayCat() {
    axios
      .get("https://dummyjson.com/products/categories")
      .then((ress) => {
        setCat(ress.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function displayCard(singleCatItem) {
    let catApi;
    if (singleCatItem == undefined) {
      catApi = "https://dummyjson.com/products?limit=28";
    } else {
      catApi = `https://dummyjson.com/products/category/${singleCatItem}`;
    }
    axios
      .get(catApi)
      .then((ress) => {
        setCard(ress.data.products);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function singleCat(singleCatItem) {
    displayCard(singleCatItem);
  }

  useEffect(() => {
    displayCat();
    displayCard();
  }, []);

  return (
    <>
      <Header />
      <div className="w-[80%]  mx-auto">
        <div className="grid grid-cols-[20%_auto] gap-2">
          <div className="">
            <h1 className="text-[25px] text-center my-[10px]">Category</h1>
            {allCat.map((v, i) => {
              return (
                <div key={i} className=" text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                  <a
                    onClick={() => singleCat(v.slug)}
                    className="block w-full px-4 py-2 border-b border-gray-200 cursor-pointer hover:bg-gray-100 hover:text-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:border-gray-600 dark:hover:bg-gray-600 dark:hover:text-white dark:focus:ring-gray-500 dark:focus:text-white"
                  >
                    {v.name}
                  </a>
                </div>
              );
            })}
          </div>
          <div className="">
            <h1 className="text-[25px] text-center my-[10px]">Products</h1>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-2">
              {allCard.map((v, i) => {
                return (
                  
                    <Link to={`/product/${v.id}`}
                      key={i}
                      className=" bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
                    >
                      <div>
                        <img
                          className="rounded-t-lg"
                          src={v.thumbnail}
                          alt=""
                        />
                      </div>
                      <div className="p-5">
                        <div>
                          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                            {v.title}
                          </h5>
                        </div>
                        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                          Price : {v.price.toFixed(1)}&#x20b9;
                        </p>
                        <div className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                          id : {v.id}
                        </div>
                      </div>
                    </Link>
                  
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
