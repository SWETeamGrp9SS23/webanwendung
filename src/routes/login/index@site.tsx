import { component$, useSignal } from '@builder.io/qwik';
import { authBooks } from '../../components/BookAuth';
import { FaIcon, FaStylesheet } from 'qwik-fontawesome';
import { faSignInAlt } from '@fortawesome/free-solid-svg-icons';
interface LoginProps {
  authService: AuthService;
}
class AuthService {
  private loggedInUser: any | null = null;
  setLoggedInUser(user: any) {
    this.loggedInUser = user;
  }
  getLoggedInUser() {
    return this.loggedInUser;
  }
}
interface Output {
  token: string;
  expiresIn: string;
  roles: string;
}

const authService = new AuthService();

export default component$<LoginProps>(() => {
  const setUsername = useSignal('');
  const setPassword = useSignal('');
  const getOutput = useSignal<Output>({ token: '', expiresIn: '', roles: '' });

  return (
    <>
      <head>
        <FaStylesheet />
      </head>
      <div class="container">
        <div class="input-group mb-3">
          <input
            type="text"
            class="form-control"
            placeholder="Benutzername"
            aria-label="Benutzername"
            aria-describedby="button-addon2"
            onInput$={(e) => {
              if (e.target instanceof HTMLInputElement) {
                setUsername.value = e.target.value;
              }
            }}
          />
        </div>
        <div class="input-group mb-3">
          <input
            type="password"
            class="form-control"
            placeholder="Passwort"
            aria-label="Passwort"
            aria-describedby="button-addon2"
            onInput$={(e) => {
              if (e.target instanceof HTMLInputElement) {
                setPassword.value = e.target.value;
              }
            }}
          />
        </div>
        <div class="input-group-append">
          <button
            class="btn btn-outline-secondary"
            type="button"
            id="button-addon2"
            onClick$={async () => {
              const username = setUsername.value;
              const password = setPassword.value;
              console.log(
                'Anmeldung mit Benutzername: ' +
                  username +
                  ' und Passwort: ' +
                  password,
              );
              try {
                const user = await authBooks(username, password);
                console.log('Angemeldeter Benutzer: ' + user);

                // eslint-disable-next-line qwik/valid-lexical-scope
                authService.setLoggedInUser(user);
                console.log(
                  'Benutzer im AuthService:',
                  JSON.stringify(authService.getLoggedInUser(), null, 2),
                );
                getOutput.value = authService.getLoggedInUser().login;
                console.log('User:');
                localStorage.setItem('jwtToken', getOutput.value.token);
              } catch (error: any) {
                if (error.graphQLErrors) {
                  const message = error.graphQLErrors[0].message;
                  alert(message);
                }
              }
            }}
          >
            <FaIcon icon={faSignInAlt} />
            Anmelden
          </button>
        </div>
        <div class="text-center">
          <h1>Daten vom Login:</h1>
          <div class="flex flex-col">
            <div class="flex">
              <div class="w-1/2 px-4 py-2 font-bold">Eigenschaft</div>
              <div class="w-1/2 px-4 py-2 font-bold">Wert</div>
            </div>
            <div class="flex">
              <div class="w-1/2 px-4 py-2">token</div>
              <div class="w-1/2 px-4 py-2">{getOutput.value.token}</div>
            </div>
            <div class="flex">
              <div class="w-1/2 px-4 py-2">expiresIn</div>
              <div class="w-1/2 px-4 py-2">{getOutput.value.expiresIn}</div>
            </div>
            <div class="flex">
              <div class="w-1/2 px-4 py-2">roles</div>
              <div class="w-1/2 px-4 py-2">{getOutput.value.roles}</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
});
