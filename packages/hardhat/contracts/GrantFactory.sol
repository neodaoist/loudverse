// SPDX-License-Identifier: MIT
pragma solidity ^0.8.2;

import {GrantProxy} from "./GrantProxy.sol";

contract GrantFactory {
    address public immutable logicAddress;

    event GrantCreated(address indexed grant, address indexed creator);

    constructor(address _logicAddress) {
        logicAddress = _logicAddress;
    }

    function createGrant(
        address _creator,
        string memory _title,
        string memory _description,
        string memory _category,
        string memory _genre,
        uint8 _timeline,
        uint256 _minFundingAmount,
        string memory _deliverableFormat
    ) external returns (address grantProxy) {
        grantProxy = address(
            new GrantProxy{salt: keccak256(abi.encode(_creator, _title))}(
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

        emit GrantCreated(grantProxy, _creator);
    }
}
