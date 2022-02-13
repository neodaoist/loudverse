import { GrantCreated } from "../generated/GrantFactory/GrantFactory";
import { Grant } from "../generated/schema";
import { findOrCreateUser } from "./helpers";

export function handleNewGrant(event: GrantCreated): void {
  let creatorAddress = event.params.creator.toHexString();
  let creator = findOrCreateUser(creatorAddress);

  let grantAddress = event.params.grant.toHexString();
  let newGrant = new Grant(grantAddress);

  newGrant.creator = creator.id;
  newGrant.title = event.params.title;
  // ...

  newGrant.save();
}
