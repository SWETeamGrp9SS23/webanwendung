import { ApolloClient, InMemoryCache } from "@apollo/client";
import { gql } from "graphql-tag";

const client = new ApolloClient({
  uri: "https://localhost:3000/graphql/",
  cache: new InMemoryCache(),
});

export async function getBooks(searchTerm: any) {
  console.log("Ich bin in getBooks!");
  const GET_data = gql`
    query {
      buch(id: ${searchTerm}) {
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
        abbildungen {
          beschriftung
          contentType
        }
      }
    }
  `;
  console.log(GET_data);
  const { data } = await client.query({
    query: GET_data,
    variables: { id: searchTerm },
  });
  console.log(data);

  return data;
}
