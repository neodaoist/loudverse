// SPDX-License-Identifier: MIT
pragma solidity ^0.8.2;

import {ISuperfluid} from "@superfluid-finance/ethereum-contracts/contracts/interfaces/superfluid/ISuperfluid.sol";
import {IConstantFlowAgreementV1} from "@superfluid-finance/ethereum-contracts/contracts/interfaces/agreements/IConstantFlowAgreementV1.sol";
import {ISETH} from "@superfluid-finance/ethereum-contracts/contracts/interfaces/tokens/ISETH.sol";

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

    ISuperfluid public constant _host =
        ISuperfluid(0xeD5B5b32110c3Ded02a07c8b8e97513FAfb883B6); // The superfluid contract that initializes the stream
    IConstantFlowAgreementV1 public constant _cfa =
        IConstantFlowAgreementV1(0xF4C5310E51F6079F601a5fb7120bC72a70b96e2A); // The stored constant flow agreement class address
    ISETH public constant _ethx =
        ISETH(0xa623b2DD931C5162b7a0B25852f4024Db48bb1A0);
}
