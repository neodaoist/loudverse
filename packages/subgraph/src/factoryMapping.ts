import { CallForFundsCreated } from "../generated/CallForFundsFactory/CallForFundsFactory";
import { CallForFunds } from "../generated/templates";
import { findOrCreateUser } from "./helpers";
import { BigInt, log } from "@graphprotocol/graph-ts";
import { CallForFunding } from "../generated/schema";

export function handleNewCallForFunds(event: CallForFundsCreated): void {
  // initialize new CallForFunds to track events for
  CallForFunds.create(event.params.CallForFunds);

  let creatorAddress = event.params.creator.toHexString();
  let creator = findOrCreateUser(creatorAddress);

  let proxyAddress = event.params.CallForFunds.toHexString();
  log.info("Handling Event: NewCallForFunds from Factory", []);
  let newCallForFunds = new CallForFunding(proxyAddress);

  newCallForFunds.creator = creator.id;
  newCallForFunds.title = event.params.title;
  newCallForFunds.description = event.params.description;
  newCallForFunds.image = event.params.image;
  newCallForFunds.category = event.params.category;
  newCallForFunds.genre = event.params.genre;
  newCallForFunds.subgenre = event.params.subgenre;
  newCallForFunds.timelineInDays = event.params.timelineInDays;
  newCallForFunds.minFundingAmount = event.params.minFundingAmount;
  newCallForFunds.deliverableMedium = event.params.deliverableMedium;
  newCallForFunds.fundingState = 0;
  newCallForFunds.videoUri = event.params.videoUri;

  newCallForFunds.currentRoundFundsReceived = BigInt.fromI32(0);
  newCallForFunds.lifetimeFundsReceived = BigInt.fromI32(0);

  newCallForFunds.save();
}
