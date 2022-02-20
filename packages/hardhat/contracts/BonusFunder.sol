pragma solidity ^0.8.7;
//SPDX-License-Identifier: MIT

import "@chainlink/contracts/src/v0.8/interfaces/LinkTokenInterface.sol";
import "@chainlink/contracts/src/v0.8/interfaces/VRFCoordinatorV2Interface.sol";
import "@chainlink/contracts/src/v0.8/VRFConsumerBaseV2.sol";

interface ICallForFundsFactory {
    function proxiesList() external returns (address[] memory);
}

contract BonusFunder is VRFConsumerBaseV2 {
    uint64 public s_subscriptionId = 408;

    // Rinkeby coordinator
    address public vrfCoordinator = 0x6168499c0cFfCaCD319c818142124B7A15E857ab;
    VRFCoordinatorV2Interface public COORDINATOR =
        VRFCoordinatorV2Interface(vrfCoordinator);

    // Rinkeby LINK token contract
    address public link = 0x01BE23585060835E02B77ef475b0Cc51aA1e0709;
    LinkTokenInterface public LINKTOKEN = LinkTokenInterface(link);

    // The gas lane to use, which specifies the maximum gas price to bump to
    bytes32 public keyHash =
        0xd89b2bf150e3b9e13446986e571fb9cab24b13cea0a43ea20a6049a85cc807cc;

    uint32 public callbackGasLimit = 100000;

    uint16 public requestConfirmations = 3;

    // Random
    uint32 public numWords = 1;
    uint256[] public s_randomWords;
    uint256 public s_requestId;
    address public s_owner;

    // Bonus
    address public factoryAddress;
    address[] public eligibleProjects;

    // uint256 public bonusFundAmount = 0.001 ether; // TODO update to 0.1 ether

    constructor(address factory) VRFConsumerBaseV2(vrfCoordinator) {
        s_owner = msg.sender;
        factoryAddress = factory;
    }

    function sendFundsToWinningProject() public payable returns (address) {
        eligibleProjects = ICallForFundsFactory(factoryAddress).proxiesList();
        address winningProject = eligibleProjects[
            s_randomWords[0] % eligibleProjects.length
        ];

        // solhint-disable-next-line avoid-low-level-calls
        (bool success, ) = winningProject.call{value: msg.value, gas: 30000}(
            ""
        );
        require(success, "Bonus funds were not sent to project");

        return winningProject;
    }

    // Assumes the subscription is funded sufficiently.
    function requestRandomWords() external onlyOwner {
        // Will revert if subscription is not set and funded.
        s_requestId = COORDINATOR.requestRandomWords(
            keyHash,
            s_subscriptionId,
            requestConfirmations,
            callbackGasLimit,
            numWords
        );
    }

    function fulfillRandomWords(
        uint256, /* requestId */
        uint256[] memory randomWords
    ) internal override {
        s_randomWords = randomWords;
    }

    modifier onlyOwner() {
        require(msg.sender == s_owner);
        _;
    }
}
