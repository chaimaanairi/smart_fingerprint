/* eslint-disable @next/next/no-img-element */
import React from "react";
import type { NextPage } from 'next';
import NftList from "../nftVideo/nftList"
import { useNetwork } from "../../hooks/useHooks";
import WalletBar from "../../UI/web3/walletbar";

const MarketPlacePart: NextPage = () => {
  
  const { network } = useNetwork();

  return (
    <div className="mx-auto px-4">

      <div className=" my-20 max-w-7xl mx-auto px-4">
        <WalletBar />
      </div>

    <div className= "mt-10 bg-Lightorange pt-16 pb-20 px-4 sm:px-6 lg:pt-10 lg:pb-12 lg:px-8 ">
      <div className=" inset-0">
        <div className="bg-white h-1/3 sm:h-2/3" />
      </div>

        <div className="text-center">
          <h2 className="text-3xl tracking-tight font-extrabold text-gray-900 sm:text-4xl">Purchase your nft Course</h2>
          <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-500 sm:mt-4">
          Put your NFT course on the market, share your knowledge and get unlimited ownership   
          </p>
        </div>
    </div>

    { network.isConnectedToNetwork ?
            <NftList /> :
            <div className="rounded-md bg-red-100 p-4 mt-10">
              <div className="flex">
                <div className="flex-shrink-0">
                 {/* exclamation */} <div className="h-5 w-5 text-yellow-400" aria-hidden="true" />
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-black">Pay attention</h3>
                  <div className="mt-2 text-sm text-gray-600">
                    <p>
                    { network.isLoading ?
                      "Loading..." :
                      `You have to change network and connect to ${network.targetNetwork} to purchase NFT courses.`
                    }
                    </p>
                  </div>
                </div>
              </div>
            </div>
          }

</div>
  );
}


export default MarketPlacePart;