import { component$, useSignal } from "@builder.io/qwik";
import { ApolloClient, InMemoryCache } from "@apollo/client";
import { gql } from "graphql-tag";

const client = new ApolloClient({
  uri: "https://localhost:3000/graphql/",
  cache: new InMemoryCache(),
});

export async function createBooks(searchTerm: any) {
  console.log("Ich bin in createBooks!");
  const CREATE_data = gql`
  mutation {
    create(
      input: {
        isbn: ${isbn}
        rating: ${rating}
        art: ${art}
        preis: ${preis}
        rabatt: ${rabatt}
        lieferbar: ${lieferbar}
        datum: ${datum}
        homepage: ${homepage}
        schlagwoerter: ${schlagwoerter}
        titel: {
          titel: ${titel}
          untertitel: ${untertitel}
        }
      },
      abbildungen: [{
        beschriftung: ${beschriftung}
        contentType: ${contentType}
      }]
    )
  }
  `;
  console.log(CREATE_data);
  const { data } = await client.query({
    query: CREATE_data,
    variables: {
      isbn,
      rating,
      art,
      preis,
      rabatt,
      lieferbar,
      datum,
      homepage,
      schlagwoerter,
      titel,
      untertitel,
      beschriftung,
      contentType,
    },
  });
  console.log(data);

  return data;
}

export const BookCreate = component$(() => {
  const searchTerm = useSignal("");
  const books = useSignal([]);
  const setBooks = useSignal([]);
  createBooks(searchTerm.value).then((data) => {
    setBooks.value = data;
  });
});
