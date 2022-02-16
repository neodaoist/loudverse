// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

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

contract CrowdCommission is ERC1155, Ownable {
    constructor() ERC1155("") {}

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

    function setURI(string memory newuri) public onlyOwner {
        _setURI(newuri);
    }

    function mintCrowdCommission(
        // args
    ) public onlyOwner {

    }
}
