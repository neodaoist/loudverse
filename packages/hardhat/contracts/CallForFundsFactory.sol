// SPDX-License-Identifier: MIT
pragma solidity ^0.8.2;

import {CallForFundsProxy} from "./CallForFundsProxy.sol";

contract CallForFundsFactory {
    address public immutable logicAddress;

    event CallForFundsCreated(
        address indexed CallForFunds,
        address indexed creator,
        string title,
        string description,
        string category,
        string genre,
        uint8 timeline,
        uint256 minFundingAmount,
        string deliverableFormat
    );

    constructor(address _logicAddress) {
        logicAddress = _logicAddress;
    }

    function createCallForFunds(
        address _creator,
        string memory _title,
        string memory _description,
        string memory _category,
        string memory _genre,
        uint8 _timeline,
        uint256 _minFundingAmount,
        string memory _deliverableFormat
    ) external returns (address proxy) {
        proxy = address(
            new CallForFundsProxy{
                salt: keccak256(abi.encode(_creator, _title))
            }(
                _creator,
                _title,
                _description,
                _category,
                _genre,
                _timeline,
                _minFundingAmount,
                _deliverableFormat
            )
        );

        emit CallForFundsCreated(
            proxy,
            _creator,
            _title,
            _description,
            _category,
            _genre,
            _timeline,
            _minFundingAmount,
            _deliverableFormat
        );
    }
}
