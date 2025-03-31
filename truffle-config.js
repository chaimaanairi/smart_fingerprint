module.exports = {
  // Directory to store the compiled contract artifacts
  contracts_build_directory: "./public/contracts",  // Define the path where compiled contract files will be stored

  networks: {
    // Configuration for the development network
    development: {
      host: "127.0.0.1",    // Localhost address, pointing to the local machine
      port: 7545,           // Port number where Ganache (or your local Ethereum network) is running
      network_id: "*",      // Accept any network ID, useful for local development or testing
    },
  },

  compilers: {
    solc: {
      // Specify the Solidity compiler version to use
      version: "0.8.17"  // Version of Solidity compiler
    }
  }

};
