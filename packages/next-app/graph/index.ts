import 'cross-fetch/polyfill';
import { ApolloClient, InMemoryCache } from "@apollo/client";

const APIURL = "https://api.thegraph.com/subgraphs/name/nickadamson/loudversemumbai";

const LoudverseClient = new ApolloClient({
  uri: APIURL,
  cache: new InMemoryCache(),
});

export default LoudverseClient;

