import { Transfer } from "../generated/DAI/DAI";
import { CallForFunding } from "../generated/schema";
import { findOrCreateContributionByUserForCall } from "./helpers";

export function handleDAITransfer(event: Transfer): void {
  // minimal check if DAI transfer went to a CallForFunding
  let callAddress = event.params.dst.toHexString();
  let callForFunds = CallForFunding.load(callAddress);

  if (callForFunds) {
    // begin heavy computations
    let amount = event.params.wad;

    callForFunds.currentRoundFundsReceived =
      callForFunds.currentRoundFundsReceived.plus(amount);
    callForFunds.lifetimeFundsReceived =
      callForFunds.lifetimeFundsReceived.plus(amount);

    callForFunds.save();

    let userAddress = event.params.src.toHexString();
    let contribution = findOrCreateContributionByUserForCall(
      callAddress,
      userAddress
    );

    contribution.amount = contribution.amount.plus(amount);
    contribution.timestamp = event.block.timestamp;
    contribution.txHash = event.transaction.hash;

    contribution.save();
  }
}
