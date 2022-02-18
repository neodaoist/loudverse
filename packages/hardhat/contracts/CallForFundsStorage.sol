// SPDX-License-Identifier: MIT
pragma solidity ^0.8.2;

contract CallForFundsStorage {
    enum FundingState {
        OPEN,
        FAILED,
        MATCHED,
        STREAMING,
        DELIVERED
    }

    // change later to multisig?
    address public constant loudverseAdmin =
        0xA4E987fb3808d9FC206112967477793Ea8389450;

    address internal logicAddress;

    address public creator;
    string public title;
    string public description;
    string public image;
    string public category;
    string public genre;
    string public subgenre;
    string public deliverableMedium;
    uint96 public timelineInDays;
    uint256 public minFundingAmount;

    string public deliverableURI;

    FundingState public fundingState;
}
