// SPDX-License-Identifier: MIT
pragma solidity ^0.8.2;

import {GrantStorage} from "./GrantStorage.sol";

contract GrantLogic is GrantStorage {
    //vars

    //events

    event ContributionReceivedETH(
        address indexed donator,
        uint256 indexed amount
    );

    //StartStream
    //ClaimFunds
    //DeleteGrant
    //ChangeMinimum

    // Plain ETH transfers.
    receive() external payable {
        emit ContributionReceivedETH(msg.sender, msg.value);
    }

    // function ContributeERC20()
}
