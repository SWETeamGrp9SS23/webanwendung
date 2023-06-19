import type { DocumentHead } from '@builder.io/qwik-city';
import { component$ } from '@builder.io/qwik';
import { FaIcon, FaStylesheet } from 'qwik-fontawesome';
import { faHome } from '@fortawesome/free-solid-svg-icons';

export default component$(() => {
  return (
    <>
      <head>
        <FaStylesheet />
      </head>
      <div>
        <h1>
          <FaIcon icon={faHome} /> Home Page
        </h1>
        <p>
          Qwik is a new kind of web framework that can deliver instant loading
          web applications at any size or complexity.,
        </p>
        <p>
          Qwik is optimized to let the browser just download the styles that are
          needed for the current view.,
        </p>
        <p>
          Qwik has first-class CSS-in-JS support using styled-vanilla-extract,
          which provides an extremely efficient css-in-js solution without any
          runtime!,
        </p>
      </div>
    </>
  );
});

export const head: DocumentHead = {
  title: 'Home Page',
  meta: [
    {
      name: 'Nice Web Application',
      content: 'Website description',
    },
  ],
};
