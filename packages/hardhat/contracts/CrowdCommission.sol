// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "./ERC1155/NonTransferrableERC1155.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "./ERC1155/extensions/ERC1155Burnable.sol";
import "./ERC1155/extensions/ERC1155Supply.sol";

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

contract CrowdCommission is
    NonTransferrableERC1155,
    Ownable,
    ERC1155Burnable,
    ERC1155Supply
{
    string public name = "Crowd-Commission";
    string public symbol = "CROWD";

    constructor() NonTransferrableERC1155("") {}

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

    function mintSingle(
        address account,
        uint256 id,
        uint256 amount,
        bytes memory data
    ) public onlyOwner {
        _mint(account, id, amount, data);
    }

    function mintBatchToSingleUser(
        address to,
        uint256[] memory ids,
        uint256[] memory amounts,
        bytes memory data
    ) public onlyOwner {
        _mintBatch(to, ids, amounts, data);
    }

    function _beforeTokenTransfer(
        address operator,
        address from,
        address to,
        uint256[] memory ids,
        uint256[] memory amounts,
        bytes memory data
    ) internal override(NonTransferrableERC1155, ERC1155Supply) {
        super._beforeTokenTransfer(operator, from, to, ids, amounts, data);
    }
}
