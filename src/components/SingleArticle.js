import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useQuery, gql } from "@apollo/client";


const GET_ARTICLE_BY_TITLE = gql`
  query getArticleByTitle($title: String!) {
    articles(where: {title: $title}) {
      edges {
        node {
          id
          title
          content
        }
      }
    }
  }
`;

const SingleArticle = () => {
  const { slug } = useParams(); 
  console.log("Article Slug:", slug);

  const { loading, error, data } = useQuery(GET_ARTICLE_BY_TITLE, {
    variables: { title: slug }, 
    skip: !slug, 
  });

  useEffect(() => {
    if (data) console.log("Fetched article:", data.articles.edges);
  }, [data]);

  if (!slug) return <p>Invalid article slug</p>;
  if (loading) return <p>Loading...</p>;
  if (error) {
    console.error("GraphQL Error:", error);
    return <p>Error: {error.message}</p>;
  }

  const article = data?.articles?.edges[0]?.node; 

  return (
    <div>
      {article ? (
        <>
          <h1>{article.title}</h1>
          <div dangerouslySetInnerHTML={{ __html: article.content }} />
        </>
      ) : (
        <p>Article not found</p>
      )}
    </div>
  );
};

export default SingleArticle;
