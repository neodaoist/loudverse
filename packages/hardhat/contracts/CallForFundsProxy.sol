// SPDX-License-Identifier: MIT
pragma solidity ^0.8.2;

import {CallForFundsStorage} from "./CallForFundsStorage.sol";

interface ICallForFundsFactory {
    function logicAddress() external returns (address);
}

contract CallForFundsProxy is CallForFundsStorage {
    constructor(
        address creator_,
        string memory title_,
        string memory description_,
        string memory image_,
        string memory category_,
        string memory genre_,
        string memory subgenre_,
        string memory deliverableMedium_,
        uint8 timelineInDays_,
        uint256 minFundingAmount_
    ) {
        logicAddress = ICallForFundsFactory(msg.sender).logicAddress();

        creator = creator_;
        title = title_;
        description = description_;
        image = image_;
        category = category_;
        genre = genre_;
        subgenre = subgenre_;
        deliverableMedium = deliverableMedium_;
        timelineInDays = timelineInDays_;
        minFundingAmount = minFundingAmount_;

        fundingState = FundingState.OPEN;
    }

    fallback() external payable {
        address _impl = logicAddress;
        assembly {
            let ptr := mload(0x40)
            calldatacopy(ptr, 0, calldatasize())
            let result := delegatecall(gas(), _impl, ptr, calldatasize(), 0, 0)
            let size := returndatasize()
            returndatacopy(ptr, 0, size)

            switch result
            case 0 {
                revert(ptr, size)
            }
            default {
                return(ptr, size)
            }
        }
    }
}
