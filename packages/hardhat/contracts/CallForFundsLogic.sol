// SPDX-License-Identifier: MIT
pragma solidity ^0.8.2;

import {CallForFundsStorage} from "./CallForFundsStorage.sol";
import {CryptoCredential} from "./CryptoCredential.sol";

contract CallForFundsLogic is CryptoCredential, CallForFundsStorage {
    //======== EVENTS =========
    event FundingStateChanged(FundingState indexed newFundingState);

    event ContributionReceivedETH(
        address indexed donator,
        uint256 indexed amount
    );

    // , address indexed crowdNFTAddress
    event CallMatched(uint256 indexed amountMatched);

    // TODO
    event StreamStarted();

    // , address indexed nftAddress
    event WorkDelivered(string deliverableURI);

    event RefundCompleted(
        address[] indexed addresses,
        uint256[] indexed amounts
    );

    //======== MODIFIERS =========
    modifier onlyCreator() {
        require(msg.sender == creator);
        _;
    }

    modifier onlyLoudverse() {
        require(msg.sender == loudverseAdmin);
        _;
    }

    modifier requireState(FundingState fundingState_) {
        require(fundingState == fundingState_);
        _;
    }

    // Plain ETH transfers.
    receive() external payable {
        emit ContributionReceivedETH(msg.sender, msg.value);
    }

    constructor() CryptoCredential(loudverseAdmin) {}

    //======== CREATOR METHODS =========
    function startStream()
        external
        onlyCreator
        requireState(FundingState.MATCHED)
    {
        //TODO #1
        // Superfluid
        setFundingState(FundingState.STREAMING);
    }

    function deliver(string memory deliverableURI_)
        external
        onlyCreator
        requireState(FundingState.STREAMING)
    {
        deliverableURI = deliverableURI_;
        setFundingState(FundingState.DELIVERED);
        emit WorkDelivered(deliverableURI);

        //TODO #3 depending on time
        // smart-art
    }

    //======== PLATFORM METHODS =========
    function matchCallForFunds(uint256)
        external
        payable
        onlyLoudverse
        requireState(FundingState.OPEN)
    {
        // method is payable, msg.value should be the match
        setFundingState(FundingState.MATCHED);
        emit CallMatched(msg.value);
        //TODO #2
        // mint crowd-commissioned NFT
    }

    function mintCryptoCredential(
        address creator, //to
        uint256 id,
        uint256 amount, // can probably hardcode to 1?
        string memory creationTitle,
        Skill skill,
        string memory totalFunding,
        string memory totalFunders
    ) public onlyLoudverse {
        issueCredential(
            creator,
            id,
            amount,
            creationTitle,
            skill,
            totalFunding,
            totalFunders
        );
    }

    function refund(address[] memory addresses, uint256[] memory amounts)
        external
        onlyLoudverse
        requireState(FundingState.FAILED)
    {
        // insecure
        //TODO #4
        // might have to track internally
        // for now assumes Loudverse will supply correct amounts for refund
        for (uint256 i = 1; i < addresses.length; i++) {
            bool success = _attemptETHTransfer(addresses[i], amounts[i]);
            require(success);
        }

        emit RefundCompleted(addresses, amounts);
    }

    //======== PRIVATE =========
    function setFundingState(FundingState fundingState_) private {
        fundingState = fundingState_;
        emit FundingStateChanged(fundingState_);
    }

    function _attemptETHTransfer(address to, uint256 value)
        private
        returns (bool)
    {
        // Here increase the gas limit a reasonable amount above the default, and try
        // to send ETH to the recipient.
        // NOTE: This might allow the recipient to attempt  a limited reentrancy attack.
        // solhint-disable-next-line avoid-low-level-calls
        (bool success, ) = to.call{value: value, gas: 30000}("");
        return success;
    }
}
