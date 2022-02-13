import { User } from "../generated/schema";

export function findOrCreateUser(id: string): User {
  let user = User.load(id);

  if (user == null) {
    user = new User(id);
  }

  return user as User;
}
