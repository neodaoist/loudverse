import { CallForFunding, User, Contribution } from "../generated/schema";
import { BigInt } from "@graphprotocol/graph-ts";

export function findOrCreateUser(id: string): User {
  let user = User.load(id);

  if (user === null) {
    user = new User(id);
    user.save();
  }

  return user as User;
}

export function findOrCreateContributionByUserForCall(
  callId: string,
  userId: string
): Contribution {
  let id = `${callId}-${userId}`;
  let contribution = Contribution.load(id);

  if (contribution === null) {
    contribution = new Contribution(`${callId}-${userId}`);

    contribution.callForFunds = callId;
    contribution.user = findOrCreateUser(userId).id;
    contribution.amount = BigInt.fromI32(0);

    contribution.save();
  }

  return contribution as Contribution;
}
