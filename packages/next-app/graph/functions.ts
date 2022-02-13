import { ApolloQueryResult } from "@apollo/client";
import LoudverseClient from "./index";
import { ALL_CALLS, CALL_BY_ID, ALL_USERS, USER_BY_ID } from "./queries";

//TODO
// will need to add proper graph types once schema is defined
// graph-generate-code
export type UserGraphType = {
  id: string;
  grants: CallForFundsGraphType[];
};

export type CallForFundsGraphType = {
  id: string;
  creator: UserGraphType;
};

type Data = {
  grant?: CallForFundsGraphType;
  grants?: CallForFundsGraphType[];
  user?: UserGraphType;
  users?: UserGraphType[];
};

export const getAllUsers = async (): Promise<UserGraphType[] | null> => {
  const queryUsers: ApolloQueryResult<Data> = await LoudverseClient.query({
    query: ALL_USERS(),
  });

  if (queryUsers?.data) {
    const { users } = queryUsers.data;
    return users;
  }
  return null;
};

export const getAllCallsForFunds = async (): Promise<CallForFundsGraphType[] | null> => {
  const queryCallForFundss: ApolloQueryResult<Data> = await LoudverseClient.query({
    query: ALL_CALLS(),
  });

  if (queryCallForFundss?.data) {
    const { grants } = queryCallForFundss.data;
    return grants;
  }
  return null;
};

export const getUserByID = async (userAddress: string): Promise<UserGraphType | null> => {
  const queryCallForFundss: ApolloQueryResult<Data> = await LoudverseClient.query({
    query: USER_BY_ID(userAddress),
  });

  if (queryCallForFundss?.data) {
    const { user } = queryCallForFundss.data;
    return user;
  }
  return null;
};

export const getCallForFundsByID = async (
  grantAddress: string,
): Promise<CallForFundsGraphType | null> => {
  const queryCallForFundss: ApolloQueryResult<Data> = await LoudverseClient.query({
    query: CALL_BY_ID(grantAddress),
  });

  if (queryCallForFundss?.data) {
    const { grant } = queryCallForFundss.data;
    return grant;
  }
  return null;
};
