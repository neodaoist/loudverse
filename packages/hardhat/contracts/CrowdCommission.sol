// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC1155/extensions/ERC1155Burnable.sol";
import "@openzeppelin/contracts/token/ERC1155/extensions/ERC1155Supply.sol";

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

contract CrowdCommission is ERC1155, Ownable, ERC1155Burnable, ERC1155Supply {
    constructor() ERC1155("") {}

    // this info will be stored on nft.storage under /id
    // Creative TODO Should most of this just be metadata ?

    // address public creator;
    // string public title;
    // string public description;
    // string public category; // (Music, Photography, Painting, Digital Art, Animation, Film, Sculpture, Poetry, Theater, Dance)
    // string public genre;
    // string public subgenre;
    // string public deliverableMedium;
    // uint8 public timelineInDays;
    // Financial
    // string public fundingRound;
    // mapping(address => uint256) public crowdCommissioners;
    // uint256 public matchingFunds;
    // uint256 public totalFunds;

    // TODO Add Calls for Collaborators

    function setURI(string memory newuri) public onlyOwner {
        _setURI(newuri);
    }

    function mintCrowdCommissions(
        address[] memory funders,
        uint256 id,
        bytes memory data
    ) public onlyOwner {
        for (uint256 i = 1; i < funders.length; i++) {
            _mint(funders[i], id, 1, data);
        }
    }

    function mint(
        address account,
        uint256 id,
        uint256 amount,
        bytes memory data
    ) public onlyOwner {
        _mint(account, id, amount, data);
    }

    function mintBatch(
        address to,
        uint256[] memory ids,
        uint256[] memory amounts,
        bytes memory data
    ) public onlyOwner {
        _mintBatch(to, ids, amounts, data);
    }

    // The following functions are overrides required by Solidity.

    function _beforeTokenTransfer(
        address operator,
        address from,
        address to,
        uint256[] memory ids,
        uint256[] memory amounts,
        bytes memory data
    ) internal override(ERC1155, ERC1155Supply) {
        super._beforeTokenTransfer(operator, from, to, ids, amounts, data);
    }
}
