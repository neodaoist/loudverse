import { CallForFundsCreated } from "../generated/CallForFundsFactory/CallForFundsFactory";
import { CallForFunding } from "../generated/schema";
import { findOrCreateUser } from "./helpers";

export function handleNewCallForFunds(event: CallForFundsCreated): void {
  let creatorAddress = event.params.creator.toHexString();
  let creator = findOrCreateUser(creatorAddress);

  let proxyAddress = event.params.CallForFunds.toHexString();
  let newCallForFunds = new CallForFunding(proxyAddress);

  newCallForFunds.creator = creator.id;
  newCallForFunds.title = event.params.title;
  newCallForFunds.description = event.params.description;
  // newCallForFunds.image = event.params.image.to????;
  newCallForFunds.category = event.params.category;
  newCallForFunds.genre = event.params.genre;
  newCallForFunds.subgenre = event.params.subgenre;
  // newCallForFunds.timelineInDays = event.params.timelineInDays;
  // newCallForFunds.minFundingAmount = event.params.minFundingAmount;
  newCallForFunds.deliverableMedium = event.params.deliverableMedium;
  // newCallForFunds.fundingState = 0 for open?
  newCallForFunds.save();
}
