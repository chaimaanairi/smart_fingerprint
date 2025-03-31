// Import the NftMarket contract. This is the smart contract for the NFT marketplace.
const NftMarket = artifacts.require("NftMarket");

// Export a function to handle the deployment of the NftMarket contract.
module.exports = function (deployer) {
  // Deploy the NftMarket contract to the blockchain.
  deployer.deploy(NftMarket);
};
