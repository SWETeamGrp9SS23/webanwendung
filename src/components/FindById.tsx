import { $, component$, useSignal } from "@builder.io/qwik";
import { ApolloClient, InMemoryCache } from "@apollo/client";
import { gql } from "graphql-tag";

//nur bei neu laden der Webseite werden die daten abgerufen und im server log angezeigt
// ist das normal oder muss ich das noch anders machen?

const client = new ApolloClient({
  uri: "https://localhost:3000/graphql",
  cache: new InMemoryCache(),
});


export async function getBooksById() {

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

 const BookSearch = async () => {
// vielleicht hier eine if klasuel um zu checken ob eine zahl dann wird der rest ausgeführt sonst wird in
// find by titel etc injectetd und dann wird das ausgeführt

// hier separate funktionen für isbn, titel etc. und dann hier aufrufen
const GET_Data = gql`
query {
  buch(id: ${searchTerm}) {
    version
    isbn
    art
    titel { 
      titel
    }
  }

    try {
    // hier will ich die daten abrufen und dann in die liste speichern

    const { data } = await client.query({
      query: GET_Data,  
      variables: { id: searchTerm }
    });
    console.log(data);

    // Mittagspause
    if (data._embedded && data._embedded.buecher) {
      setBooks(data._embedded.buecher);
      setShowTable(true);
      setError('');
      console.log(data._embedded.buecher);
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



  return data;
}




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
        <button class="search-button" onClick={BookSearch}>
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
});


