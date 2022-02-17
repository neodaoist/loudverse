import { ApolloQueryResult } from "@apollo/client";
import LoudverseClient from "./index";
import { ALL_CALLS, CALL_BY_ID, ALL_USERS, USER_BY_ID } from "./queries";
import { CallForFunding, User } from "./loudverse-graph-types";

type Data = {
  user?: User;
  users?: User[];
  callForFunding?: CallForFunding;
  callForFundings?: CallForFunding[];
};

export const getAllUsers = async (): Promise<User[] | null> => {
  const queryUsers: ApolloQueryResult<Data> = await LoudverseClient.query({
    query: ALL_USERS(),
  });

  if (queryUsers?.data) {
    const { users } = queryUsers.data;
    return users;
  }
  return null;
};

export const getAllCallsForFunds = async (): Promise<CallForFunding[] | null> => {
  const queryCallForFunds: ApolloQueryResult<Data> = await LoudverseClient.query({
    query: ALL_CALLS(),
  });

  if (queryCallForFunds?.data) {
    const { callForFundings } = queryCallForFunds.data;
    return callForFundings;
  }
  return null;
};

export const getUserByID = async (userAddress: string): Promise<User | null> => {
  const queryCallForFunds: ApolloQueryResult<Data> = await LoudverseClient.query({
    query: USER_BY_ID(userAddress),
  });

  if (queryCallForFunds?.data) {
    const { user } = queryCallForFunds.data;
    return user;
  }
  return null;
};

export const getCallForFundsByID = async (grantAddress: string): Promise<CallForFunding | null> => {
  const queryCallForFunds: ApolloQueryResult<Data> = await LoudverseClient.query({
    query: CALL_BY_ID(grantAddress),
  });

  if (queryCallForFunds?.data) {
    const { callForFunding } = queryCallForFunds.data;
    return callForFunding;
  }
  return null;
};
