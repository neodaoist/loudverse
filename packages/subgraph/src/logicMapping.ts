import {
  CallMatched,
  ContributionReceivedETH,
  FundingStateChanged,
  RefundCompleted,
  StreamStarted,
  WorkDelivered,
} from "../generated/templates/CallForFundsLogic/CallForFundsLogic";
import { findOrCreateContributionByUserForCall } from "./helpers";
import { CallForFunding } from "../generated/schema";
import { BigInt } from "@graphprotocol/graph-ts";

export function handleETHContribution(event: ContributionReceivedETH): void {
  let callAddress = event.address.toHexString();
  let userAddress = event.params.donator.toHexString();
  let amount = event.params.amount;

  let callForFunds = CallForFunding.load(callAddress);
  // it won't ever be null, but typescript thinks otherwise
  if (callForFunds) {
    callForFunds.currentRoundFundsReceived =
      callForFunds.currentRoundFundsReceived.plus(amount);
    callForFunds.lifetimeFundsReceived =
      callForFunds.lifetimeFundsReceived.plus(amount);

    // maybe we track funding state on graph? instead of on-chain. might be easier
    // if (callForFunds.lifetimeFundsReceived.gt(callForFunds.minFundingAmount)) {
    //   callForFunds.fundingState = 1
    // }

    callForFunds.save();
  }

  let contribution = findOrCreateContributionByUserForCall(
    callAddress,
    userAddress
  );

  contribution.amount = contribution.amount.plus(amount);
  contribution.timestamp = event.block.timestamp;

  contribution.save();
}

export function handleFundingState(event: FundingStateChanged): void {
  let callForFunds = CallForFunding.load(event.address.toHexString());
  if (callForFunds) {
    callForFunds.fundingState = event.params.newFundingState;
    callForFunds.save();
  }
}

export function handleCallMatched(event: CallMatched): void {
  let callForFunds = CallForFunding.load(event.address.toHexString());
  if (callForFunds) {
    callForFunds.currentRoundFundsReceived =
      callForFunds.currentRoundFundsReceived.plus(event.params.amountMatched);
    callForFunds.lifetimeFundsReceived =
      callForFunds.lifetimeFundsReceived.plus(event.params.amountMatched);
    callForFunds.save();
  }
}

export function handleStreamStarted(event: StreamStarted): void {
  //TODO
}

export function handleWorkDelivered(event: WorkDelivered): void {
  let callForFunds = CallForFunding.load(event.address.toHexString());
  if (callForFunds) {
    callForFunds.deliverableURI = event.params.deliverableURI;
    // callForFunds.deliverableToken = event.params.tokenAddress
  }
}

export function handleRefundCompleted(event: RefundCompleted): void {
  let callForFunds = CallForFunding.load(event.address.toHexString());
  if (callForFunds) {
    callForFunds.currentRoundFundsReceived = BigInt.fromI32(0);
  }
}
