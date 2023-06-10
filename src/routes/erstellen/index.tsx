import { component$, useSignal } from "@builder.io/qwik";
import { ApolloClient, InMemoryCache } from "@apollo/client";
import { gql } from "graphql-tag";

const client = new ApolloClient({
  uri: "https://localhost:3000/graphql/",
  cache: new InMemoryCache(),
});

export async function createBook(book: any) {
  const CREATE_BOOK = gql`
    mutation {
      create(
        input: {
          isbn: ${book.isbn}
          rating: ${book.rating}
          art: ${book.art}
          preis: ${book.preis}
          rabatt: ${book.rabatt}
          lieferbar: ${book.lieferbar}
          datum: ${book.datum}
          homepage: ${book.homepage}
          schlagwoerter: ${book.schlagwoerter}
          titel: {
            titel: ${book.titel.titel}
            untertitel: ${book.titel.untertitel}
          }
          //toDo Abbildungen fehlen
        }
      )
    }
  `;

  const { data } = await client.mutate({
    mutation: CREATE_BOOK,
  });

  return data;
}

export const BookCreate = component$(() => {
  const book = useSignal({
    isbn: "",
    rating: "",
    art: "",
    preis: "",
    rabatt: "",
    lieferbar: "",
    datum: "",
    homepage: "",
    schlagwoerter: "",
    titel: {
      titel: "",
      untertitel: "",
    },
    //toDo Abbildungen fehlen
  });

  return (
    <>
      <div class="book-create">
        <h2>Neues Buch erstellen</h2>
        <div class="form-group">
          <label>ISBN:</label>
          <input
            type="text"
            value={book.value.isbn}
            onChange$={(e) => (book.value.isbn = e.target.value)}
          />
        </div>
        <div class="form-group">
          <label>Rating:</label>
          <input
            type="number"
            value={book.value.rating}
            onChange$={(e) => (book.value.rating = e.target.value)}
          />
        </div>
        <div class="form-group">
          <label>Art:</label>
          <input
            type="text"
            value={book.value.art}
            onChange$={(e) => (book.value.art = e.target.value)}
          />
        </div>
        <div class="form-group">
          <label>Preis:</label>
          <input
            type="number"
            value={book.value.preis}
            onChange$={(e) => (book.value.preis = e.target.value)}
          />
        </div>
        <div class="form-group">
          <label>Rabatt:</label>
          <input
            type="number"
            value={book.value.rabatt}
            onChange$={(e) => (book.value.rabatt = e.target.value)}
          />
        </div>
        <div class="form-group">
          <label>Lieferbar:</label>
          <input
            type="checkbox"
            //toDo hier anpassen lieferbar datentyp -> ändern
            // checked={book.value.lieferbar}
            // onChange$={(e) => (book.value.lieferbar = e.target.checked)}
          />
        </div>
        <div class="form-group">
          <label>Datum:</label>
          <input
            type="date"
            value={book.value.datum}
            onChange$={(e) => (book.value.datum = e.target.value)}
          />
        </div>
        <div class="form-group">
          <label>Homepage:</label>
          <input
            type="text"
            value={book.value.homepage}
            onChange$={(e) => (book.value.homepage = e.target.value)}
          />
        </div>
        <div class="form-group">
          <label>Schlagwörter:</label>
          <input
            type="text"
            value={book.value.schlagwoerter}
            onChange$={(e) => (book.value.schlagwoerter = e.target.value)}
          />
        </div>
        <div class="form-group">
          <label>Titel:</label>
          <input
            type="text"
            value={book.value.titel.titel}
            onChange$={(e) => (book.value.titel.titel = e.target.value)}
          />
        </div>
        <div class="form-group">
          <label>Untertitel:</label>
          <input
            type="text"
            value={book.value.titel.untertitel}
            onChange$={(e) => (book.value.titel.untertitel = e.target.value)}
          />
        </div>
        <button
          onClick$={() => {
            createBook(book.value);
          }}
        >
          Buch erstellen
        </button>
      </div>
    </>
  );
});
