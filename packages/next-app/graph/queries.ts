import { gql, DocumentNode } from "@apollo/client";

export const ALL_CALLS = (): DocumentNode => gql`
  {
    callForFundings(first: 1000) {
      id
      creator {
        id
      }
      title
      description
      image
      category
      genre
      subgenre
      timelineInDays
      deliverableMedium
      fundingState
      contributions {
        id
        user {
          id
        }
        amount
        timestamp
      }
      minFundingAmount
      currentRoundFundsReceived
      lifetimeFundsReceived
      videoUri
    }
  }
`;

export const ALL_USERS = (): DocumentNode => gql`
  {
    users(first: 1000) {
      id
      callsForFunds {
        id
        title
        description
        image
        category
        genre
        subgenre
      }
      contributions {
        id
        amount
      }
    }
  }
`;

export const CALL_BY_ID = (address: string): DocumentNode => {
  address = address.toLowerCase();

  return gql`
    {
      callForFundings(where:{ id: "${address}"}) {
        id
        creator {
          id
        }
        title
        description
        image
        category
        genre
        subgenre
        timelineInDays
        deliverableMedium
        fundingState
        contributions {
          id
        }
        minFundingAmount
        currentRoundFundsReceived
        lifetimeFundsReceived
      }
    }`;
};

export const USER_BY_ID = (address: string): DocumentNode => {
  address = address.toLowerCase();
  return gql`
  {
    users(where: { id: "${address}"}) {
      id
      callsForFunds {
        id
        title
        description
        image
        category
        genre
        subgenre
      }
      contributions {
        id
        amount
      }
    }
  }`;
};
