import axios from 'axios';
import { createSignal } from 'solid-js';
import { createStore } from 'solid-js/store';
import EcoLogo from '../../components/3rEcoLogo';
import useState from '../../hooks/state';

let LoginPage = ({ toggleLogin = () => {} }) => {
  let [user, updateUser] = useState('userState');
  let [authenticationGuard, updateAuthenticationGuard] = useState(
    'authenticationGuard'
  );

  let [message, setMessage] = createStore({});

  let [username, setUsername] = createSignal('');
  let [password, setPassword] = createSignal('');

  let authenticate = () => {
    axios
      .post(
        'https://api.3reco.co.za/api/authentication/login',
        {
          username: username(),
          password: password(),
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      )
      .then((response) => {
        updateUser({
          ...response.data.data,
          userAuthenticationToken: undefined,
        });
        updateAuthenticationGuard({
          authenticationToken: response.data.data.userAuthenticationToken,
        });
      })
      .catch(() => {
        setMessage({ type: 'error', value: 'Authentication error.' });
      });
  };

  return (
    <div class="flex flex-col w-full h-full justify-center items-center bg-gray-200 dark:bg-gray-800">
      <div class="flex flex-col space-y-10 w-72 bg-white dark:bg-gray-900 rounded-md shadow p-5">
        <div class="flex justify-center items-center w-full h-full text-3xl text-emeral-800 dark:text-white">
          <EcoLogo />
        </div>

        {message.type && (
          <div
            class={`${message.type === 'error' && 'text-red-500'} ${
              message.type === 'success' && 'text-emeral-800'
            }`}
          >{message.value}</div>
        )}

        <div class="flex flex-col space-y-3">
          <input
            type="text"
            placeholder="Your username"
            class="bg-gray-200 dark:bg-gray-800 dark:text-white rounded px-3 py-2 outline-none"
            onChange={(event) => {
              setUsername(event.target.value);
            }}
          />
          <input
            type="password"
            placeholder="Your Password"
            class="bg-gray-200 dark:bg-gray-800 dark:text-white rounded px-3 py-2 outline-none"
            onChange={(event) => {
              setPassword(event.target.value);
            }}
          />
        </div>

        <div class="flex flex-col items-center space-y-3">
          <button
            class="px-3 py-2 bg-emerald-800 text-white rounded shadow select-none"
            onClick={() => authenticate()}
          >
            Login
          </button>
          <div class="dark:text-white select-none">
            Don't have an account?{' '}
            <span
              class="text-emerald-800 cursor-pointer"
              onClick={() => toggleLogin()}
            >
              Register
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
