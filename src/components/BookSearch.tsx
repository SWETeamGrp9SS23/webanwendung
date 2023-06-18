import { ApolloClient, InMemoryCache } from '@apollo/client';
import { gql } from 'graphql-tag';

const client = new ApolloClient({
  uri: 'https://localhost:3000/graphql/',
  cache: new InMemoryCache(),
});

export async function getBooks(searchTerm: any) {
  const GET_data = gql`
    query GetBook($id: ID!) {
      buch(id: $id) {
        version
        isbn
        art
        homepage
        rating
        preis
        rabatt
        lieferbar
        titel {
          titel
          untertitel
        }
      }
    }
  `;
  const { data } = await client.query({
    query: GET_data,
    variables: { id: searchTerm },
  });

  return data;
}
