import { ApolloClient, InMemoryCache } from "@apollo/client";
import { gql } from "@apollo/client";

const client = new ApolloClient({
  uri: "https://localhost:3000/graphql/",
  cache: new InMemoryCache(),
});

export async function authBooks(username: string, password: string) {
  console.log("Ich bin in authBooks!");
  const CREATE_data = gql`
    mutation Login($username: String!, $password: String!) {
      login(username: $username, password: $password) {
        token
        expiresIn
        roles
      }
    }
  `;

  console.log(CREATE_data);
  const { data } = await client.mutate({
    mutation: CREATE_data,
    variables: { username, password },
  });
  console.log(data);

  return data;
}
