import { component$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import { getBooksByISBN } from "../components/FindById";

import { useSignal } from "@builder.io/qwik";




export default component$(() => {
  return (
    <>
      <div class="book-search">
        <h1>Bücher suchen</h1>
        <dih1>v className="buecher-menu">
          <BookSearch />
          <FindByTitle />
          <FindByISBN />
          <Login />
        </dih1>
        <header className="buch-header">
          <Button onClick={getBook}>Get Book</Button>
          {showTable && <BuchTable buecher={buecher} />}
        </header>
      </div>
    </>
  );

});