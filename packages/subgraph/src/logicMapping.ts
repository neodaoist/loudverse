import {
  CallMatched,
  FundingStateChanged,
  RefundCompleted,
  WorkDelivered,
} from "../generated/templates/CallForFunds/CallForFundsLogic";
import { CallForFunding } from "../generated/schema";
import { BigInt, log } from "@graphprotocol/graph-ts";

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
