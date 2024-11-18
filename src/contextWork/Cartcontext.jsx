import React, { createContext, useState } from 'react'

export let Maincontext = createContext();

export default function Cartcontext(  {children}) {

  let [wish,setWish]=useState([]);
  let [cart,setCart]=useState([]);

  let obj = {wish,setWish,cart,setCart}
  return (
    <Maincontext.Provider value={obj}>
      {children}
    </Maincontext.Provider>
  )
}
