import axios from 'axios';
import { useNavigate } from 'solid-app-router';
import { createSignal } from 'solid-js';
import { createStore } from 'solid-js/store';
import EcoLogo from '../../components/3rEcoLogo';
import TermsAndConditionsModal from '../../components/modals/tsandcsModal';
import useState from '../../hooks/state';

let RegisterPage = ({ toggleLogin = () => {} }) => {
  let navigate = useNavigate();

  let [user, updateUser] = useState('userState');
  let [authenticationGuard, updateAuthenticationGuard] = useState(
    'authenticationGuard'
  );

  let [message, setMessage] = createStore({}, { name: 'message' });

  let [username, setUsername] = createSignal('');
  let [idNumber, setIdNumber] = createSignal('');
  let [password, setPassword] = createSignal('');
  let [confirmPassword, setConfirmPassword] = createSignal('');

  let [agreedToTermsAndConditions, setAgreedToTermsAndConditions] =
    createSignal(false);
  let [showTermsAndConditionsModal, setShowTermsAndConditionsModal] =
    createSignal(false);

  let authenticate = () => {
    if (idNumber() === '' || password() === '' || confirmPassword() === '')
      return setMessage({
        type: 'error',
        value: 'Please fill out all fields.',
      });
    if (!agreedToTermsAndConditions())
      return setMessage({
        type: 'error',
        value: 'You need to agree to the terms and conditions to register.',
      });
    if (password() !== confirmPassword())
      return setMessage({ type: 'error', value: 'Passwords do not match.' });
    else
      axios
        .post(
          'https://api.3reco.co.za/api/authentication/register',
          {
            username: username(),
            idNumber: idNumber(),
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

          navigate('/');
        })
        .catch(() => {
          setMessage({ type: 'error', value: 'Authentication error.' });
        });
  };

  return (
    <div class="flex flex-col w-full h-full justify-center items-center bg-gray-200 dark:bg-gray-800">
      {showTermsAndConditionsModal() && (
        <TermsAndConditionsModal
          onAgree={() => {
            setShowTermsAndConditionsModal(false);
            setAgreedToTermsAndConditions(true);
            console.log('User agreed');
          }}
          onDisagree={() => {
            setShowTermsAndConditionsModal(false);
            setAgreedToTermsAndConditions(false);
            console.log('User disagreed');
          }}
          onClose={() => setShowTermsAndConditionsModal(false)}
        />
      )}

      <div class="flex flex-col space-y-10 w-72 bg-white dark:bg-gray-900 rounded-md shadow p-5">
        <div class="flex justify-center items-center w-full h-full text-3xl text-emeral-800 dark:text-white">
          <EcoLogo />
        </div>

        {message.type && (
          <div
            class={`${message.type === 'error' && 'text-red-500'} ${
              message.type === 'success' && 'text-emeral-800'
            } w-full text-center`}
          >
            {message.value}
          </div>
        )}

        <div class="flex flex-col space-y-3">
        <input
            type="text"
            placeholder="Your username"
            class="bg-gray-200 dark:bg-gray-800 dark:text-white rounded px-3 py-2 outline-none"
            onChange={(event) => {
              setUsername(event.target.value);
            }}
            required
          />
          <input
            type="text"
            placeholder="Your ID/Reg Number"
            class="bg-gray-200 dark:bg-gray-800 dark:text-white rounded px-3 py-2 outline-none"
            onChange={(event) => {
              setIdNumber(event.target.value);
            }}
            required
          />
          <input
            type="password"
            placeholder="Your Password"
            class="bg-gray-200 dark:bg-gray-800 dark:text-white rounded px-3 py-2 outline-none"
            onChange={(event) => {
              setPassword(event.target.value);
            }}
            required
          />
          <input
            type="password"
            placeholder="Confirm Password"
            class="bg-gray-200 dark:bg-gray-800 dark:text-white rounded px-3 py-2 outline-none"
            onChange={(event) => {
              setConfirmPassword(event.target.value);
            }}
            required
          />
        </div>

        <div class="flex flex-col items-center space-y-3">
          <div class="flex justify-center items-center w-full space-x-2">
            <div
              class={`flex flex-col justify-center items-center w-5 h-5 rounded-full cursor-pointer ${
                agreedToTermsAndConditions() ? 'bg-green-500' : 'bg-gray-200'
              }`}
              onClick={() =>
                setAgreedToTermsAndConditions(!agreedToTermsAndConditions())
              }
            ></div>
            <div
              class="text-sm cursor-pointer hover:text-green-500"
              onClick={() => setShowTermsAndConditionsModal(true)}
            >
              Terms and Conditions
            </div>
          </div>
          <button
            class="px-3 py-2 bg-emerald-800 text-white rounded shadow select-none"
            onClick={() => authenticate()}
          >
            Register
          </button>
          <div class="dark:text-white select-none">
            Already have an account?{' '}
            <span
              class="text-emerald-800 cursor-pointer"
              onClick={() => toggleLogin()}
            >
              Login
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
