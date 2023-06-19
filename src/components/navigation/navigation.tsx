import { component$ } from '@builder.io/qwik';
import { Link } from '@builder.io/qwik-city';
import { FaIcon } from 'qwik-fontawesome';
import {
  faHome,
  faSearch,
  faSignInAlt,
  faBook,
} from '@fortawesome/free-solid-svg-icons';

export const Navigation = component$(() => {
  return (
    <div class="flex items-center justify-between bg-white shadow-xl py-5">
      <div class="ml-5">
        <FaIcon icon={faBook} size="2x" /> LOGO
      </div>
      <div class="mr-5">
        <ul class="flex space-x-10">
          <li>
            <Link href="/">
              <FaIcon icon={faHome} /> Home
            </Link>
          </li>
          <li>
            <Link href="/suchen/">
              <FaIcon icon={faSearch} /> Buch suchen
            </Link>
          </li>
          <li>
            <Link href="/login/">
              <FaIcon icon={faSignInAlt} /> Login
            </Link>
          </li>
          <li>
            <Link href="/erstellen/">
              <FaIcon icon={faBook} /> Buch erstellen
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
});
