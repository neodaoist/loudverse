import { ContributionReceivedETH } from "../generated/templates/CallForFundsLogic/CallForFundsLogic";
import { findOrCreateContributionByUserForCall } from "./helpers";
import { CallForFunding } from "../generated/schema";

export function handleETHContribution(event: ContributionReceivedETH): void {
    let callAddress = event.address.toHexString();
    let userAddress = event.params.donator.toHexString();
    let amount = event.params.amount;

    let callForFunds = CallForFunding.load(callAddress);
    // it won't ever be null, but typescript thinks otherwise
    if (callForFunds !== null) {
        callForFunds.currentRoundFundsReceived = callForFunds.currentRoundFundsReceived.plus(amount);
        callForFunds.lifetimeFundsReceived = callForFunds.lifetimeFundsReceived.plus(amount);

        // maybe we track funding state on graph? instead of on-chain. might be easier
        // if (callForFunds.lifetimeFundsReceived.gt(callForFunds.minFundingAmount)) {
        //   callForFunds.fundingState = 1
        // }

        callForFunds.save();
    }

    let contribution = findOrCreateContributionByUserForCall(callAddress, userAddress);

    contribution.amount = contribution.amount.plus(amount);

    contribution.save();
}
