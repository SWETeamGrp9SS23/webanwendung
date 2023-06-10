import type { DocumentHead } from "@builder.io/qwik-city";
import { component$ } from "@builder.io/qwik";
import { Link } from "@builder.io/qwik-city";

export default component$(() => {
  return (
    <div>
      <h1>Home Page</h1>
    </div>
  );
});

export const head: DocumentHead = {
  title: "Home Page",
  meta: [
    {
      name: "description",
      content: "Qwik site description",
    },
  ],
};
