import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Detailpage from "./Detailpage.jsx";
import Cartcontext from "./contextWork/Cartcontext.jsx";
import Wishlist from "./Wishlist.jsx";
import AddtoCart from "./AddtoCart.jsx";
import Orderplaced from "./Orderplaced.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/product/:id",
    element: <Detailpage />,
  },
  {
    path: "/wishlist",
    element: <Wishlist />,
  },
  {
    path: "/addtocart",
    element: <AddtoCart />,
  },
  {
    path: "/orderplaced",
    element: <Orderplaced />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Cartcontext>
      <RouterProvider router={router} />
    </Cartcontext>
  </React.StrictMode>
);
