import React from "react";
import "./App.css";
import { BrowserRouter as Router } from "react-router-dom";
import { ApolloClient, InMemoryCache, ApolloProvider, createHttpLink } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import Routes from "./Routes";
import { reducer, initialState } from "./store";
import {API_End_Point} from './constants.js'
export const AppContext = React.createContext();

const httpLink = createHttpLink({
  uri: `${API_End_Point}/graphql`,
});

const authLink = setContext((_, { headers }) => {
  return {
    headers: {
      ...headers,
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});
const App = () => {
  const [state, dispatch] = React.useReducer(reducer, initialState);
  return (
    <AppContext.Provider
      value={{
        state,
        dispatch,
      }}
    >
      <ApolloProvider client={client}>
        <Router>
          <Routes />
        </Router>
      </ApolloProvider>
    </AppContext.Provider>
  );
};

export default App;
