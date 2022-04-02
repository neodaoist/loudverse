// SPDX-License-Identifier: MIT
pragma solidity ^0.8.2;
pragma abicoder v2;

import {CallForFundsStorage} from "./CallForFundsStorage.sol";
import {ISuperfluid} from "@superfluid-finance/ethereum-contracts/contracts/interfaces/superfluid/ISuperfluid.sol";
import {IConstantFlowAgreementV1} from "@superfluid-finance/ethereum-contracts/contracts/interfaces/agreements/IConstantFlowAgreementV1.sol";
import {ISETH} from "@superfluid-finance/ethereum-contracts/contracts/interfaces/tokens/ISETH.sol";
import {ERC20WithTokenInfo} from "@superfluid-finance/ethereum-contracts/contracts/interfaces/tokens/ERC20WithTokenInfo.sol";
import {ISuperToken} from "@superfluid-finance/ethereum-contracts/contracts/interfaces/superfluid/ISuperToken.sol";

interface ICallForFundsFactory {
    function proxies(address) external returns (bool);
}

interface ISuperfluidOverride {
    function realtimeBalanceOfNow(address account)
        external
        view
        returns (
            int256 availableBalance,
            uint256 deposit,
            uint256 owedDeposit,
            uint256 timestamp
        );
}

interface ICallForFundsLogic {
    function mintCrowdCommission(
        address[] calldata funders,
        uint256 id,
        bytes memory data
    ) external;

    function mintSmartArt(
        address to,
        address royaltyRecipient,
        uint256 royaltyValue,
        string memory uri
    ) external;
}

interface ICrowdCommission {
    function mintCrowdCommissions(
        address[] memory funders,
        uint256 id,
        bytes memory data
    ) external;
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

    event CallMatched(uint256 indexed amountMatched);

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

    // Can find ISuperToken, host and cfa addresses at https://docs.superfluid.finance/superfluid/protocol-developers/networks
    constructor(address crowdCommission_, address smartArt_) {
        crowdCommission = crowdCommission_;
        smartArt = smartArt_;
    }

    //======== CREATOR METHODS =========
    function startStream()
        external
        payable
        onlyCreator
        requireState(FundingState.MATCHED)
    {
        address proxyAddress = address(this);
        uint256 proxyBalance = ERC20WithTokenInfo(_dai).balanceOf(proxyAddress);
        (bool success, ) = address(_daix).call{gas: gasleft()}(
            abi.encodeWithSignature("upgrade(uint256)", proxyBalance)
        );
        require(success);

        uint256 daixBalance = ISuperToken(_daix).balanceOf(proxyAddress);

        int256 _daixBalance = int256(uint256(daixBalance));
        int96 timelineInSeconds = int96(timelineInDays) * 86400;
        int96 daixBalanceInt96 = int96(_daixBalance);
        int96 flowRate = daixBalanceInt96 / timelineInSeconds; // Safe in 0.8.0

        // Start stream
        ISuperfluid(_host).callAgreement(
            _cfa,
            abi.encodeWithSelector(
                IConstantFlowAgreementV1(_cfa).createFlow.selector,
                _daix, // daix or whatever token being streamed, if this doesn't work use ISuperToken type
                msg.sender, // plain address
                flowRate, // wei/sec int96
                new bytes(0) // placeholder - always pass in bytes(0)
            ),
            "0x" //userData
        );

        setFundingState(FundingState.STREAMING);
    }

    function deliver(string memory deliverableURI_, address slicerAddress)
        external
        onlyCreator
        requireState(FundingState.STREAMING)
    {
        deliverableURI = deliverableURI_;
        emit WorkDelivered(deliverableURI);

        ICallForFundsLogic(logicAddress).mintSmartArt(
            msg.sender,
            slicerAddress,
            1000,
            deliverableURI_
        );

        setFundingState(FundingState.DELIVERED);
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
        emit CallMatched(msg.value);
        // mint crowd-commissioned NFT
        ICallForFundsLogic(logicAddress).mintCrowdCommission(funders, id, data);
        setFundingState(FundingState.MATCHED);
    }

    function refund(address[] memory addresses, uint256[] memory amounts)
        external
        onlyLoudverse
        requireState(FundingState.OPEN)
    {
        // insecure
        // for now assumes Loudverse will supply correct amounts for refund
        for (uint256 i = 1; i < addresses.length; i++) {
            bool success = ERC20WithTokenInfo(_dai).transfer(
                addresses[i],
                amounts[i]
            );
            require(success);
        }

        address proxyAddress = address(this);
        uint256 proxyBalance = ERC20WithTokenInfo(_dai).balanceOf(proxyAddress);
        require(proxyBalance == 0);

        emit RefundCompleted(addresses, amounts);
        setFundingState(FundingState.FAILED);
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
