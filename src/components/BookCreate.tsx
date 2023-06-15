import { ApolloClient, InMemoryCache } from "@apollo/client";
import { gql } from "@apollo/client";

const client = new ApolloClient({
  uri: "https://localhost:3000/graphql/",
  cache: new InMemoryCache(),
});

export async function createBooks(isbn: String, homepage: String, titel: String, 
                                untertitel: String, beschriftung: String, contentType: String) {
  console.log("Ich bin in createBooks!");
  const CREATE_data = gql`
    mutation Create($isbn: String!, $homepage: String!, $titel: String!, $untertitel: String!,
                    $beschriftung: String!, $contentType: String!) {
      create( input: {
          isbn: $isbn, 
          homepage: $homepage,
          titel: {
            titel: $titel,
            untertitel: $untertitel
          },
          abbildungen: [{
            beschriftung: $beschriftung,
            contentType: $contentType
          }]
        }
      )
    }
  `;

  console.log(CREATE_data);
  const { data } = await client.mutate({
    mutation: CREATE_data,
    variables: {  isbn, homepage, titel, 
                  untertitel, beschriftung, contentType },
  });
  console.log(data);

  return data;
}
