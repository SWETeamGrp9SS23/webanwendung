import { component$, useSignal } from '@builder.io/qwik';
import { getBooks } from '../../components/BookSearch';
//Fontawesome
import { FaIcon, FaStylesheet } from 'qwik-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

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

function displayBookDetails(book: any) {
  return (
    <div>
      <h2>Book Details</h2>
      <ul>
        <li>ISBN: {book.isbn}</li>
        <li>Homepage: {book.homepage}</li>
        <li>Rating: {book.rating}</li>
        <li>Preis: {book.preis}</li>
        <li>Rabatt: {book.rabatt}</li>
        <li>Titel: {book.titel.titel}</li>
        <li>Untertitel: {book.titel.untertitel}</li>
      </ul>
    </div>
  );
}

export default component$<BookSearchProps>(() => {
  const count = useSignal(0);
  const setBook = useSignal('');

  return (
    <>
      <head>
        <FaStylesheet />
      </head>
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
                const searchInput = document.querySelector('.form-control');
                if (searchInput instanceof HTMLInputElement) {
                  const searchTerm = searchInput.value;
                  console.log('suche nach ID: ' + searchTerm);
                  try {
                    const book = await getBooks(searchTerm);
                    console.log('Gefundenes Buch: ' + book);
                    // eslint-disable-next-line qwik/valid-lexical-scope
                    bookService.setFoundBook(book);
                    console.log(
                      'Buch im BookService:',
                      JSON.stringify(bookService.getFoundBook(), null, 2),
                    );
                    setBook.value = bookService.getFoundBook().buch;
                    console.log('ISBN: ' + setBook.value);
                  } catch (error: any) {
                    if (error.graphQLErrors) {
                      const message = error.graphQLErrors[0].message;
                      alert(message);
                    }
                  }
                }
              }}
            >
              <FaIcon icon={faSearch} />
              Suche Buch
            </button>
          </div>
        </div>
        <div class="text-center">
          <h1>Suchanfragen: {count.value}</h1>
          <h1>Gefundene Bücher:</h1>
          {setBook.value && displayBookDetails(setBook.value)}
        </div>
      </div>
    </>
  );
});
