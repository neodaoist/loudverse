// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Burnable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "./ERC2981/ERC2981PerTokenRoyalties.sol";

////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                        //
//     __        ______    __    __   _______  ____    ____  _______  .______        ______.  _______     //
//    |  |      /  __  \  |  |  |  | |       \ \   \  /   / |_______| |   _  \      /      | |_______|    //
//    |  |     |  |  |  | |  |  |  | |  .--.  | \   \/   /   _______  |  |_)  |    |   (---`  _______     //
//    |  |     |  |  |  | |  |  |  | |  |  |  |  \      /   |_______| |      /      \   \    |_______|    //
//    |  `----.|  `--'  | |  `--'  | |  '--'  |   \    /     _______  |  |\  \---.---)   |    _______     //
//    |_______| \______/   \______/  |_______/     \__/     |_______| | _| `.____|______/    |_______|    //
//                                                                                                        //
//                                                                                                        //
////////////////////////////////////////////////////////////////////////////////////////////////////////////

contract SmartArt is
    ERC721,
    ERC721Enumerable,
    ERC721URIStorage,
    ERC721Burnable,
    Ownable,
    ERC2981PerTokenRoyalties
{
    using Counters for Counters.Counter;

    Counters.Counter private _tokenIdCounter;

    constructor() ERC721("SmartArt", "LOUD") {}

    function tokenURI(uint256 tokenId)
        public
        view
        override(ERC721, ERC721URIStorage)
        returns (string memory)
    {
        return super.tokenURI(tokenId);
    }

    function supportsInterface(bytes4 interfaceId)
        public
        view
        override(ERC721, ERC721Enumerable, ERC2981Base)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }

    /// @notice Mint one token to `to`
    /// @param to the recipient of the token
    /// @param royaltyRecipient the recipient for royalties (if royaltyValue > 0)
    /// @param royaltyValue the royalties asked for (EIP2981)
    /// @param uri URI for token
    function mint(
        address to, // this will be the Creator address
        address royaltyRecipient, // this will be the Slicer address
        uint256 royaltyValue, // this will be 10% so 1000
        string memory uri
    ) external onlyOwner {
        uint256 tokenId = _tokenIdCounter.current();
        _tokenIdCounter.increment();
        _safeMint(to, tokenId, "");
        _setTokenURI(tokenId, uri);

        if (royaltyValue > 0) {
            _setTokenRoyalty(tokenId, royaltyRecipient, royaltyValue);
        }
    }

    function _beforeTokenTransfer(
        address from,
        address to,
        uint256 tokenId
    ) internal override(ERC721, ERC721Enumerable) {
        super._beforeTokenTransfer(from, to, tokenId);
    }

    function _burn(uint256 tokenId)
        internal
        override(ERC721, ERC721URIStorage)
    {
        super._burn(tokenId);
    }
}
