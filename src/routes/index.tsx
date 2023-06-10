import { component$ } from '@builder.io/qwik';
import {getBooks} from '../components/BookSearch';

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

 export default component$<BookSearchProps>(()  => {
  return (<body>
    <input
          class="search-input"
          type="number"
          placeholder="Bücher suchen..."
        />
    <button class="search-button"
    // eslint-disable-next-line qwik/valid-lexical-scope
    onClick$={async () => {
      const searchInput = document.querySelector('.search-input');
      if (searchInput instanceof HTMLInputElement) {
        const searchTerm = searchInput.value; 
        console.log("suche nach ID: " + searchTerm);
        const book = await getBooks(searchTerm);
        console.log("Gefundenes Buch: " + book);

        // eslint-disable-next-line qwik/valid-lexical-scope
        bookService.setFoundBook(book);
        console.log("Buch im BookService: " + bookService.getFoundBook());
      }
    }}>Suche Buch</button>
    {bookService && bookService.getFoundBook() && (
      <div>
        <h1>Gefundenes Buch: </h1>
        <h2>{bookService.getFoundBook().titel.titel}</h2>
        <p>ISBN: {bookService.getFoundBook().isbn}</p>
      </div>
    )}
  </body>);
});