// SPDX-License-Identifier: MIT
pragma solidity ^0.8.2;

contract CallForFundsStorage {
    enum FundingState {
        OPEN,
        CLOSED,
        MATCHED,
        DELIVERED
    }

    address public logicAddress;

    address public creator;
    string public title;
    string public description;
    string public image;
    string public category;
    string public genre;
    string public subgenre;
    string public deliverableMedium;
    uint8 public timelineInDays;
    uint256 public minFundingAmount;

    FundingState public fundingState;

    // @Funding Round
    // @Calls for collaborators (optional)
}
