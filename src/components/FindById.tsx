import { $, component$, useSignal } from "@builder.io/qwik";
import { ApolloClient, InMemoryCache } from "@apollo/client";
import { gql } from "graphql-tag";

//nur bei neu laden der Webseite werden die daten abgerufen und im server log angezeigt
// ist das normal oder muss ich das noch anders machen?

const client = new ApolloClient({
  uri: "https://localhost:3000/graphql",
  cache: new InMemoryCache(),
});

// Component

export const getBooksByISBN = component$(() => {

 // useSignal um den Suchbegriff zu speichern
  const searchTerm = useSignal("");
  console.log(searchTerm);

  // useSignal um die Bücher zu speichern in einer Liste
  const books = useSignal([] as any[]); // Standardwert als leeres Array vom Typ 'any[]'
  console.log(books);

  // zum aktualisieren der gespeichrten Bücher von books
  const setBooks = useSignal([]);
  console.log(books);

  // um zu entscheiden ob die werte angezeigt werden sollen oder nicht
  const showTable = useSignal(false);

  // zum aktualisieren der gespeichrten Bücher von showTable
  const setShowTable = useSignal(false);

const GET_Data = gql`
query {
  buch(isbn: ${searchTerm}) {
    version
    isbn
    art
    titel { 
      titel
    }

}}

// Hook glaube ich 
 export const BookSearch = async () => {

// hier separate funktionen für isbn, titel etc. und dann hier aufrufen

// Daten abrufen


// Daten anzeigen
  try {
// hier muss ich noch mit den Apollo docs chekcken wie ich das machen muss

    const { data } = await client.query({
      query: GET_Data,  
      variables: { isbn: searchTerm }
    });
    console.log(data);
  
    if (data ==! null || data ==! undefined || data ==! ot) {
      setBooks(data);
      setShowTable(true);
      setError('');
      console.log(data);

    } else {
      setBooks([]);
      setShowTable(false);
      setError('No books found.');
    }
  } catch (error) {
    console.error(error);
    setError('Error retrieving books.');
    setBooks([]);
    setShowTable(false);
  }

};
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
         <button class="search-button" onClick$={() => setBooks.value}>
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
          {books.value &&
            books.value.map((buch: any) => (
              <div class="book-row" key={buch.id}>
                <div class="book-column book-id">{buch.id}</div>
                <div class="book-column">{buch.version}</div>
                <div class="book-column">{buch.isbn}</div>
                <div class="book-column book-rating">{buch.rating}</div>
                <div class="book-column">{buch.art}</div>
                <div class="book-column">{buch.preis}</div>
                <div class="book-column">{buch.rabatt}</div>
                <div class="book-column">{buch.lieferbar}</div>
                <div class="book-column">{buch.datum}</div>
                <div class="book-column">{buch.homepage}</div>
                <div class="book-column">{buch.schlagwoerter}</div>
              </div>
            ))}
        </div>
      </div>
    </>
  );
}
