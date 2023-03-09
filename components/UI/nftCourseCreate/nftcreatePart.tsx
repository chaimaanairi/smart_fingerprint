/* eslint-disable @next/next/no-img-element */

import type { NextPage } from 'next'
import { ChangeEvent, useState } from 'react';
import { Switch } from '@headlessui/react'
import Link from 'next/link'
import ActiveLink from '../link'
import { NftMeta , PinataRes} from '../../../types/nftCourse';
import axios from 'axios';
import {useWeb3} from '../../web3Provider/web3Provider'
import { ethers } from 'ethers';
import { toast } from "react-toastify";
import { useNetwork } from "../../hooks/useHooks";

const navigation = [
  { name: "Your profile", href: "/ProfilePage", current: false },
];

const ALLOWED_FIELDS = ["name", "description", "image", "attributes"];

const NftCreatePart: NextPage = () => {
  const {ethereum, contract} = useWeb3();
  const {network} = useNetwork();
  const [nftURI, setNftURI] = useState("");
  const [price, setPrice] = useState("");
  const [hasURI, setHasURI] = useState(false);
  const [nftMeta, setNftMeta] = useState<NftMeta>({
    name: "",
    description: "",
    image: "",
    attributes: [
      {trait_type: "Nft course type", value: "-"},
      {trait_type: "Owner name", value: "-"},
    ]
  });

  const getSignedData = async () => {
    const messageToSign = await axios.get("/api/verify");
    const accounts = await ethereum?.request({method: "eth_requestAccounts"}) as string[];
    const account = accounts[0];

    const signedData = await ethereum?.request({
      method: "personal_sign",
      params: [JSON.stringify(messageToSign.data), account, messageToSign.data.id]
    })

    return {signedData, account};
  }

  const handleImage = async (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) {
      console.error("Select a file");
      return;
    }

    const file = e.target.files[0];
    const buffer = await file.arrayBuffer();
    const bytes = new Uint8Array(buffer);
    
    try {
      const {signedData, account} = await getSignedData();
      const promise = axios.post("/api/verify-image", {
        address: account,
        signature: signedData,
        bytes,
        contentType: file.type,
        fileName: file.name.replace(/\.[^/.]+$/, "")
      });

      const res = await toast.promise(
        promise, {
          pending: "Uploading nft course",
          success: "nft course uploaded",
          error: "nft cousrse upload error"
        }
      )

      const data = res.data as PinataRes;

      setNftMeta({
        ...nftMeta,
        image: `${process.env.NEXT_PUBLIC_PINATA_DOMAIN}/ipfs/${data.IpfsHash}`
      });
    } catch(e: any) {
      console.error(e.message);
    }
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNftMeta({...nftMeta, [name]: value});
  }

  const handleAttributeChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const attributeIdx = nftMeta.attributes.findIndex(attr => attr.trait_type === name);

    nftMeta.attributes[attributeIdx].value = value;
    setNftMeta({
      ...nftMeta,
      attributes: nftMeta.attributes
    })
  }

  const uploadMetadata = async () => {
    try {
      const {signedData, account} = await getSignedData();

      const promise = axios.post("/api/verify", {
        address: account,
        signature: signedData,
        nft: nftMeta
      })

      const res = await toast.promise(
        promise, {
          pending: "Uploading metadata",
          success: "Metadata uploaded",
          error: "Metadata upload error"
        }
      )

      const data = res.data as PinataRes;
      setNftURI(`${process.env.NEXT_PUBLIC_PINATA_DOMAIN}/ipfs/${data.IpfsHash}`);
    } catch (e: any) {
      console.error(e.message);
    }
  }

  const createNft = async () => {
    try {
      const nftRes = await axios.get(nftURI);
      const content = nftRes.data;

      Object.keys(content).forEach(key => {
        if (!ALLOWED_FIELDS.includes(key)) {
          throw new Error("Invalid Json structure");
        }
      })

      const tx = await contract?.mintToken(
        nftURI,
        ethers.utils.parseEther(price), {
          value: ethers.utils.parseEther(0.025.toString())
        }
      );
      
      await toast.promise(
        tx!.wait(), {
          pending: "Minting Nft Token",
          success: "Nft has ben created",
          error: "Minting error"
        }
      );
    } catch(e: any) {
      console.error(e.message);
    }
  }

  if (!network.isConnectedToNetwork) {
    return (
      <>
        <div className="rounded-md bg-red-100 p-4 mt-10">
          <div className="flex">
            <div className="flex-shrink-0">
              <div className="h-5 w-5 text-red-400" aria-hidden="true" />
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-bold text-black">Pay attention</h3>
              <div className="mt-2 text-sm text-gray-600">
                <p>
                { network.isLoading ?
                  "Loading..." :
                  `You have to change network and connect to ${network.targetNetwork} to create your nft course`
                }
                </p>
              </div>
            </div>
          </div>
        </div>
      </>
    )
  }

  return (
    <>
       <div>
        <div className="">
          <div className="">
        { !nftURI &&
            <div className="mx-20  flex">
              <div className="mx-2 my-10 font-bold underline">Switch up if you have metadata already?</div>
              <Switch
                checked={hasURI}
                onChange={() => setHasURI(!hasURI)}
                className={`${hasURI ? 'bg-green' : 'bg-gray-600'}
                my-10 relative inline-flex flex-shrink-0 h-[28px] w-[64px] border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus-visible:ring-2  focus-visible:ring-white focus-visible:ring-opacity-75`}
              >
                <span className="sr-only">Use setting</span>
                <span
                  aria-hidden="true"
                  className={`${hasURI ? 'translate-x-9' : 'translate-x-0'}
                    pointer-events-none inline-block h-[24px] w-[24px] rounded-full bg-white shadow-lg transform ring-0 transition ease-in-out duration-200`}
                />
              </Switch>        
            </div>
          }
          </div>

          <div className="">
            {navigation.map((item) => (
              <ActiveLink
                key={item.name}
                href={item.href}
                activeclass="bg-Lightorange text-black"
              >
                <button 
                className="mx-20 text-black bg-Lightorange font-semibold rounded-full px-10 py-2 hover:bg-orangeHover hover:shadow-lg hover:scale-105"
                aria-current={item.current ? 'page' : undefined}
                >                                
                {item.name}
              </button>
              </ActiveLink>
            ))}
        </div>
       
        { (nftURI || hasURI) ?
          <div className="my-20 mx-10 md:grid md:grid-cols-3 md:gap-6">
          <div className="md:col-span-1">
            <div className="px-4 sm:px-0">
              <h3 className="text-lg font-bold leading-6 text-gray-900">List NFT</h3>
              <p className="mt-1 text-sm text-gray-600">
                This information will be displayed publicly so be careful what you share.
              </p>
            </div>
          </div>
          <div className=" my-10 md:mt-0 md:col-span-2">
            <form>
              <div className="shadow sm:rounded-md sm:overflow-hidden">
                { hasURI &&
                  <div className="bg-Lightorange px-4 py-5 space-y-6 sm:p-6">
                    <div>
                      <label htmlFor="uri" className="my-2 block text-sm font-bold text-gray-700">
                        URI Link
                      </label>
                      <div className="mt-1 flex rounded-md shadow-sm">
                        <input
                          onChange={(e) => setNftURI(e.target.value)}
                          type="text"
                          name="uri"
                          id="uri"
                          className="p-2 rounded focus:ring-green focus:border-green flex-1 block w-full rounded-r-md sm:text-sm border-gray-300"
                          placeholder="http://link.com/data.json"
                        />
                      </div>
                    </div>
                  </div>
                  }
                   { nftURI &&
                    <div className='mb-4 p-4'>
                      <div className=" font-bold">Your metadata: </div>
                      <div>
                        <Link legacyBehavior href={nftURI}>
                          <a className="underline text-green">
                            {nftURI}
                          </a>
                        </Link>
                      </div>
                    </div>
                  }
                  <div className="px-4 py-5 bg-Lightorange space-y-6 sm:p-6">
                    <div>
                      <label htmlFor="price" className="my-2 block text-sm font-bold text-gray-700">
                        Price (ETH)
                      </label>
                      <div className=" mt-1 flex rounded-md shadow-sm">
                        <input
                         onChange={(e) => setPrice(e.target.value)}
                         value={price}
                          type="number"
                          name="price"
                          id="price"
                          className="py-1 px-2 rounded focus:ring-green focus:border-green flex-1 block w-full rounded-r-md sm:text-sm border-gray-300"
                          placeholder="0.8"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="px-4 py-3 bg-Lightorange text-right sm:px-6">
                    <button
                      onClick={createNft}
                      type="button"
                      className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green hover:bg-greenHover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green"
                    >
                      List
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        :
        <div className="m-10 md:grid md:grid-cols-3 md:gap-6">
          <div className="my-10 md:col-span-1">
            <div className="px-4 sm:px-0">
              <h3 className="text-lg font-bold leading-6 text-gray-900">Create your own NFT course </h3>
              <p className="mt-1 text-sm text-gray-600">
              This information will be displayed publicly, so be careful what you share.
              </p>
            </div>
          </div>
          <div className=" mt-5 md:mt-0 md:col-span-2">
            <form>
              <div className="shadow sm:rounded-md sm:overflow-hidden">
                <div className="bg-Lightorange  px-4 py-5 space-y-6 sm:p-6">
                  <div>
                    <label htmlFor="name" className="py-2 block text-sm font-bold text-gray-700">
                      Course Name
                    </label>
                    <div className="mt-1 flex rounded-md shadow-sm">
                      <input
                      value={nftMeta.name}
                      onChange={handleChange}
                        type="text"
                        name="name"
                        id="name"
                        className="p-3 rounded focus:ring-green focus:border-green flex-1 block w-full rounded-r-md sm:text-sm border-gray-300"
                        placeholder="My NFT course"
                      />
                    </div>
                  </div>
                  <div>
                  <label htmlFor="description" className="py-2 block text-sm font-bold text-gray-700">
                      Course Description
                    </label>
                    <div className="mt-1">
                      <textarea
                      value={nftMeta.description}
                      onChange={handleChange}
                        id="description"
                        name="description"
                        rows={3}
                        className="p-3 shadow-sm focus:ring-green focus:border-green mt-1 block w-full sm:text-sm border border-gray-300 rounded-md"
                        placeholder="Some nft course description..."
                      />
                    </div>
                    <p className="mt-2 text-sm text-gray-500">
                      Brief description of your NFT course
                    </p>
                  </div>
                  {/* Has Image? */}
                  { nftMeta.image ?
                    <img src={nftMeta.image} alt="" className="h-40" /> :
                    <div>
                    <label className="py-2 block text-sm font-bold text-gray-700">Your Nft Course</label>
                    <div className="bg-white mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                      <div className="space-y-1 text-center">
                        <svg
                          className="p-3 rounded mx-auto h-12 w-12 text-gray-400"
                          stroke="currentColor"
                          fill="none"
                          viewBox="0 0 48 48"
                          aria-hidden="true"
                        >
                          <path
                            d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                            strokeWidth={2}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                        <div className="flex text-sm text-gray-600">
                          <label
                            htmlFor="file-upload"
                            className="relative cursor-pointer bg-white rounded-md font-medium text-green hover:text-greenHover focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-green"
                          >
                            <span>Upload a file</span>
                            <input
                            onChange={handleImage}
                              id="file-upload"
                              name="file-upload"
                              type="file"
                              accept='/*'
                              className="sr-only"
                            />
                          </label>
                          <p className="pl-1">or drag and drop</p>
                        </div>
                        <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                        <p className="text-xs text-gray-500">MP4 up to 100MB</p>
                      </div>
                    </div>
                  </div>
                  }
                  <div className="grid grid-cols-6 gap-6">
                  { nftMeta.attributes.map(attribute =>
                      <div key={attribute.trait_type} className="col-span-6 sm:col-span-6 lg:col-span-2">
                        <label htmlFor={attribute.trait_type} className="block text-sm font-medium text-gray-700">
                          {attribute.trait_type}
                        </label>
                        <input
                          onChange={handleAttributeChange}
                          value={attribute.value}
                          type="text"
                          name={attribute.trait_type}
                          id={attribute.trait_type}
                          className="p-1 mt-1 focus:ring-green focus:border-green block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                        />
                      </div>
                    )}
                  </div>
                  <p className="text-sm !mt-1 text-gray-400 ">
                    Owner name is optional
                  </p>
                  <p className="text-sm !mt-3 text-gray-500">
                    Choose your Nft course attributes
                  </p>
                </div>
                <div className="px-4 py-3 bg-Lightorange text-right sm:px-6">
                  <button
                    onClick={uploadMetadata}
                    type="button"
                    className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green hover:bg-greenHover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green"
                  >
                    List 
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
        }
      </div>
      </div>
    </>
  )
}

export default NftCreatePart;
