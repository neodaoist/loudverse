// SPDX-License-Identifier: MIT
pragma solidity ^0.8.2;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
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

contract CrowdCommission is ERC721, Ownable {
    using Counters for Counters.Counter;

    bytes32 public constant MINTER_ROLE = keccak256("MINTER_ROLE");
    Counters.Counter private _tokenIdCounter;

    // Creative TODO Should most of this just be metadata ?
    address public creator;
    string public title;
    string public description;
    string public category; // (Music, Photography, Painting, Digital Art, Animation, Film, Sculpture, Poetry, Theater, Dance)
    string public genre;
    string public subgenre;
    string public deliverableMedium;
    uint8 public timelineInDays;

    // TODO Add Calls for Collaborators

    // Financial
    string public fundingRound;
    mapping(address => uint256) public crowdCommissioners;
    uint256 public matchingFunds;
    uint256 public totalFunds;

    constructor() ERC721("CrowdCommission", "LOUD") {
        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
        _grantRole(MINTER_ROLE, msg.sender);
    }

    function mintCrowdCommission(
        // args
    ) public onlyOwner {

    }

    function safeMint(address to) public onlyOwner {
        uint256 tokenId = _tokenIdCounter.current();
        _tokenIdCounter.increment();
        _safeMint(to, tokenId);
    }
}
