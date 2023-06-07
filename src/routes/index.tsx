import { component$ } from '@builder.io/qwik';
import type { DocumentHead } from '@builder.io/qwik-city';
import {BookSearch} from '../components/BookSearch';
import {getBooks} from '../components/BookSearch';

getBooks(60)
  .then((data) => {
    console.log(data);
  })
  .catch((error) => {
    console.error(error)
  });

export default component$(() => {
  return (
    <BookSearch/>
  );
});

export const head: DocumentHead = {
  title: 'Welcome to Qwik',
  meta: [
    {
      name: 'description',
      content: 'Qwik site description',
    },
  ],
};
