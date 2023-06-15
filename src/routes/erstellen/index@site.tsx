import { component$, useSignal } from "@builder.io/qwik";
import { createBooks } from "../../components/BookCreate";

//toDo wie müssen Wir
interface BookCreateProps {
  bookService: BookService;
}

class BookService {
  private createdBook: any | null = null;
  setCreatedBook(book: any) {
    this.createdBook = book;
  }
  getCreatedBook() {
    return this.createdBook;
  }
}

export default component$<BookCreateProps>(() => {
  const setIsbn = useSignal("");
  const setHomepage = useSignal("");
  const setTitel = useSignal("");
  const setUntertitel = useSignal("");
  const setBeschriftung = useSignal("");
  const setContentType = useSignal("");

  return (
    <div class="container">
      <h1>Buch erstellen</h1>
      <div class="input-group mb-3">
        <input
          type="text"
          class="form-control"
          placeholder="ISBN"
          aria-label="ISBN"
          aria-describedby="button-addon2"
          onInput$={(e) => (setIsbn.value = e.target.value)}
        />
      </div>
      <div class="input-group mb-3">
        <input
          type="text"
          class="form-control"
          placeholder="Homepage"
          aria-label="Homepage"
          aria-describedby="button-addon2"
          onInput$={(e) => (setHomepage.value = e.target.value)}
        />
      </div>
      <div class="input-group mb-3">
        <input
          type="text"
          class="form-control"
          placeholder="Titel"
          aria-label="Titel"
          aria-describedby="button-addon2"
          onInput$={(e) => (setTitel.value = e.target.value)}
        />
      </div>
      <div class="input-group mb-3">
        <input
          type="text"
          class="form-control"
          placeholder="Untertitel"
          aria-label="Untertitel"
          aria-describedby="button-addon2"
          onInput$={(e) => (setUntertitel.value = e.target.value)}
        />
      </div>
      <div class="input-group mb-3">
        <input
          type="text"
          class="form-control"
          placeholder="Beschriftung"
          aria-label="Beschriftung"
          aria-describedby="button-addon2"
          onInput$={(e) => (setBeschriftung.value = e.target.value)}
        />
      </div>
      <div class="input-group mb-3">
        <input
          type="text"
          class="form-control"
          placeholder="ContentType"
          aria-label="ContentType"
          aria-describedby="button-addon2"
          onInput$={(e) => (setContentType.value = e.target.value)}
        />
      </div>
      <div class="input-group-append">
        <button
          class="btn btn-outline-secondary"
          type="button"
          id="button-addon2"
          onClick$={async () => {
            const isbn = setIsbn.value;
            const homepage = setHomepage.value;
            const titel = setTitel.value;
            const untertitel = setUntertitel.value;
            const beschriftung = setBeschriftung.value;
            const contentType = setContentType.value;

            const book = await createBooks( isbn, homepage,
                                            titel, untertitel, beschriftung, contentType);
            console.log("Erstelltes Buch: " + book);
          }}
        >
          Buch Suchen
        </button>
      </div>
    </div>
  );
});
