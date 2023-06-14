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

const bookService = new BookService();

export default component$<BookCreateProps>(() => {
  const setBook = useSignal("");

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
        />
      </div>
      <div class="input-group mb-3">
        <input
          type="number"
          class="form-control"
          placeholder="Bewertung"
          aria-label="Bewertung"
          aria-describedby="button-addon2"
        />
      </div>
      <div class="input-group mb-3">
        <input
          type="text"
          class="form-control"
          placeholder="Art"
          aria-label="Art"
          aria-describedby="button-addon2"
        />
      </div>
      <div class="input-group mb-3">
        <input
          type="number"
          class="form-control"
          placeholder="Preis"
          aria-label="Preis"
          aria-describedby="button-addon2"
        />
      </div>
      <div class="input-group mb-3">
        <input
          type="number"
          class="form-control"
          placeholder="Rabatt"
          aria-label="Rabatt"
          aria-describedby="button-addon2"
        />
      </div>
      <div class="input-group mb-3">
        <select
          class="form-control"
          placeholder=""
          aria-label=""
          aria-describedby=""
        >
          <option value="" disabled selected>
            Lieferbar
          </option>
          <option value={true}>Ja</option>
          <option value={false}>Nein</option>
        </select>
      </div>
      <div class="input-group mb-3">
        <input
          type="date"
          class="form-control"
          placeholder=""
          aria-label=""
          aria-describedby=""
        />
      </div>
      <div class="input-group mb-3">
        <input
          type="text"
          class="form-control"
          placeholder="Homepage"
          aria-label="Homepage"
          aria-describedby="button-addon2"
        />
      </div>
      <div class="input-group mb-3">
        <input
          type="text"
          class="form-control"
          placeholder="Titel"
          aria-label="Titel"
          aria-describedby="button-addon2"
        />
      </div>
      <div class="input-group mb-3">
        <input
          type="text"
          class="form-control"
          placeholder="Untertitel"
          aria-label="Untertitel"
          aria-describedby="button-addon2"
        />
      </div>
      <div class="input-group mb-3">
        <input
          type="text"
          class="form-control"
          placeholder="Beschriftung"
          aria-label="Beschriftung"
          aria-describedby="button-addon2"
        />
      </div>
      <div class="input-group mb-3">
        <input
          type="text"
          class="form-control"
          placeholder="ContentType"
          aria-label="ContentType"
          aria-describedby="button-addon2"
        />
      </div>
      <div class="input-group-append">
        <button
          class="btn btn-outline-secondary"
          type="button"
          id="button-addon2"
          onClick$={async () => {
            const isbnInput = document.querySelector(
              'input[aria-label="ISBN"]'
            );
            const ratingInput = document.querySelector(
              'input[aria-label="Bewertung"]'
            );
            const artInput = document.querySelector('input[aria-label="Art"]');
            const preisInput = document.querySelector(
              'input[aria-label="Preis"]'
            );
            const rabattInput = document.querySelector(
              'input[aria-label="Rabatt"]'
            );
            const lieferbarInput = document.querySelector("select");
            const datumInput = document.querySelector("input[type='date']");
            const homepageInput = document.querySelector(
              'input[aria-label="Homepage"]'
            );
            const titelInput = document.querySelector(
              'input[aria-label="Titel"]'
            );
            const untertitelInput = document.querySelector(
              'input[aria-label="Untertitel"]'
            );
            const beschriftungInput = document.querySelector(
              "input[aria-label=Beschriftung]"
            );
            const contentTypeInput = document.querySelector(
              "input[aria-label=ContentType]"
            );

            if (
              isbnInput instanceof HTMLInputElement &&
              ratingInput instanceof HTMLInputElement &&
              artInput instanceof HTMLInputElement &&
              preisInput instanceof HTMLInputElement &&
              rabattInput instanceof HTMLInputElement &&
              lieferbarInput instanceof HTMLSelectElement &&
              datumInput instanceof HTMLInputElement &&
              homepageInput instanceof HTMLInputElement &&
              titelInput instanceof HTMLInputElement &&
              untertitelInput instanceof HTMLInputElement &&
              beschriftungInput instanceof HTMLInputElement &&
              contentTypeInput instanceof HTMLInputElement
            ) {
              const isbn = isbnInput.value;
              const rating = ratingInput.value;
              const art = artInput.value;
              const preis = preisInput.value;
              const rabatt = rabattInput.value;
              const lieferbar = lieferbarInput.value;
              const datum = datumInput.value;
              const homepage = homepageInput.value;
              const titel = titelInput.value;
              const untertitel = untertitelInput.value;
              const beschriftung = beschriftungInput.value;
              const contentType = contentTypeInput.value;

              const book = await createBooks({
                input: {
                  isbn,
                  rating,
                  art,
                  preis,
                  rabatt,
                  lieferbar,
                  datum,
                  homepage,
                  titel: {
                    titel,
                    untertitel,
                  },
                  abbildungen: [
                    {
                      beschriftung,
                      contentType,
                    },
                  ],
                },
              });
              console.log("Erstelltes Buch: ");
              console.log(book);

              // eslint-disable-next-line qwik/valid-lexical-scope
              bookService.setCreatedBook(book);
              console.log(
                "Buch im BookService:",
                JSON.stringify(bookService.getCreatedBook(), null, 2)
              );
              setBook.value = bookService.getCreatedBook().buch;
              console.log("Erstelltes Buch: ");
              console.log(book);
            }
          }}
        >
          Buch erstellen
        </button>
      </div>
    </div>
  );
});
