// Importing the MetaMask provider for interaction with the MetaMask wallet
import { MetaMaskInpageProvider } from "@metamask/providers";
// Importing required types from ethers.js library for smart contract interaction and Web3 provider
import { Contract, providers } from "ethers";
// Importing SWRResponse type from swr for data fetching
import { SWRResponse } from "swr";
// Importing the custom NftMarketContract type which is likely a representation of the smart contract
import { NftMarketContract } from "./nftMarketContract";

// Type definition for Web3 dependencies used across the application
export type Web3Dependencies = {
  // A Web3 provider that allows interaction with Ethereum blockchain
  provider: providers.Web3Provider;
  // The smart contract instance of NftMarket
  contract: NftMarketContract;
  // MetaMask extension provider for Ethereum interaction
  ethereum: MetaMaskInpageProvider;
  // A boolean flag indicating whether the data is still loading
  isLoading: boolean;
}

// Generic factory type for creating a hook that interacts with Crypto (blockchain) data
export type CryptoHookFactory<D = any, R = any, P = any> = {
  // This function takes Web3Dependencies as a parameter and returns a hook for interacting with the data
  (d: Partial<Web3Dependencies>): CryptoHandlerHook<D, R, P>
}

// Type definition for a hook that handles crypto data fetching and interaction
export type CryptoHandlerHook<D = any, R = any, P = any> = (params?: P) => CryptoSWRResponse<D, R>

// Type definition for SWR response that may have additional data or metadata in R
export type CryptoSWRResponse<D = any, R = any> = SWRResponse<D> & R;

// The commented-out line was an alternative version of the CryptoHookFactory that didn't include the R type
// export type CryptoHookFactory<D = any, P = any> = {
//   (d: Partial<Web3Dependencies>): (params: P) => SWRResponse<D>
// }
