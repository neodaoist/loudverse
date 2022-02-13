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
        uint256 _minFundingAmount,
        string _creator,
        string _title,
        string _description,
        string _category,
        string _genre,
        string _deliverableFormat,
        string _timeline
    ) external returns (address grantProxy) {
        grantProxy = address(
            new GrantProxy{salt: keccak256(abi.encode(_creator, _title))}()
        );

        emit GrantCreated(grantProxy, _creator);
    }
}
