import { component$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import { getBooks } from "../components/BookSearch";

export default component$(() => {
  /* const handleSearch = 
  $(() => {
    const searchInput = document.querySelector('.search-input');
    const searchTerm = searchInput;
    getBooks(searchTerm);
  }); */

  return (
    <body>
      <input
        class="search-input"
        type="number"
        placeholder="Bücher suchen..."
      />
      <button
        class="search-button"
        // eslint-disable-next-line qwik/valid-lexical-scope
        onClick$={() => {
          const searchInput = document.querySelector(".search-input");
          if (searchInput instanceof HTMLInputElement) {
            const searchTerm = searchInput.value;
            getBooks(searchTerm);
            console.log("suche nach ID" + searchTerm);
          }
        }}
      >
        Suche Buch
      </button>
    </body>
  );
});

export const head: DocumentHead = {
  title: "Buecher suchen",
  meta: [
    {
      name: "description",
      content: "Qwik site description",
    },
  ],
};
