// SPDX-License-Identifier: MIT
pragma solidity ^0.8.2;

import {CallForFundsStorage} from "./CallForFundsStorage.sol";

contract CallForFundsLogic is CallForFundsStorage {
    //vars

    //events

    event ContributionReceivedETH(
        address indexed donator,
        uint256 indexed amount
    );

    //ClaimFunds
    //DeleteCallForFunds
    //ChangeMinimum

    // Plain ETH transfers.
    receive() external payable {
        emit ContributionReceivedETH(msg.sender, msg.value);
    }

    // function contributeERC20() onlyOpen // dai???

    // function claimFunds()
    // function StartSuperFluidStream() onlyCreator onlyMatched

    // modifier onlyCreator() require msg.sender===creator
    // modifier onlyOpen() require fundingState===FundingState.OPEN
    // modifier onlyMatched() require fundingState===FundingState.MATCHED
}
