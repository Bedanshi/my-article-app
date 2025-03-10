import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ApolloProvider } from '@apollo/client';
import ArticleList from './components/ArticleList';
import SingleArticle from './components/SingleArticle';
import client from './graphql/client';  


function App() {
  return (
    <ApolloProvider client={client}> {}
      <Router>
        <Routes>
          <Route path="/" element={<ArticleList />} />  {}
          <Route path="/articles/:slug" element={<SingleArticle />} />  {}
        </Routes>
      </Router>
    </ApolloProvider>
  );
}

export default App;
