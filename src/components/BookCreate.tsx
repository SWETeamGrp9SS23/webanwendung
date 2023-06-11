import { ApolloClient, InMemoryCache } from "@apollo/client";
import { gql } from "graphql-tag";

const client = new ApolloClient({
  uri: "https://localhost:3000/graphql/",
  cache: new InMemoryCache(),
});

export async function createBooks(input: any) {
  console.log("Ich bin in createBooks!");
  const CREATE_data = gql`
    mutation CreateBook($input: CreateBookInput!) {
      createBook(input: $input) {
        isbn
        rating
        art
        preis
        rabatt
        lieferbar
        datum
        homepage
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
  console.log(CREATE_data);
  const { data } = await client.mutate({
    mutation: CREATE_data,
    variables: { input },
  });
  console.log(data);

  return data;
}
