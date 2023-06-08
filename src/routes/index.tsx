import { component$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import { BookSearch } from "../components/FindById";
import { getBooksById } from "../components/FindById";
import { FindByTitle } from "../components/FindByTitle";
import { FindByISBN } from "../components/FindByISBN";
import { Login } from "../components/Login";
import { Button } from "../components/Button";
import { BuchTable } from "../components/BuchTable";
import { useSignal } from "@builder.io/qwik";

console.log(getBooksById(1));


getBooksById(1)
  .then((data) => {
    console.log(data);
  })
  .catch((error) => {
    console.error(error);
  });

export default component$(() => {
  return (
    <>
      <div class="book-search">
        <h1>Bücher suchen</h1>
        <dih1>v className="bücher-menu">
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