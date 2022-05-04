
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/react-hooks';
import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Auth } from './components/Auth';
import { MainPage } from './components/MainPage';
import { StateContextProvider } from './context/StateContext';

const client = new ApolloClient({
  uri: "http://127.0.0.1:8000/graphql/",
  headers: {
    authorization: localStorage.getItem("token") ? `JWT ${localStorage.getItem("token")}` : "",
  },
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <StateContextProvider>
        <div className="app">
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Auth />} />
              <Route path="/employees" element={<MainPage />} />
            </Routes>
          </BrowserRouter>
        </div>
      </StateContextProvider>
    </ApolloProvider>
  );
}

export default App;
