// SPDX-License-Identifier: MIT
pragma solidity ^0.8.2;

import {CallForFundsStorage} from "./CallForFundsStorage.sol";

interface ICallForFundsFactory {
    function logicAddress() external returns (address);
}

contract CallForFundsProxy is CallForFundsStorage {
    constructor(
        address _creator,
        string memory _title,
        string memory _description,
        string memory _category,
        string memory _genre,
        uint8 _timeline,
        uint256 _minFundingAmount,
        string memory _deliverableFormat
    ) {
        logicAddress = ICallForFundsFactory(msg.sender).logicAddress();
        minFundingAmount = _minFundingAmount;
        creator = _creator;
        title = _title;
        description = _description;
        category = _category;
        genre = _genre;
        deliverableFormat = _deliverableFormat;
        timeline = _timeline;
        //todo fix
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
