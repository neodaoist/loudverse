// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Burnable.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

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

contract SmartArt is ERC721, ERC721Burnable, AccessControl {
    using Counters for Counters.Counter;

    bytes32 public constant MINTER_ROLE = keccak256("MINTER_ROLE");
    Counters.Counter private _tokenIdCounter;

    constructor() ERC721("SmartArt", "LOUD") {
        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
        _grantRole(MINTER_ROLE, msg.sender);
    }

    function safeMint(address to) public onlyRole(MINTER_ROLE) {
        uint256 tokenId = _tokenIdCounter.current();
        _tokenIdCounter.increment();
        _safeMint(to, tokenId);
    }

    // The following functions are overrides required by Solidity.

    function supportsInterface(bytes4 interfaceId)
        public
        view
        override(ERC721, AccessControl)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }
}
