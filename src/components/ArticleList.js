import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ApolloProvider, useQuery, gql } from '@apollo/client';
import { InMemoryCache, ApolloClient } from '@apollo/client';


import './ArticleListing.css';

const client = new ApolloClient({
  uri: 'http://localhost/bib/articles/graphql', 
  cache: new InMemoryCache(),
});


const GET_ARTICLES = gql`
  query getArticles($first: Int!, $after: String) {
    articles(first: $first, after: $after) {
      edges {
        node {
          id
          title
          excerpt
          slug  # Fetch slug instead of URI
        }
      }
      pageInfo {
        endCursor
        hasNextPage
      }
    }
  }
`;

const ArticleListing = () => {
  const [page, setPage] = useState(1);
  const [cursor, setCursor] = useState(null);

  const first = 3; 

  
  const { loading, error, data } = useQuery(GET_ARTICLES, {
    variables: { first: first, after: cursor }, 
  });

  const handlePageChange = (newPage) => {
    if (newPage < 1) return;
    setPage(newPage);
    if (newPage > page) {
      setCursor(data.articles.pageInfo.endCursor);
    } else {
      setCursor(null); 
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const articles = data.articles.edges;

  return (
    <div>
      <h1>Articles</h1>
      <ul>
        {articles.map(({ node }) => (
          <li key={node.id}>
            <Link to={`/articles/${node.slug}`}>  {}
              <h2>{node.title}</h2>
              <p>{node.excerpt}</p>
            </Link>
          </li>
        ))}
      </ul>

      <div>
        <button onClick={() => handlePageChange(page - 1)} disabled={page === 1}>
          Previous
        </button>
        <button
          onClick={() => handlePageChange(page + 1)}
          disabled={!data.articles.pageInfo.hasNextPage}
        >
          Next
        </button>
      </div>
    </div>
  );
};


export default function ArticleList() {
  return (
    <ApolloProvider client={client}>
      <ArticleListing />
    </ApolloProvider>
  );
}
