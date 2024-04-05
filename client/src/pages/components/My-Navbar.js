import React, { useState } from "react";
import Styles from "./homepage1.module.css";
import Link from "next/link";
import Web3modal from 'web3modal'
import { ethers } from "ethers";


export default function Navbar({connect,mintToken,connected}){
    const [webApi,setWebApi]=useState({provider:null,signer:null,contract:null})
    

    return (
        <div>
        <header>
          <nav className="  flex justify-between items-center">
            <Link href="/">
              <button type="button">
                <img className="xs:mt-4  xs:w-16  xs:h-12 xs:ml-5 xs:mr-5 md:scale-100 md:ml-8 w-28 mt-8 h-24 ml-16" src="/logo.jpg" />
              </button>
            </Link>
  
            <ul className=" md:-gap-1 flex justify-center align-center ">
              <li>
                <button
                  type="button"
                  className="xs:scale-50  xs:text-2xl 
                  xs:mt-3 xs:ml-5 xs:m-0 md:ml-5 md:scale-75 md:mt-6 shadow-md mr-10 text-white bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 font-medium rounded-lg text-2xl px-5 py-2.5 text-center mr-12 mb-2"
                onClick={mintToken}>
                  Mint Token
                </button>
              </li>
              <li >
                <button
                  type="button"
                  className="xs:scale-50  xs:text-2xl 
                   xs:mt-2 xs:m-0 xs:px-1 xs:py-5 md:scale-75 md:mt-6 shadow-md mr-10 text-white bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 font-medium rounded-lg text-2xl px-5 py-2.5 text-center mr-12 mb-2"
                onClick={connect}>
                  {
                    connected ? 'Connected' :'Connect Wallet'
                  }
                </button>
              </li>

              <li >
              <Link href="/">
              <button
                type="button"
                className=" xs:scale-50  xs:text-2xl 
                 xs:mt-3 md:scale-75 md:mt-6 shadow-md  mr-10 text-white bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 font-medium rounded-lg text-2xl px-5 py-2.5 text-center mr-8 mb-2"
              >  
                 🏠 Home
              </button>
              </Link>
            </li>
            </ul>
          </nav>
        </header>
  </div>
    )
}