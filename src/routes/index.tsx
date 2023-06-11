import { component$, useSignal } from "@builder.io/qwik";
import { getBooks } from "../components/BookSearch";

interface BookSearchProps {
  bookService: BookService;
}

class BookService {
  private foundBook: any | null = null;
  setFoundBook(book: any) {
    this.foundBook = book;
  }
  getFoundBook() {
    return this.foundBook;
  }
}

const bookService = new BookService();

export default component$<BookSearchProps>(() => {
  const count = useSignal(0);
  const setBook = useSignal("");
    const setBookObject = useSignal("");


  return (
    <div class="container">
      <div class="input-group mb-3">
        <input
          type="number"
          class="form-control"
          placeholder="Bücher suchen..."
          aria-label="Bücher suchen..."
          aria-describedby="button-addon2"
        />
        <div class="input-group-append">
          <button
            class="btn btn-outline-secondary"
            type="button"
            id="button-addon2"
            onClick$={async () => {
              count.value++;
              const searchInput = document.querySelector(".form-control");
              if (searchInput instanceof HTMLInputElement) {
                const searchTerm = searchInput.value;
                console.log("suche nach ID: " + searchTerm);
                const book = await getBooks(searchTerm);
                console.log("Gefundenes Buch: " + book);

                // eslint-disable-next-line qwik/valid-lexical-scope
                bookService.setFoundBook(book);
                console.log(
                  "Buch im BookService:",
                  JSON.stringify(bookService.getFoundBook(), null, 2)
                );
                setBook.value = bookService.getFoundBook().buch;
                setBookObject.value = bookService.getFoundBook().buch.titel;
                console.log("ISBN: " + setBook.value);
              }
            }}
          >
            Suche Buch
          </button>
        </div>
      </div>
      <div class="text-center">
        <h1>Suchanfragen: {count.value}</h1> <h1>Gefundene Bücher:</h1>
        <h2>Ergebnis:</h2>
        <h2>ISBN: {setBook.value.isbn}</h2>
        <h2>Titel: {setBookObject.value.titel}</h2>
        <h2>Buchtyp: {setBook.value.__typename}</h2>
        <h2>Version: {setBook.value.version}</h2>
        <h2>Art: {setBook.value.art}</h2>
      </div>
    </div>
  );
});
