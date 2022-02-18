// SPDX-License-Identifier: MIT
pragma solidity ^0.8.2;

import {CallForFundsStorage} from "./CallForFundsStorage.sol";

interface ICallForFundsFactory {
    function proxies(address) external returns (bool);
}

interface ICallForFundsLogic {
    function mintCrowdCommission(
        address[] calldata funders,
        uint256 id,
        bytes memory data
    ) public;

    function mintSmartArt(
        address to,
        address royaltyRecipient,
        uint256 royaltyValue,
        string memory uri
    ) public;
}

interface ICrowdCommission {
    function mintCrowdCommissions(
        address[] memory funders,
        uint256 id,
        bytes memory data
    ) public;
}

interface ISmartArt {
    function mint(
        address to,
        address royaltyRecipient,
        uint256 royaltyValue,
        string memory uri
    ) external;
}

contract CallForFundsLogic is CallForFundsStorage {
    address public immutable crowdCommission;
    address public immutable smartArt;
    address public factory;

    //======== EVENTS =========
    event FundingStateChanged(FundingState indexed newFundingState);

    event ContributionReceivedETH(address indexed donator, uint256 amount);

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

    modifier onlyProxies() {
        bool isProxy = ICallForFundsFactory(factory).proxies(msg.sender);
        require(isProxy);
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

    constructor(address crowdCommission_, address smartArt_)
        CryptoCredential(loudverseAdmin)
    {
        crowdCommission = crowdCommission_;
        smartArt = smartArt_;
    }

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
        // TODO SLICERSO
        address slicerAddress = address(0);

        ICallForFundsLogic(logicAddress).mintSmartArt(
            msg.sender,
            slicerAddress,
            1000,
            deliverableURI_
        );
    }

    //======== PLATFORM METHODS =========
    function setFactory(address factoryAddress) external onlyLoudverse {
        factory = factoryAddress;
    }

    function matchCallForFunds(
        address[] calldata funders,
        uint256 id,
        bytes memory data
    ) external payable onlyLoudverse requireState(FundingState.OPEN) {
        // method is payable, msg.value should be the match
        setFundingState(FundingState.MATCHED);
        emit CallMatched(msg.value);
        //TODO #2
        // mint crowd-commissioned NFT
        ICallForFundsLogic(logicAddress).mintCrowdCommission(funders, id, data);
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

    //======== PROXY METHODS =========
    function mintCrowdCommission(
        address[] calldata funders,
        uint256 id,
        bytes memory data
    ) public onlyProxies {
        ICrowdCommission(crowdCommission).mintCrowdCommissions(
            funders,
            id,
            data
        );
    }

    function mintSmartArt(
        address to, // this will be the Creator address
        address royaltyRecipient, // this will be the Slicer address
        uint256 royaltyValue, // this will be 10% so 1000
        string memory uri
    ) public onlyProxies {
        ISmartArt(smartArt).mint(to, royaltyRecipient, royaltyValue, uri);
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
