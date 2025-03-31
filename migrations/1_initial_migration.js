// Import the Migrations contract. This is a default contract provided by Truffle to handle migrations.
const Migrations = artifacts.require("Migrations");

// Export a function that will deploy the Migrations contract to the blockchain.
module.exports = function (deployer) {
  // Deploy the Migrations contract. The deployer object handles the deployment process.
  deployer.deploy(Migrations);
};
