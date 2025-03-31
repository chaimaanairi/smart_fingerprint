/* eslint-disable @next/next/no-img-element */
import type { NextPage } from 'next'
import { Nft } from '../../../types/nftCourse';
import { useOwnedNfts } from '../../hooks/useHooks';
import { useEffect, useState } from 'react';
import { useNetwork } from "../../hooks/useHooks";

// Tabs for navigation (Your Collection is the default tab)
const tabs = [
  { name: 'Your Collection', href: '#', current: true },
]

// Helper function to dynamically join class names
function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

const ProfilePart: NextPage = () => {

  // Fetching the owned NFTs using custom hook
  const { nfts } = useOwnedNfts();
  const [activeNft, setActiveNft] = useState<Nft>();
  const { network } = useNetwork();

  // Setting the first NFT as the active one on load
  useEffect(() => {
    if (nfts.data && nfts.data.length > 0) {
      setActiveNft(nfts.data[0]);
    }
    // Cleanup function to reset active NFT when component is unmounted or data changes
    return () => setActiveNft(undefined)
  }, [nfts.data])

  // If the user is not connected to the right network, display a warning
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
                  {network.isLoading ? 
                    "Loading..." : 
                    `You have to change network and connect to ${network.targetNetwork} to view your profile`
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
      <div className="m-20 h-full flex">
        <div className="flex-1 flex flex-col overflow-hidden">
          <div className="flex-1 flex items-stretch overflow-hidden">
            <main className="flex-1 overflow-y-auto">
              <div className="pt-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex">
                  <h1 className="flex-1 text-2xl font-bold text-gray-900">Your NFT Courses</h1>
                </div>
                
                {/* Navigation Tabs */}
                <div className="mt-3 sm:mt-2">
                  <div className="hidden sm:block">
                    <div className="flex items-center border-b border-gray-200">
                      <nav className="flex-1 -mb-px flex space-x-6 xl:space-x-8" aria-label="Tabs">
                        {tabs.map((tab) => (
                          <a
                            key={tab.name}
                            href={tab.href}
                            aria-current={tab.current ? 'page' : undefined}
                            className={classNames(
                              tab.current
                                ? 'border-green text-green'
                                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300',
                              'whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm'
                            )}
                          >
                            {tab.name}
                          </a>
                        ))}
                      </nav>
                    </div>
                  </div>
                </div>
         
                {/* NFT Course Collection Grid */}
                <section className="mt-8 pb-16" aria-labelledby="gallery-heading">
                  <ul
                    role="list"
                    className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 sm:gap-x-6 md:grid-cols-4 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8"
                  >
                    {/* Loop through owned NFTs and display them */}
                    {(nfts.data as Nft[]).map((nft) => (
                      <li
                        key={nft.tokenId}
                        onClick={() => setActiveNft(nft)} // Set the clicked NFT as the active one
                        className="relative">
                        
                        {/* Displaying NFT image */}
                        <div
                          className={classNames(
                            nft.tokenId === activeNft?.tokenId 
                            ? 'ring-2 ring-offset-2 ring-green' // Highlight the active NFT
                            : 'focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-offset-gray-100 focus-within:ring-green',
                          'group block w-full aspect-w-10 aspect-h-7 rounded-lg bg-gray-100 overflow-hidden'
                        )}>
                          <img
                            src={nft.meta.image}
                            alt=""
                            className={classNames(
                              nft.tokenId === activeNft?.tokenId  ? '' : 'group-hover:opacity-75',
                              'object-cover pointer-events-none'
                            )}
                          />
                          <button type="button" className="absolute inset-0 focus:outline-none">
                            <span className="sr-only">View details for {nft.meta.name}</span>
                          </button>
                        </div>
                        <p className="mt-2 block text-sm font-medium text-gray-900 truncate pointer-events-none">
                          {nft.meta.name}
                        </p>
                      </li>
                    ))}
                  </ul>
                </section>
              </div>
            </main>

            {/* NFT Details Sidebar */}
            <aside className="hidden w-96 bg-white p-8 border-l border-gray-200 overflow-y-auto lg:block">
              { activeNft && (
                <div className="pb-16 space-y-6">
                  <div>
                    {/* NFT Image */}
                    <div className="block w-full aspect-w-10 aspect-h-7 rounded-lg overflow-hidden">
                      <img src={activeNft.meta.image} alt="" className="object-cover" />
                    </div>
                    <div className="mt-4 flex items-start justify-between">
                      <div>
                        <h2 className="text-lg font-medium text-gray-900">
                          <span className="sr-only">Details for </span>
                          {activeNft.meta.name}
                        </h2>
                        <p className="text-sm font-medium text-gray-500">{activeNft.meta.description}</p>
                      </div>
                    </div>
                  </div>
                  
                  {/* Displaying NFT Attributes */}
                  <div>
                    <h3 className="font-medium text-gray-900">Information</h3>
                    <dl className="mt-2 border-t border-b border-gray-200 divide-y divide-gray-200">
                      {activeNft.meta.attributes.map((attr) => (
                        <div key={attr.trait_type} className="py-3 flex justify-between text-sm font-medium">
                          <dt className="text-gray-500">{attr.trait_type}: </dt>
                          <dd className="text-gray-900 text-right">{attr.value}</dd>
                        </div>
                      ))}
                    </dl>
                  </div>

                  {/* Button to List NFT if not already listed */}
                  <div className="flex">
                    <button
                      disabled={activeNft.isListed} // Disable button if NFT is already listed
                      onClick={() => {
                        nfts.listNft(
                          activeNft.tokenId,
                          activeNft.price
                        )
                      }}
                      type="button"
                      className="disabled:text-gray-400 disabled:cursor-not-allowed flex-1 ml-3 bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green"
                    >
                      {activeNft.isListed ? "NFT course is listed" : "List NFT course"}
                    </button>

                    {/* Displaying Price of NFT */}
                    <div className="flex-1 bg-green py-2 ml-3 px-2 rounded-md text-center text-sm font-medium text-white">
                      Price {activeNft.price} ETH
                    </div>
                  </div>
                </div>
              )}
            </aside>
          </div>
        </div>
      </div>
    </>
  )
}

export default ProfilePart
