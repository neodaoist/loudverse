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
        string indexed image,
        string category,
        string genre,
        string subgenre,
        uint8 timelineInDays,
        uint256 minFundingAmount,
        string deliverableMedium
    );

    constructor(address _logicAddress) {
        logicAddress = _logicAddress;
    }

    function createCallForFunds(
        string memory _title,
        string memory _description,
        string memory _image,
        string memory _category,
        string memory _genre,
        string memory _subgenre,
        uint8 _timelineInDays,
        uint256 _minFundingAmount,
        string memory _deliverableMedium
    ) external returns (address proxy) {
        proxy = address(
            new CallForFundsProxy{
                salt: keccak256(abi.encode(msg.sender, _title))
            }(
                msg.sender,
                _title,
                _description,
                _image,
                _category,
                _genre,
                _subgenre,
                _deliverableMedium,
                _timelineInDays,
                _minFundingAmount
            )
        );

        emit CallForFundsCreated(
            proxy,
            msg.sender,
            _title,
            _description,
            _image,
            _category,
            _genre,
            _subgenre,
            _timelineInDays,
            _minFundingAmount,
            _deliverableMedium
        );
    }
}
