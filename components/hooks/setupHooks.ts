import { Web3Dependencies } from "../../types/hooks"; // Import the Web3Dependencies type from the hooks module
import { hookFactory as createAccountHook, UseAccountHook } from "./useAccount"; // Import the account hook factory and its type
import { hookFactory as createNetworkHook, UseNetworkHook } from "./useNetwork"; // Import the network hook factory and its type
import { hookFactory as createListedNftsHook, UseListedNftsHook } from "./useListedNfts"; // Import the listed NFTs hook factory and its type
import { hookFactory as createOwnedNftsHook, UseOwnedNftsHook } from "./useOwnedNfts"; // Import the owned NFTs hook factory and its type

// Define the Web3Hooks type, which includes all available Web3-related hooks
export type Web3Hooks = {
  useAccount: UseAccountHook; // Hook for handling user account-related functionality
  useNetwork: UseNetworkHook; // Hook for managing network-related information
  useListedNfts: UseListedNftsHook; // Hook for fetching listed NFTs
  useOwnedNfts: UseOwnedNftsHook; // Hook for retrieving NFTs owned by the user
}

// Define the SetupHooks type, which is a function that takes dependencies and returns Web3Hooks
export type SetupHooks = {
  (d: Web3Dependencies): Web3Hooks // Function signature for setting up hooks with dependencies
}

// setupHooks function initializes all Web3-related hooks with the given dependencies
export const setupHooks: SetupHooks = (deps) => {
  return {
    useAccount: createAccountHook(deps), // Create and return the account hook with dependencies
    useNetwork: createNetworkHook(deps), // Create and return the network hook with dependencies
    useListedNfts: createListedNftsHook(deps), // Create and return the listed NFTs hook with dependencies
    useOwnedNfts: createOwnedNftsHook(deps), // Create and return the owned NFTs hook with dependencies
  }
}
