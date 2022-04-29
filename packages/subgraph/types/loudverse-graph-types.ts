export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  BigDecimal: any;
  BigInt: any;
  Bytes: any;
};

/** The block at which the query should be executed. */
export type Block_Height = {
  /** Value containing a block hash */
  hash?: InputMaybe<Scalars['Bytes']>;
  /** Value containing a block number */
  number?: InputMaybe<Scalars['Int']>;
  /**
   * Value containing the minimum block number.
   * In the case of `number_gte`, the query will be executed on the latest block only if
   * the subgraph has progressed to or past the minimum block number.
   * Defaults to the latest block when omitted.
   */
  number_gte?: InputMaybe<Scalars['Int']>;
};

export type CallForFunding = {
  __typename?: 'CallForFunding';
  category: Scalars['String'];
  contributions: Array<Contribution>;
  creator: User;
  currentRoundFundsReceived: Scalars['BigInt'];
  deliverableMedium: Scalars['String'];
  deliverableToken?: Maybe<Scalars['String']>;
  deliverableURI?: Maybe<Scalars['String']>;
  description: Scalars['String'];
  fundingState: Scalars['Int'];
  genre: Scalars['String'];
  id: Scalars['ID'];
  image?: Maybe<Scalars['String']>;
  lifetimeFundsReceived: Scalars['BigInt'];
  minFundingAmount: Scalars['BigInt'];
  subgenre: Scalars['String'];
  timelineInDays: Scalars['BigInt'];
  title: Scalars['String'];
  videoUri?: Maybe<Scalars['String']>;
};


export type CallForFundingContributionsArgs = {
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Contribution_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<Contribution_Filter>;
};

export type CallForFunding_Filter = {
  category?: InputMaybe<Scalars['String']>;
  category_contains?: InputMaybe<Scalars['String']>;
  category_contains_nocase?: InputMaybe<Scalars['String']>;
  category_ends_with?: InputMaybe<Scalars['String']>;
  category_ends_with_nocase?: InputMaybe<Scalars['String']>;
  category_gt?: InputMaybe<Scalars['String']>;
  category_gte?: InputMaybe<Scalars['String']>;
  category_in?: InputMaybe<Array<Scalars['String']>>;
  category_lt?: InputMaybe<Scalars['String']>;
  category_lte?: InputMaybe<Scalars['String']>;
  category_not?: InputMaybe<Scalars['String']>;
  category_not_contains?: InputMaybe<Scalars['String']>;
  category_not_contains_nocase?: InputMaybe<Scalars['String']>;
  category_not_ends_with?: InputMaybe<Scalars['String']>;
  category_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  category_not_in?: InputMaybe<Array<Scalars['String']>>;
  category_not_starts_with?: InputMaybe<Scalars['String']>;
  category_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  category_starts_with?: InputMaybe<Scalars['String']>;
  category_starts_with_nocase?: InputMaybe<Scalars['String']>;
  creator?: InputMaybe<Scalars['String']>;
  creator_contains?: InputMaybe<Scalars['String']>;
  creator_contains_nocase?: InputMaybe<Scalars['String']>;
  creator_ends_with?: InputMaybe<Scalars['String']>;
  creator_ends_with_nocase?: InputMaybe<Scalars['String']>;
  creator_gt?: InputMaybe<Scalars['String']>;
  creator_gte?: InputMaybe<Scalars['String']>;
  creator_in?: InputMaybe<Array<Scalars['String']>>;
  creator_lt?: InputMaybe<Scalars['String']>;
  creator_lte?: InputMaybe<Scalars['String']>;
  creator_not?: InputMaybe<Scalars['String']>;
  creator_not_contains?: InputMaybe<Scalars['String']>;
  creator_not_contains_nocase?: InputMaybe<Scalars['String']>;
  creator_not_ends_with?: InputMaybe<Scalars['String']>;
  creator_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  creator_not_in?: InputMaybe<Array<Scalars['String']>>;
  creator_not_starts_with?: InputMaybe<Scalars['String']>;
  creator_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  creator_starts_with?: InputMaybe<Scalars['String']>;
  creator_starts_with_nocase?: InputMaybe<Scalars['String']>;
  currentRoundFundsReceived?: InputMaybe<Scalars['BigInt']>;
  currentRoundFundsReceived_gt?: InputMaybe<Scalars['BigInt']>;
  currentRoundFundsReceived_gte?: InputMaybe<Scalars['BigInt']>;
  currentRoundFundsReceived_in?: InputMaybe<Array<Scalars['BigInt']>>;
  currentRoundFundsReceived_lt?: InputMaybe<Scalars['BigInt']>;
  currentRoundFundsReceived_lte?: InputMaybe<Scalars['BigInt']>;
  currentRoundFundsReceived_not?: InputMaybe<Scalars['BigInt']>;
  currentRoundFundsReceived_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  deliverableMedium?: InputMaybe<Scalars['String']>;
  deliverableMedium_contains?: InputMaybe<Scalars['String']>;
  deliverableMedium_contains_nocase?: InputMaybe<Scalars['String']>;
  deliverableMedium_ends_with?: InputMaybe<Scalars['String']>;
  deliverableMedium_ends_with_nocase?: InputMaybe<Scalars['String']>;
  deliverableMedium_gt?: InputMaybe<Scalars['String']>;
  deliverableMedium_gte?: InputMaybe<Scalars['String']>;
  deliverableMedium_in?: InputMaybe<Array<Scalars['String']>>;
  deliverableMedium_lt?: InputMaybe<Scalars['String']>;
  deliverableMedium_lte?: InputMaybe<Scalars['String']>;
  deliverableMedium_not?: InputMaybe<Scalars['String']>;
  deliverableMedium_not_contains?: InputMaybe<Scalars['String']>;
  deliverableMedium_not_contains_nocase?: InputMaybe<Scalars['String']>;
  deliverableMedium_not_ends_with?: InputMaybe<Scalars['String']>;
  deliverableMedium_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  deliverableMedium_not_in?: InputMaybe<Array<Scalars['String']>>;
  deliverableMedium_not_starts_with?: InputMaybe<Scalars['String']>;
  deliverableMedium_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  deliverableMedium_starts_with?: InputMaybe<Scalars['String']>;
  deliverableMedium_starts_with_nocase?: InputMaybe<Scalars['String']>;
  deliverableToken?: InputMaybe<Scalars['String']>;
  deliverableToken_contains?: InputMaybe<Scalars['String']>;
  deliverableToken_contains_nocase?: InputMaybe<Scalars['String']>;
  deliverableToken_ends_with?: InputMaybe<Scalars['String']>;
  deliverableToken_ends_with_nocase?: InputMaybe<Scalars['String']>;
  deliverableToken_gt?: InputMaybe<Scalars['String']>;
  deliverableToken_gte?: InputMaybe<Scalars['String']>;
  deliverableToken_in?: InputMaybe<Array<Scalars['String']>>;
  deliverableToken_lt?: InputMaybe<Scalars['String']>;
  deliverableToken_lte?: InputMaybe<Scalars['String']>;
  deliverableToken_not?: InputMaybe<Scalars['String']>;
  deliverableToken_not_contains?: InputMaybe<Scalars['String']>;
  deliverableToken_not_contains_nocase?: InputMaybe<Scalars['String']>;
  deliverableToken_not_ends_with?: InputMaybe<Scalars['String']>;
  deliverableToken_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  deliverableToken_not_in?: InputMaybe<Array<Scalars['String']>>;
  deliverableToken_not_starts_with?: InputMaybe<Scalars['String']>;
  deliverableToken_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  deliverableToken_starts_with?: InputMaybe<Scalars['String']>;
  deliverableToken_starts_with_nocase?: InputMaybe<Scalars['String']>;
  deliverableURI?: InputMaybe<Scalars['String']>;
  deliverableURI_contains?: InputMaybe<Scalars['String']>;
  deliverableURI_contains_nocase?: InputMaybe<Scalars['String']>;
  deliverableURI_ends_with?: InputMaybe<Scalars['String']>;
  deliverableURI_ends_with_nocase?: InputMaybe<Scalars['String']>;
  deliverableURI_gt?: InputMaybe<Scalars['String']>;
  deliverableURI_gte?: InputMaybe<Scalars['String']>;
  deliverableURI_in?: InputMaybe<Array<Scalars['String']>>;
  deliverableURI_lt?: InputMaybe<Scalars['String']>;
  deliverableURI_lte?: InputMaybe<Scalars['String']>;
  deliverableURI_not?: InputMaybe<Scalars['String']>;
  deliverableURI_not_contains?: InputMaybe<Scalars['String']>;
  deliverableURI_not_contains_nocase?: InputMaybe<Scalars['String']>;
  deliverableURI_not_ends_with?: InputMaybe<Scalars['String']>;
  deliverableURI_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  deliverableURI_not_in?: InputMaybe<Array<Scalars['String']>>;
  deliverableURI_not_starts_with?: InputMaybe<Scalars['String']>;
  deliverableURI_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  deliverableURI_starts_with?: InputMaybe<Scalars['String']>;
  deliverableURI_starts_with_nocase?: InputMaybe<Scalars['String']>;
  description?: InputMaybe<Scalars['String']>;
  description_contains?: InputMaybe<Scalars['String']>;
  description_contains_nocase?: InputMaybe<Scalars['String']>;
  description_ends_with?: InputMaybe<Scalars['String']>;
  description_ends_with_nocase?: InputMaybe<Scalars['String']>;
  description_gt?: InputMaybe<Scalars['String']>;
  description_gte?: InputMaybe<Scalars['String']>;
  description_in?: InputMaybe<Array<Scalars['String']>>;
  description_lt?: InputMaybe<Scalars['String']>;
  description_lte?: InputMaybe<Scalars['String']>;
  description_not?: InputMaybe<Scalars['String']>;
  description_not_contains?: InputMaybe<Scalars['String']>;
  description_not_contains_nocase?: InputMaybe<Scalars['String']>;
  description_not_ends_with?: InputMaybe<Scalars['String']>;
  description_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  description_not_in?: InputMaybe<Array<Scalars['String']>>;
  description_not_starts_with?: InputMaybe<Scalars['String']>;
  description_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  description_starts_with?: InputMaybe<Scalars['String']>;
  description_starts_with_nocase?: InputMaybe<Scalars['String']>;
  fundingState?: InputMaybe<Scalars['Int']>;
  fundingState_gt?: InputMaybe<Scalars['Int']>;
  fundingState_gte?: InputMaybe<Scalars['Int']>;
  fundingState_in?: InputMaybe<Array<Scalars['Int']>>;
  fundingState_lt?: InputMaybe<Scalars['Int']>;
  fundingState_lte?: InputMaybe<Scalars['Int']>;
  fundingState_not?: InputMaybe<Scalars['Int']>;
  fundingState_not_in?: InputMaybe<Array<Scalars['Int']>>;
  genre?: InputMaybe<Scalars['String']>;
  genre_contains?: InputMaybe<Scalars['String']>;
  genre_contains_nocase?: InputMaybe<Scalars['String']>;
  genre_ends_with?: InputMaybe<Scalars['String']>;
  genre_ends_with_nocase?: InputMaybe<Scalars['String']>;
  genre_gt?: InputMaybe<Scalars['String']>;
  genre_gte?: InputMaybe<Scalars['String']>;
  genre_in?: InputMaybe<Array<Scalars['String']>>;
  genre_lt?: InputMaybe<Scalars['String']>;
  genre_lte?: InputMaybe<Scalars['String']>;
  genre_not?: InputMaybe<Scalars['String']>;
  genre_not_contains?: InputMaybe<Scalars['String']>;
  genre_not_contains_nocase?: InputMaybe<Scalars['String']>;
  genre_not_ends_with?: InputMaybe<Scalars['String']>;
  genre_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  genre_not_in?: InputMaybe<Array<Scalars['String']>>;
  genre_not_starts_with?: InputMaybe<Scalars['String']>;
  genre_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  genre_starts_with?: InputMaybe<Scalars['String']>;
  genre_starts_with_nocase?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  image?: InputMaybe<Scalars['String']>;
  image_contains?: InputMaybe<Scalars['String']>;
  image_contains_nocase?: InputMaybe<Scalars['String']>;
  image_ends_with?: InputMaybe<Scalars['String']>;
  image_ends_with_nocase?: InputMaybe<Scalars['String']>;
  image_gt?: InputMaybe<Scalars['String']>;
  image_gte?: InputMaybe<Scalars['String']>;
  image_in?: InputMaybe<Array<Scalars['String']>>;
  image_lt?: InputMaybe<Scalars['String']>;
  image_lte?: InputMaybe<Scalars['String']>;
  image_not?: InputMaybe<Scalars['String']>;
  image_not_contains?: InputMaybe<Scalars['String']>;
  image_not_contains_nocase?: InputMaybe<Scalars['String']>;
  image_not_ends_with?: InputMaybe<Scalars['String']>;
  image_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  image_not_in?: InputMaybe<Array<Scalars['String']>>;
  image_not_starts_with?: InputMaybe<Scalars['String']>;
  image_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  image_starts_with?: InputMaybe<Scalars['String']>;
  image_starts_with_nocase?: InputMaybe<Scalars['String']>;
  lifetimeFundsReceived?: InputMaybe<Scalars['BigInt']>;
  lifetimeFundsReceived_gt?: InputMaybe<Scalars['BigInt']>;
  lifetimeFundsReceived_gte?: InputMaybe<Scalars['BigInt']>;
  lifetimeFundsReceived_in?: InputMaybe<Array<Scalars['BigInt']>>;
  lifetimeFundsReceived_lt?: InputMaybe<Scalars['BigInt']>;
  lifetimeFundsReceived_lte?: InputMaybe<Scalars['BigInt']>;
  lifetimeFundsReceived_not?: InputMaybe<Scalars['BigInt']>;
  lifetimeFundsReceived_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  minFundingAmount?: InputMaybe<Scalars['BigInt']>;
  minFundingAmount_gt?: InputMaybe<Scalars['BigInt']>;
  minFundingAmount_gte?: InputMaybe<Scalars['BigInt']>;
  minFundingAmount_in?: InputMaybe<Array<Scalars['BigInt']>>;
  minFundingAmount_lt?: InputMaybe<Scalars['BigInt']>;
  minFundingAmount_lte?: InputMaybe<Scalars['BigInt']>;
  minFundingAmount_not?: InputMaybe<Scalars['BigInt']>;
  minFundingAmount_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  subgenre?: InputMaybe<Scalars['String']>;
  subgenre_contains?: InputMaybe<Scalars['String']>;
  subgenre_contains_nocase?: InputMaybe<Scalars['String']>;
  subgenre_ends_with?: InputMaybe<Scalars['String']>;
  subgenre_ends_with_nocase?: InputMaybe<Scalars['String']>;
  subgenre_gt?: InputMaybe<Scalars['String']>;
  subgenre_gte?: InputMaybe<Scalars['String']>;
  subgenre_in?: InputMaybe<Array<Scalars['String']>>;
  subgenre_lt?: InputMaybe<Scalars['String']>;
  subgenre_lte?: InputMaybe<Scalars['String']>;
  subgenre_not?: InputMaybe<Scalars['String']>;
  subgenre_not_contains?: InputMaybe<Scalars['String']>;
  subgenre_not_contains_nocase?: InputMaybe<Scalars['String']>;
  subgenre_not_ends_with?: InputMaybe<Scalars['String']>;
  subgenre_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  subgenre_not_in?: InputMaybe<Array<Scalars['String']>>;
  subgenre_not_starts_with?: InputMaybe<Scalars['String']>;
  subgenre_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  subgenre_starts_with?: InputMaybe<Scalars['String']>;
  subgenre_starts_with_nocase?: InputMaybe<Scalars['String']>;
  timelineInDays?: InputMaybe<Scalars['BigInt']>;
  timelineInDays_gt?: InputMaybe<Scalars['BigInt']>;
  timelineInDays_gte?: InputMaybe<Scalars['BigInt']>;
  timelineInDays_in?: InputMaybe<Array<Scalars['BigInt']>>;
  timelineInDays_lt?: InputMaybe<Scalars['BigInt']>;
  timelineInDays_lte?: InputMaybe<Scalars['BigInt']>;
  timelineInDays_not?: InputMaybe<Scalars['BigInt']>;
  timelineInDays_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  title?: InputMaybe<Scalars['String']>;
  title_contains?: InputMaybe<Scalars['String']>;
  title_contains_nocase?: InputMaybe<Scalars['String']>;
  title_ends_with?: InputMaybe<Scalars['String']>;
  title_ends_with_nocase?: InputMaybe<Scalars['String']>;
  title_gt?: InputMaybe<Scalars['String']>;
  title_gte?: InputMaybe<Scalars['String']>;
  title_in?: InputMaybe<Array<Scalars['String']>>;
  title_lt?: InputMaybe<Scalars['String']>;
  title_lte?: InputMaybe<Scalars['String']>;
  title_not?: InputMaybe<Scalars['String']>;
  title_not_contains?: InputMaybe<Scalars['String']>;
  title_not_contains_nocase?: InputMaybe<Scalars['String']>;
  title_not_ends_with?: InputMaybe<Scalars['String']>;
  title_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  title_not_in?: InputMaybe<Array<Scalars['String']>>;
  title_not_starts_with?: InputMaybe<Scalars['String']>;
  title_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  title_starts_with?: InputMaybe<Scalars['String']>;
  title_starts_with_nocase?: InputMaybe<Scalars['String']>;
  videoUri?: InputMaybe<Scalars['String']>;
  videoUri_contains?: InputMaybe<Scalars['String']>;
  videoUri_contains_nocase?: InputMaybe<Scalars['String']>;
  videoUri_ends_with?: InputMaybe<Scalars['String']>;
  videoUri_ends_with_nocase?: InputMaybe<Scalars['String']>;
  videoUri_gt?: InputMaybe<Scalars['String']>;
  videoUri_gte?: InputMaybe<Scalars['String']>;
  videoUri_in?: InputMaybe<Array<Scalars['String']>>;
  videoUri_lt?: InputMaybe<Scalars['String']>;
  videoUri_lte?: InputMaybe<Scalars['String']>;
  videoUri_not?: InputMaybe<Scalars['String']>;
  videoUri_not_contains?: InputMaybe<Scalars['String']>;
  videoUri_not_contains_nocase?: InputMaybe<Scalars['String']>;
  videoUri_not_ends_with?: InputMaybe<Scalars['String']>;
  videoUri_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  videoUri_not_in?: InputMaybe<Array<Scalars['String']>>;
  videoUri_not_starts_with?: InputMaybe<Scalars['String']>;
  videoUri_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  videoUri_starts_with?: InputMaybe<Scalars['String']>;
  videoUri_starts_with_nocase?: InputMaybe<Scalars['String']>;
};

export enum CallForFunding_OrderBy {
  Category = 'category',
  Contributions = 'contributions',
  Creator = 'creator',
  CurrentRoundFundsReceived = 'currentRoundFundsReceived',
  DeliverableMedium = 'deliverableMedium',
  DeliverableToken = 'deliverableToken',
  DeliverableUri = 'deliverableURI',
  Description = 'description',
  FundingState = 'fundingState',
  Genre = 'genre',
  Id = 'id',
  Image = 'image',
  LifetimeFundsReceived = 'lifetimeFundsReceived',
  MinFundingAmount = 'minFundingAmount',
  Subgenre = 'subgenre',
  TimelineInDays = 'timelineInDays',
  Title = 'title',
  VideoUri = 'videoUri'
}

export type Contribution = {
  __typename?: 'Contribution';
  amount: Scalars['BigInt'];
  callForFunds: CallForFunding;
  id: Scalars['ID'];
  timestamp: Scalars['BigInt'];
  user: User;
};

export type Contribution_Filter = {
  amount?: InputMaybe<Scalars['BigInt']>;
  amount_gt?: InputMaybe<Scalars['BigInt']>;
  amount_gte?: InputMaybe<Scalars['BigInt']>;
  amount_in?: InputMaybe<Array<Scalars['BigInt']>>;
  amount_lt?: InputMaybe<Scalars['BigInt']>;
  amount_lte?: InputMaybe<Scalars['BigInt']>;
  amount_not?: InputMaybe<Scalars['BigInt']>;
  amount_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  callForFunds?: InputMaybe<Scalars['String']>;
  callForFunds_contains?: InputMaybe<Scalars['String']>;
  callForFunds_contains_nocase?: InputMaybe<Scalars['String']>;
  callForFunds_ends_with?: InputMaybe<Scalars['String']>;
  callForFunds_ends_with_nocase?: InputMaybe<Scalars['String']>;
  callForFunds_gt?: InputMaybe<Scalars['String']>;
  callForFunds_gte?: InputMaybe<Scalars['String']>;
  callForFunds_in?: InputMaybe<Array<Scalars['String']>>;
  callForFunds_lt?: InputMaybe<Scalars['String']>;
  callForFunds_lte?: InputMaybe<Scalars['String']>;
  callForFunds_not?: InputMaybe<Scalars['String']>;
  callForFunds_not_contains?: InputMaybe<Scalars['String']>;
  callForFunds_not_contains_nocase?: InputMaybe<Scalars['String']>;
  callForFunds_not_ends_with?: InputMaybe<Scalars['String']>;
  callForFunds_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  callForFunds_not_in?: InputMaybe<Array<Scalars['String']>>;
  callForFunds_not_starts_with?: InputMaybe<Scalars['String']>;
  callForFunds_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  callForFunds_starts_with?: InputMaybe<Scalars['String']>;
  callForFunds_starts_with_nocase?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  timestamp?: InputMaybe<Scalars['BigInt']>;
  timestamp_gt?: InputMaybe<Scalars['BigInt']>;
  timestamp_gte?: InputMaybe<Scalars['BigInt']>;
  timestamp_in?: InputMaybe<Array<Scalars['BigInt']>>;
  timestamp_lt?: InputMaybe<Scalars['BigInt']>;
  timestamp_lte?: InputMaybe<Scalars['BigInt']>;
  timestamp_not?: InputMaybe<Scalars['BigInt']>;
  timestamp_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  user?: InputMaybe<Scalars['String']>;
  user_contains?: InputMaybe<Scalars['String']>;
  user_contains_nocase?: InputMaybe<Scalars['String']>;
  user_ends_with?: InputMaybe<Scalars['String']>;
  user_ends_with_nocase?: InputMaybe<Scalars['String']>;
  user_gt?: InputMaybe<Scalars['String']>;
  user_gte?: InputMaybe<Scalars['String']>;
  user_in?: InputMaybe<Array<Scalars['String']>>;
  user_lt?: InputMaybe<Scalars['String']>;
  user_lte?: InputMaybe<Scalars['String']>;
  user_not?: InputMaybe<Scalars['String']>;
  user_not_contains?: InputMaybe<Scalars['String']>;
  user_not_contains_nocase?: InputMaybe<Scalars['String']>;
  user_not_ends_with?: InputMaybe<Scalars['String']>;
  user_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  user_not_in?: InputMaybe<Array<Scalars['String']>>;
  user_not_starts_with?: InputMaybe<Scalars['String']>;
  user_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  user_starts_with?: InputMaybe<Scalars['String']>;
  user_starts_with_nocase?: InputMaybe<Scalars['String']>;
};

export enum Contribution_OrderBy {
  Amount = 'amount',
  CallForFunds = 'callForFunds',
  Id = 'id',
  Timestamp = 'timestamp',
  User = 'user'
}

/** Defines the order direction, either ascending or descending */
export enum OrderDirection {
  Asc = 'asc',
  Desc = 'desc'
}

export type Query = {
  __typename?: 'Query';
  /** Access to subgraph metadata */
  _meta?: Maybe<_Meta_>;
  callForFunding?: Maybe<CallForFunding>;
  callForFundings: Array<CallForFunding>;
  contribution?: Maybe<Contribution>;
  contributions: Array<Contribution>;
  user?: Maybe<User>;
  users: Array<User>;
};


export type Query_MetaArgs = {
  block?: InputMaybe<Block_Height>;
};


export type QueryCallForFundingArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryCallForFundingsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<CallForFunding_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<CallForFunding_Filter>;
};


export type QueryContributionArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryContributionsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Contribution_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Contribution_Filter>;
};


export type QueryUserArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryUsersArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<User_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<User_Filter>;
};

export type Subscription = {
  __typename?: 'Subscription';
  /** Access to subgraph metadata */
  _meta?: Maybe<_Meta_>;
  callForFunding?: Maybe<CallForFunding>;
  callForFundings: Array<CallForFunding>;
  contribution?: Maybe<Contribution>;
  contributions: Array<Contribution>;
  user?: Maybe<User>;
  users: Array<User>;
};


export type Subscription_MetaArgs = {
  block?: InputMaybe<Block_Height>;
};


export type SubscriptionCallForFundingArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionCallForFundingsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<CallForFunding_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<CallForFunding_Filter>;
};


export type SubscriptionContributionArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionContributionsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Contribution_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Contribution_Filter>;
};


export type SubscriptionUserArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionUsersArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<User_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<User_Filter>;
};

export type User = {
  __typename?: 'User';
  callsForFunds: Array<CallForFunding>;
  contributions: Array<Contribution>;
  id: Scalars['ID'];
};


export type UserCallsForFundsArgs = {
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<CallForFunding_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<CallForFunding_Filter>;
};


export type UserContributionsArgs = {
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Contribution_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<Contribution_Filter>;
};

export type User_Filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
};

export enum User_OrderBy {
  CallsForFunds = 'callsForFunds',
  Contributions = 'contributions',
  Id = 'id'
}

export type _Block_ = {
  __typename?: '_Block_';
  /** The hash of the block */
  hash?: Maybe<Scalars['Bytes']>;
  /** The block number */
  number: Scalars['Int'];
};

/** The type for the top-level _meta field */
export type _Meta_ = {
  __typename?: '_Meta_';
  /**
   * Information about a specific subgraph block. The hash of the block
   * will be null if the _meta field has a block constraint that asks for
   * a block number. It will be filled if the _meta field has no block constraint
   * and therefore asks for the latest  block
   */
  block: _Block_;
  /** The deployment ID */
  deployment: Scalars['String'];
  /** If `true`, the subgraph encountered indexing errors at some past block */
  hasIndexingErrors: Scalars['Boolean'];
};

export enum _SubgraphErrorPolicy_ {
  /** Data will be returned even if the subgraph has indexing errors */
  Allow = 'allow',
  /** If the subgraph has indexing errors, data will be omitted. The default. */
  Deny = 'deny'
}
