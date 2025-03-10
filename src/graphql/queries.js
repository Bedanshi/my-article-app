import { gql } from "@apollo/client";

export const GET_ARTICLES = gql`
  query GetArticles($first: Int!, $after: String) {
    articles(first: $first, after: $after) {
      edges {
        node {
          id
          title
          excerpt
        }
      }
      pageInfo {
        endCursor
        hasNextPage
      }
    }
  }
`;
