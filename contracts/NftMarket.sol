// SPDX-License-Identifier: MIT
// License declaration, specifies that the contract is open-source and follows the MIT License.

pragma solidity >=0.4.22 <0.9.0;
// Specifies that the contract uses Solidity versions between 0.4.22 and 0.9.0.

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
// Importing the ERC721 standard for NFTs, including the ability to store a URI for each token.
import "@openzeppelin/contracts/utils/Counters.sol";
// Importing the Counters library to keep track of token IDs and listed items.
import "@openzeppelin/contracts/access/Ownable.sol";
// Importing the Ownable contract which allows us to restrict access to certain functions to only the owner of the contract.

contract NftMarket is ERC721URIStorage, Ownable {
  using Counters for Counters.Counter;

  // Structure to represent each NFT item in the market
  struct NftItem {
    uint tokenId;      // The unique ID of the NFT
    uint price;        // The price of the NFT
    address creator;   // The creator (minter) of the NFT
    bool isListed;     // Boolean flag to check if the NFT is listed for sale
  }

  uint public listingPrice = 0.025 ether;
  // Default price to list an NFT for sale (0.025 Ether)

  Counters.Counter private _listedItems;
  Counters.Counter private _tokenIds;
  // Counters to track the total number of listed items and total number of tokens minted.

  mapping(string => bool) private _usedTokenURIs;
  // Mapping to check if a token URI has already been used to prevent duplicates.

  mapping(uint => NftItem) private _idToNftItem;
  // Mapping from token ID to NFT item details.

  mapping(address => mapping(uint => uint)) private _ownedTokens;
  // Mapping to track tokens owned by an address (owner -> index -> tokenId).

  mapping(uint => uint) private _idToOwnedIndex;
  // Mapping to track the index of a specific tokenId in the owner's list of tokens.

  uint256[] private _allNfts;
  mapping(uint => uint) private _idToNftIndex;
  // _allNfts tracks all minted NFTs and their indices.

  event NftItemCreated(
    uint tokenId,
    uint price,
    address creator,
    bool isListed
  );
  // Event emitted when a new NFT item is created.

  constructor() ERC721("CreaturesNFT", "CNFT") {}
  // Constructor that sets the name and symbol of the NFT collection.

  // Function to set the listing price of NFTs (only accessible to the contract owner).
  function setListingPrice(uint newPrice) external onlyOwner {
    require(newPrice > 0, "Price must be at least 1 wei");
    listingPrice = newPrice;
  }

  // Function to fetch the details of an NFT item by its tokenId.
  function getNftItem(uint tokenId) public view returns (NftItem memory) {
    return _idToNftItem[tokenId];
  }

  // Function to get the count of listed items in the marketplace.
  function listedItemsCount() public view returns (uint) {
    return _listedItems.current();
  }

  // Function to check if a token URI has already been used.
  function tokenURIExists(string memory tokenURI) public view returns (bool) {
    return _usedTokenURIs[tokenURI] == true;
  }

  // Function to get the total supply of NFTs in the market.
  function totalSupply() public view returns (uint) {
    return _allNfts.length;
  }

  // Function to fetch a tokenId by its index in the total supply array.
  function tokenByIndex(uint index) public view returns (uint) {
    require(index < totalSupply(), "Index out of bounds");
    return _allNfts[index];
  }

  // Function to get the tokenId of an NFT owned by a specific address at a given index.
  function tokenOfOwnerByIndex(address owner, uint index) public view returns (uint) {
    require(index < ERC721.balanceOf(owner), "Index out of bounds");
    return _ownedTokens[owner][index];
  }

  // Function to get all NFTs that are currently listed for sale.
  function getAllNftsOnSale() public view returns (NftItem[] memory) {
    uint allItemsCounts = totalSupply();
    uint currentIndex = 0;
    NftItem[] memory items = new NftItem[](_listedItems.current());

    for (uint i = 0; i < allItemsCounts; i++) {
      uint tokenId = tokenByIndex(i);
      NftItem storage item = _idToNftItem[tokenId];

      if (item.isListed == true) {
        items[currentIndex] = item;
        currentIndex += 1;
      }
    }

    return items;
  }

  // Function to get all NFTs owned by the caller.
  function getOwnedNfts() public view returns (NftItem[] memory) {
    uint ownedItemsCount = ERC721.balanceOf(msg.sender);
    NftItem[] memory items = new NftItem[](ownedItemsCount);

    for (uint i = 0; i < ownedItemsCount; i++) {
      uint tokenId = tokenOfOwnerByIndex(msg.sender, i);
      NftItem storage item = _idToNftItem[tokenId];
      items[i] = item;
    }

    return items;
  }

  // Function to mint a new NFT and list it for sale.
  function mintToken(string memory tokenURI, uint price) public payable returns (uint) {
    require(!tokenURIExists(tokenURI), "Token URI already exists");
    require(msg.value == listingPrice, "Price must be equal to listing price");

    _tokenIds.increment();
    _listedItems.increment();

    uint newTokenId = _tokenIds.current();

    _safeMint(msg.sender, newTokenId);
    _setTokenURI(newTokenId, tokenURI);
    _createNftItem(newTokenId, price);
    _usedTokenURIs[tokenURI] = true;

    return newTokenId;
  }

  // Function to buy an NFT that is listed for sale.
  function buyNft(uint tokenId) public payable {
    uint price = _idToNftItem[tokenId].price;
    address owner = ERC721.ownerOf(tokenId);

    require(msg.sender != owner, "You already own this NFT");
    require(msg.value == price, "Please submit the asking price");

    _idToNftItem[tokenId].isListed = false;
    _listedItems.decrement();

    _transfer(owner, msg.sender, tokenId);
    payable(owner).transfer(msg.value);
  }

  // Function to place an NFT on sale with a new price.
  function placeNftOnSale(uint tokenId, uint newPrice) public payable {
    require(ERC721.ownerOf(tokenId) == msg.sender, "You are not owner of this nft");
    require(_idToNftItem[tokenId].isListed == false, "Item is already on sale");
    require(msg.value == listingPrice, "Price must be equal to listing price");

    _idToNftItem[tokenId].isListed = true;
    _idToNftItem[tokenId].price = newPrice;
    _listedItems.increment();
  }

  // Private helper function to create an NFT item when minting.
  function _createNftItem(uint tokenId, uint price) private {
    require(price > 0, "Price must be at least 1 wei");

    _idToNftItem[tokenId] = NftItem(
      tokenId,
      price,
      msg.sender,
      true
    );

    emit NftItemCreated(tokenId, price, msg.sender, true);
  }

  // Overriding the _beforeTokenTransfer function to manage token ownership correctly.
  function _beforeTokenTransfer(address from, address to, uint tokenId, uint batchSize) internal virtual override {
    super._beforeTokenTransfer(from, to, tokenId, batchSize);

    if (from == address(0)) {
      _addTokenToAllTokensEnumeration(tokenId);
    } else if (from != to) {
      _removeTokenFromOwnerEnumeration(from, tokenId);
    }

    if (to == address(0)) {
      _removeTokenFromAllTokensEnumeration(tokenId);
    } else if (to != from) {
      _addTokenToOwnerEnumeration(to, tokenId);
    }
  }

  // Private helper function to add a token to the global tokens array.
  function _addTokenToAllTokensEnumeration(uint tokenId) private {
    _idToNftIndex[tokenId] = _allNfts.length;
    _allNfts.push(tokenId);
  }

  // Private helper function to add a token to an owner's enumeration.
  function _addTokenToOwnerEnumeration(address to, uint tokenId) private {
    uint length = ERC721.balanceOf(to);
    _ownedTokens[to][length] = tokenId;
    _idToOwnedIndex[tokenId] = length;
  }

  // Private helper function to remove a token from an owner's enumeration.
  function _removeTokenFromOwnerEnumeration(address from, uint tokenId) private {
    uint lastTokenIndex = ERC721.balanceOf(from) - 1;
    uint tokenIndex = _idToOwnedIndex[tokenId];

    if (tokenIndex != lastTokenIndex) {
      uint lastTokenId = _ownedTokens[from][lastTokenIndex];

      _ownedTokens[from][tokenIndex] = lastTokenId;
      _idToOwnedIndex[lastTokenId] = tokenIndex;
    }

    delete _idToOwnedIndex[tokenId];
    delete _ownedTokens[from][lastTokenIndex];
  }

  // Private helper function to remove a token from the global tokens array.
  function _removeTokenFromAllTokensEnumeration(uint tokenId) private {
    uint lastTokenIndex = _allNfts.length - 1;
    uint tokenIndex = _idToNftIndex[tokenId];
    uint lastTokenId = _allNfts[lastTokenIndex];

    _allNfts[tokenIndex] = lastTokenId;
    _idToNftIndex[lastTokenId] = tokenIndex;

    delete _idToNftIndex[tokenId];
    _allNfts.pop();
  }
}
