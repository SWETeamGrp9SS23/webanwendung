import { component$, useSignal } from '@builder.io/qwik';
import { ApolloClient, InMemoryCache } from '@apollo/client';
import { gql } from 'graphql-tag';

const client = new ApolloClient({
  uri: 'https://localhost:3000/graphql',
  cache: new InMemoryCache(),
});

export async function getBooks(searchTerm: any) {
  if(typeof searchTerm !== 'number' || isNaN(searchTerm)) {
    return null;
  }
  const { data } = await client.query({ 
    query: gql `
  {
      buch(id: ${searchTerm}) {
          version
          isbn
          art
          titel {
              titel
        }
      }
    }
  ` });
  console.log(data);

  return data;
}

export const BookSearch = component$(() => {
  const searchTerm = useSignal('');
  const books = useSignal([]);
  const setBooks = useSignal([]);
  getBooks(searchTerm.value).then((data) => {
    setBooks.value = data;
  });

  return (
    <>
      <div class="book-search">
        <input
          class="search-input"
          type="number"
          placeholder="Bücher suchen..."
          value={searchTerm.value}
          onChange$={(e: any) => (searchTerm.value = e.target.value)}
        />
        <button
          class="search-button"
          onClick$={() =>
            getBooks(searchTerm.value).then((data) => (setBooks.value = data))
          }
        >
          Suchen
        </button>
        <div class="book-list">
          <div class="book-row">
            <div class="book-column book-id">ID</div>
            <div class="book-column">Version</div>
            <div class="book-column">ISBN</div>
            <div class="book-column book-rating">Rating</div>
            <div class="book-column">Art</div>
            <div class="book-column">Preis</div>
            <div class="book-column">Rabatt</div>
            <div class="book-column">Lieferbar</div>
            <div class="book-column">Datum</div>
            <div class="book-column">Homepage</div>
            <div class="book-column">Schlagwörter</div>
          </div>
          {books.value.map((book: any) => (
            <div class="book-row" key={book.id}>
              <div class="book-column book-id">{book.id}</div>
              <div class="book-column">{book.version}</div>
              <div class="book-column">{book.isbn}</div>
              <div class="book-column book-rating">{book.rating}</div>
              <div class="book-column">{book.art}</div>
              <div class="book-column">{book.preis}</div>
              <div class="book-column">{book.rabatt}</div>
              <div class="book-column">{book.lieferbar}</div>
              <div class="book-column">{book.datum}</div>
              <div class="book-column">{book.homepage}</div>
              <div class="book-column">{book.schlagwoerter}</div>
              <div class="book-column">{book.erzeugt}</div>
              <div class="book-column">{book.aktualisiert}</div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
});
