import { gql, DocumentNode } from "@apollo/client";

export const ALL_CALLS = (): DocumentNode => gql`
  {
    grants(first: 1000) {
      id
      creator {
        id
      }
    }
  }
`;

export const ALL_USERS = (): DocumentNode => gql`
  {
    calls(first: 1000) {
      id
      grants {
        id
      }
    }
  }
`;

export const CALL_BY_ID = (address: string): DocumentNode => {
  address = address.toLowerCase();

  return gql`
    {
      calls(where:{ id: "${address}"}) {
        id
        creator {
          id
        }
      }
    }`;
};

export const USER_BY_ID = (address: string): DocumentNode => {
  address = address.toLowerCase();
  return gql`
  {
    users(where: { id: "${address}"}) {
      id
      grants {
        id
      }
    }
  }`;
};
