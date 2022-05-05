import "cross-fetch/polyfill";
import { ApolloClient, DefaultOptions, InMemoryCache } from "@apollo/client";

const APIURL = "https://api.thegraph.com/subgraphs/name/nickadamson/loudverse-polygon";
const cache = new InMemoryCache();
const defaultOptions: DefaultOptions = {
  watchQuery: {
    fetchPolicy: "no-cache",
    errorPolicy: "ignore",
  },
  query: {
    fetchPolicy: "no-cache",
    errorPolicy: "all",
  },
};

const LoudverseClient = new ApolloClient({
  uri: APIURL,
  cache: cache,
  defaultOptions: defaultOptions,
});

export default LoudverseClient;
