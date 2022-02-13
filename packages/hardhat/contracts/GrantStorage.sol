// SPDX-License-Identifier: MIT
pragma solidity ^0.8.2;

contract GrantStorage {
    enum FundingState {
        OPEN,
        CLOSED,
        MATCHED,
        DELIVERED
    }

    address public logicAddress;

    address public creator;
    string public title;
    string public description;
    string public category; //(Music, Photography, Painting, Digital Art, Animation, Film, Sculpture, Poetry, Play, Dance)
    string public genre;
    uint256 public minFundingAmount;
    string public deliverableFormat;
    // @Funding Round
    // @Calls for collaborators (optional)
    uint8 public timeline; // number of days?
    FundingState public fundingState;
    //details
}
