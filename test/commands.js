
const instance = await NftMarket.deployed();

// price in wei 
// 0.5 ether = 500000000000000000 wei
// 0.6 ether = 600000000000000000 wei

// listing price is 2.5 ether = 25000000000000000 wei


instance.mintToken("https://gateway.pinata.cloud/ipfs/QmNzgSu9T3euR1SKhNfaZgDzTnFXZm7JoWYnrisAFDWpT3","500000000000000000", {value: "25000000000000000",from: accounts[0]})

instance.mintToken("https://gateway.pinata.cloud/ipfs/QmdHm7oWwaAFm9ErPXEx8DDYe6wNH9CCQckQwe29LKPZbz","600000000000000000", {value: "25000000000000000",from: accounts[0]})

instance.mintToken("https://gateway.pinata.cloud/ipfs/QmUA7vSr2sCztJJ838pEjRB6wEz8N9o9RrSqmTJzjCc3km","600000000000000000", {value: "25000000000000000",from: accounts[0]})

instance.mintToken("https://gateway.pinata.cloud/ipfs/QmTzPY6zUuEEGMPDhg7dHEUyFPZhBLxTkeYAMF1mzbu3uD","600000000000000000", {value: "60000000000000000",from: accounts[0]})


