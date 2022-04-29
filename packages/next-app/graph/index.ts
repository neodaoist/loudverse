import "cross-fetch/polyfill";
import { ApolloClient, InMemoryCache } from "@apollo/client";

const APIURL = "https://api.thegraph.com/subgraphs/name/nickadamson/loudverse-polygon";

const LoudverseClient = new ApolloClient({
  uri: APIURL,
  cache: new InMemoryCache(),
});

export default LoudverseClient;
