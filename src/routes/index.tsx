import { component$ } from "@builder.io/qwik";
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
              }
            }}
          >
            Suche Buch
          </button>
        </div>
      </div>
      <div class="text-center">
        <h1>Gefundene Bücher:</h1>
        {bookService && bookService.getFoundBook() && (
          <>
            <h2>Ergebnis:</h2>
            <h3>Titel: {bookService.getFoundBook().buch.titel.titel}</h3>
            <h3>ISBN: {bookService.getFoundBook().buch.isbn}</h3>
            <h3>Version: {bookService.getFoundBook().buch.version}</h3>
            <h3>Art: {bookService.getFoundBook().buch.art}</h3>
          </>
        )}
      </div>
    </div>
  );
});
