// SPDX-License-Identifier: MIT
pragma solidity ^0.8.2;

import {ISuperfluid} from "@superfluid-finance/ethereum-contracts/contracts/interfaces/superfluid/ISuperfluid.sol";
import {IConstantFlowAgreementV1} from "@superfluid-finance/ethereum-contracts/contracts/interfaces/agreements/IConstantFlowAgreementV1.sol";
import {ISETH} from "@superfluid-finance/ethereum-contracts/contracts/interfaces/tokens/ISETH.sol";
import {ERC20WithTokenInfo} from "@superfluid-finance/ethereum-contracts/contracts/interfaces/tokens/ERC20WithTokenInfo.sol";
import {ISuperToken} from "@superfluid-finance/ethereum-contracts/contracts/interfaces/superfluid/ISuperToken.sol";

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
    string public videoUri;

    string public deliverableURI;

    FundingState public fundingState;

    // mumbai
    ISuperfluid public constant _host =
        ISuperfluid(0xEB796bdb90fFA0f28255275e16936D25d3418603); // The superfluid contract that initializes the stream
    IConstantFlowAgreementV1 public constant _cfa =
        IConstantFlowAgreementV1(0x49e565Ed1bdc17F3d220f72DF0857C26FA83F873); // The stored constant flow agreement class address
    ISETH public constant _ethx =
        ISETH(0x96B82B65ACF7072eFEb00502F45757F254c2a0D4);
    ISuperToken public constant _daix =
        ISuperToken(0x5D8B4C2554aeB7e86F387B4d6c00Ac33499Ed01f);
    // fDAI
    ERC20WithTokenInfo public constant _dai =
        ERC20WithTokenInfo(0x15F0Ca26781C3852f8166eD2ebce5D18265cceb7);

    // matic
    // ISuperfluid public constant _host =
    //     ISuperfluid(0x3E14dC1b13c488a8d5D310918780c983bD5982E7); // The superfluid contract that initializes the stream
    // IConstantFlowAgreementV1 public constant _cfa =
    //     IConstantFlowAgreementV1(0x6EeE6060f715257b970700bc2656De21dEdF074C); // The stored constant flow agreement class address
    // ISETH public constant _ethx =
    //     ISETH(0x3aD736904E9e65189c3000c7DD2c8AC8bB7cD4e3);
    // ERC20WithTokenInfo public constant _daix =
    //     ERC20WithTokenInfo(0x1305F6B6Df9Dc47159D12Eb7aC2804d4A33173c2);
    //  ERC20WithTokenInfo public constant _dai =
    //     ERC20WithTokenInfo(0x8f3Cf7ad23Cd3CaDbD9735AFf958023239c6A063);
}
