 pragma solidity ^0.8.7;
//SPDX-License-Identifier: MIT

import "@chainlink/contracts/src/v0.8/interfaces/LinkTokenInterface.sol";
import "@chainlink/contracts/src/v0.8/interfaces/VRFCoordinatorV2Interface.sol";
import "@chainlink/contracts/src/v0.8/VRFConsumerBaseV2.sol";

contract BonusFunder is VRFConsumerBaseV2 {
  VRFCoordinatorV2Interface COORDINATOR;
  LinkTokenInterface LINKTOKEN;

  // TODO Should we hardcode or put back in the constructur?
  // LOUDVERSE ETHDenver 2022 subscription ID
  uint64 s_subscriptionId = 408;

  // Rinkeby coordinator
  address vrfCoordinator = 0x6168499c0cFfCaCD319c818142124B7A15E857ab;

  // Rinkeby LINK token contract
  address link = 0x01BE23585060835E02B77ef475b0Cc51aA1e0709;

  // The gas lane to use, which specifies the maximum gas price to bump to
  bytes32 keyHash = 0xd89b2bf150e3b9e13446986e571fb9cab24b13cea0a43ea20a6049a85cc807cc;

  uint32 callbackGasLimit = 100000;

  uint16 requestConfirmations = 3;

  // Random
  uint32 numWords =  1;
  uint256[] public s_randomWords;
  uint256 public s_requestId;
  address s_owner;

  // Bonus
  address[] eligibleProjects;  
  uint256 bonusFundAmount = 0.001 ether; // TODO update to 0.1 ether

  constructor() VRFConsumerBaseV2(vrfCoordinator) {
    COORDINATOR = VRFCoordinatorV2Interface(vrfCoordinator);
    LINKTOKEN = LinkTokenInterface(link);
    s_owner = msg.sender;

    eligibleProjects = [
      0x067a85622eE93c8462fEED7977a0f394547b2f20,
      0x76490e22ce46453223669036519fDA50b5C7328d,
      0xe2416900a0Ac944661CB8248F755455D435e65Db,
      0x2adc0F97b0587f375673Cc4eCa1F484FB05184F1,
      0x2dC5e22B807B3697fd1442f03D280ddf3C14ba44,
      0x0278B1eeC2ee20Cf933FA14cCdC97B8DE951f56d
    ];
  }

  // TODO Where should we set which projects are eligible? 
  // function setEligibleProjects(address[] _eligibleProjects) public {
  //   eligibleProjects = _eligibleProjects;
  // }

  // TODO change this from view to payable and actually send the funds
  function sendFundsToWinningProject() public view returns (address) {
    address winningProject = eligibleProjects[s_randomWords[0] % eligibleProjects.length];
    
    // solhint-disable-next-line avoid-low-level-calls
    //(bool success, ) = winningProject.call{value: bonusFundAmount, gas: 30000}("");
    //require(success, "Bonus funds were not sent to project");

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
