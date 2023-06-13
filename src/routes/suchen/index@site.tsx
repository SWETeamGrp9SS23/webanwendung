import { component$, useSignal } from "@builder.io/qwik";
import { getBooks } from "../../components/BookSearch";

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
                try {
                  const book = await getBooks(searchTerm);
                  console.log("Gefundenes Buch: " + book);
                  // eslint-disable-next-line qwik/valid-lexical-scope
                  bookService.setFoundBook(book);
                  console.log(
                    "Buch im BookService:",
                    JSON.stringify(bookService.getFoundBook(), null, 2),
                  );
                  setBook.value = bookService.getFoundBook().buch;
                  setBookObject.value = bookService.getFoundBook().buch.titel;
                  console.log("ISBN: " + setBook.value);
                } catch (error: any) {
                  if (error.graphQLErrors) {
                    const message = error.graphQLErrors[0].message;
                    alert(message);
                  }
                }
              }
            }}
          >
            Suche Buch
          </button>
        </div>
      </div>
      <div class="text-center">
        <h1>Suchanfragen: {count.value}</h1>
        <h1>Gefundene Bücher:</h1>
        <div class="flex flex-col">
          <div class="flex">
            <div class="w-1/2 px-4 py-2 font-bold">Eigenschaft</div>
            <div class="w-1/2 px-4 py-2 font-bold">Wert</div>
          </div>
          <div class="flex">
            <div class="w-1/2 px-4 py-2">ISBN</div>
            <div class="w-1/2 px-4 py-2">{setBook.value.isbn}</div>
          </div>
          <div class="flex">
            <div class="w-1/2 px-4 py-2">Titel</div>
            <div class="w-1/2 px-4 py-2">{setBookObject.value.titel}</div>
          </div>
          <div class="flex">
            <div class="w-1/2 px-4 py-2">Buchtyp</div>
            <div class="w-1/2 px-4 py-2">{setBook.value.__typename}</div>
          </div>
          <div class="flex">
            <div class="w-1/2 px-4 py-2">Version</div>
            <div class="w-1/2 px-4 py-2">{setBook.value.version}</div>
          </div>
          <div class="flex">
            <div class="w-1/2 px-4 py-2">Art</div>
            <div class="w-1/2 px-4 py-2">{setBook.value.art}</div>
          </div>
        </div>
      </div>
    </div>
  );
});
