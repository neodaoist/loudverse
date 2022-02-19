// SPDX-License-Identifier: MIT
pragma solidity ^0.8.2;

import {CallForFundsProxy} from "./CallForFundsProxy.sol";

contract CallForFundsFactory {
    address public immutable logicAddress;
    mapping(address => bool) public proxies;

    event CallForFundsCreated(
        address indexed CallForFunds,
        address indexed creator,
        string title,
        string description,
        string image,
        string category,
        string genre,
        string subgenre,
        uint96 timelineInDays,
        uint256 minFundingAmount,
        string deliverableMedium
    );

    constructor(address logicAddress_) {
        logicAddress = logicAddress_;
    }

    function createCallForFunds(
        string memory title_,
        string memory description_,
        string memory image_,
        string memory category_,
        string memory genre_,
        string memory subgenre_,
        uint96 timelineInDays_,
        uint256 minFundingAmount_,
        string memory deliverableMedium_
    ) external returns (address proxy) {
        proxy = address(
            new CallForFundsProxy{
                salt: keccak256(abi.encode(msg.sender, title_))
            }(
                msg.sender,
                title_,
                description_,
                image_,
                category_,
                genre_,
                subgenre_,
                deliverableMedium_,
                timelineInDays_,
                minFundingAmount_
            )
        );

        emit CallForFundsCreated(
            proxy,
            msg.sender,
            title_,
            description_,
            image_,
            category_,
            genre_,
            subgenre_,
            timelineInDays_,
            minFundingAmount_,
            deliverableMedium_
        );

        proxies[proxy] = true;
    }
}
