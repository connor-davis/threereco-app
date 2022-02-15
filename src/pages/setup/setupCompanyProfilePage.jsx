import axios from 'axios';
import { useNavigate } from 'solid-app-router';
import { createSignal } from 'solid-js';
import { createStore } from 'solid-js/store';
import useState from '../../hooks/state';

let SetupCompanyProfilePage = () => {
  let [authState, updateAuthState] = useState('authenticationGuard');
  let [userState, updateUserState] = useState('userState');
  let [stage, setStage] = createSignal(0);
  let navigate = useNavigate();

  let [details, setDetails] = createStore(
    { userType: 'company' },
    { name: 'details' }
  );

  setTimeout(() => {
    setStage(stage() + 1);
  }, 3000);

  setTimeout(() => {
    setStage(stage() + 1);
  }, 6000);

  setTimeout(() => {
    setStage(stage() + 1);
  }, 9000);

  let completeProfile = () => {
    axios
      .post('https://api.3reco.co.za/api/users/edit', details, {
        headers: {
          authorization: 'Bearer ' + authState.authenticationToken,
        },
      })
      .then((response) => {
        if (response.status === 200) {
          setStage(stage() + 1);

          setTimeout(() => {
            setStage(0);

            navigate('/');

            updateUserState({ ...userState, ...response.data.data });
          }, 4000);
        }
      })
      .catch(() => {});
  };

  return (
    <div class="flex flex-col items-center w-full h-full bg-gray-200 dark:bg-gray-800 p-5">
      {stage() === 0 && (
        <div class="flex flex-col w-full h-full justify-center items-center dark:text-white">
          <div class="animate-fade-in text-center">
            Welcome to 3rEco, lets begin creating your profile.
          </div>
        </div>
      )}

      {stage() === 1 && (
        <div class="flex flex-col w-full h-full justify-center items-center dark:text-white">
          <div class="animate-fade-in text-center">
            Remember, you are allowed to leave things out, this is your profile.
          </div>
        </div>
      )}

      {stage() === 2 && (
        <div class="flex flex-col w-full h-full justify-center items-center dark:text-white">
          <div class="animate-fade-in text-center">
            Let's begin with your basic details.
          </div>
        </div>
      )}

      {stage() === 4 && (
        <div class="flex flex-col w-full h-full justify-center items-center dark:text-white">
          <div class="animate-fade-in text-center">
            Let's get your contact details.
          </div>
        </div>
      )}

      {stage() === 6 && (
        <div class="flex flex-col w-full h-full justify-center items-center dark:text-white">
          <div class="animate-fade-in text-center">
            Let's get your location details.
          </div>
        </div>
      )}

      {stage() === 8 && (
        <div class="flex flex-col w-full h-full justify-center items-center dark:text-white">
          <div class="animate-fade-in text-center">
            Thank you for setting up your profile, we look forward to working
            with you.
          </div>
        </div>
      )}

      {stage() === 3 && (
        <div class="flex flex-col w-full h-full justify-center items-center dark:text-white">
          <div class="animate-fade-in">
            <div class="flex space-x-2">
              {/* <div class="self-end">Back</div> */}
              <div class="flex flex-col space-y-5 p-5 bg-white dark:bg-gray-900 rounded shadow">
                <div class="flex flex-col space-y-2">
                  <div class="text-sm text-gray-500 dark:text-gray-400">
                    Company Name
                  </div>
                  <input
                    type="text"
                    placeholder="Company Name"
                    class="bg-gray-200 dark:bg-gray-800 dark:text-white rounded px-3 py-2 outline-none"
                    onChange={(event) => {
                      setDetails({
                        ...details,
                        userDisplayName: event.target.value,
                      });
                    }}
                  />
                </div>

                <div class="flex flex-col space-y-2">
                  <div class="text-sm text-gray-500 dark:text-gray-400">
                    Company Description
                  </div>
                  <div
                    type="text"
                    placeholder="Company Description"
                    class="bg-gray-200 dark:bg-gray-800 dark:text-white rounded px-3 py-2 outline-none w-64"
                    contentEditable={true}
                    onBlur={(event) => {
                      setDetails({
                        ...details,
                        userDescription: event.target.innerText,
                      });
                    }}
                  />
                </div>
              </div>
              <button
                class="self-end rounded-full p-2 bg-white dark:bg-gray-900 w-10 h-10 shadow"
                onClick={() => {
                  setStage(stage() + 1);

                  setTimeout(() => {
                    setStage(stage() + 1);
                  }, 3000);
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}

      {stage() === 5 && (
        <div class="flex flex-col w-full h-full justify-center items-center dark:text-white">
          <div class="animate-fade-in">
            <div class="flex space-x-2">
              <button
                class="self-end rounded-full p-2 bg-white dark:bg-gray-900 w-10 h-10 shadow"
                onClick={() => setStage(stage() - 2)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
              </button>
              <div class="flex flex-col space-y-5 p-5 bg-white dark:bg-gray-900 rounded shadow">
                <div class="flex flex-col space-y-2">
                  <div class="text-sm text-gray-500 dark:text-gray-400">
                    Phone Number
                  </div>
                  <input
                    type="tel"
                    placeholder="Phone Number"
                    class="bg-gray-200 dark:bg-gray-800 dark:text-white rounded px-3 py-2 outline-none"
                    onChange={(event) => {
                      setDetails({
                        ...details,
                        userPhoneNumber: event.target.value,
                      });
                    }}
                  />
                </div>

                <div class="flex flex-col space-y-2">
                  <div class="text-sm text-gray-500 dark:text-gray-400">
                    Email Address
                  </div>
                  <input
                    type="email"
                    placeholder="Email Address"
                    class="bg-gray-200 dark:bg-gray-800 dark:text-white rounded px-3 py-2 outline-none"
                    onChange={(event) => {
                      setDetails({
                        ...details,
                        userEmail: event.target.value,
                      });
                    }}
                  />
                </div>
              </div>
              <button
                class="self-end rounded-full p-2 bg-white dark:bg-gray-900 w-10 h-10 shadow"
                onClick={() => {
                  setStage(stage() + 1);

                  setTimeout(() => {
                    setStage(stage() + 1);
                  }, 3000);
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}

      {stage() === 7 && (
        <div class="flex flex-col w-full h-full justify-center items-center dark:text-white">
          <div class="animate-fade-in">
            <div class="flex space-x-2">
              <button
                class="self-end rounded-full p-2 bg-white dark:bg-gray-900 w-10 h-10 shadow"
                onClick={() => setStage(stage() - 2)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
              </button>
              <div class="flex flex-col space-y-5 p-5 bg-white dark:bg-gray-900 rounded shadow">
                <div class="flex flex-col space-y-2">
                  <div class="text-sm text-gray-500 dark:text-gray-400">
                    Street Address
                  </div>
                  <input
                    type="text"
                    placeholder="Street Address"
                    class="bg-gray-200 dark:bg-gray-800 dark:text-white rounded px-3 py-2 outline-none"
                    onChange={(event) => {
                      setDetails({
                        ...details,
                        userStreetAddress: event.target.value,
                      });
                    }}
                  />
                </div>

                <div class="flex flex-col space-y-2">
                  <div class="text-sm text-gray-500 dark:text-gray-400">
                    Suburb
                  </div>
                  <input
                    type="text"
                    placeholder="Suburb"
                    class="bg-gray-200 dark:bg-gray-800 dark:text-white rounded px-3 py-2 outline-none"
                    onChange={(event) => {
                      setDetails({
                        ...details,
                        userSuburb: event.target.value,
                      });
                    }}
                  />
                </div>

                <div class="flex flex-col space-y-2">
                  <div class="text-sm text-gray-500 dark:text-gray-400">
                    Ward
                  </div>
                  <input
                    type="text"
                    placeholder="Ward"
                    class="bg-gray-200 dark:bg-gray-800 dark:text-white rounded px-3 py-2 outline-none"
                    onChange={(event) => {
                      setDetails({
                        ...details,
                        userWard: event.target.value,
                      });
                    }}
                  />
                </div>

                <div class="flex flex-col space-y-2">
                  <div class="text-sm text-gray-500 dark:text-gray-400">
                    City
                  </div>
                  <input
                    type="text"
                    placeholder="City"
                    class="bg-gray-200 dark:bg-gray-800 dark:text-white rounded px-3 py-2 outline-none"
                    onChange={(event) => {
                      setDetails({
                        ...details,
                        userCity: event.target.value,
                      });
                    }}
                  />
                </div>

                <div class="flex flex-col space-y-2">
                  <div class="text-sm text-gray-500 dark:text-gray-400">
                    Area Code
                  </div>
                  <input
                    type="text"
                    placeholder="Area Code"
                    class="bg-gray-200 dark:bg-gray-800 dark:text-white rounded px-3 py-2 outline-none"
                    onChange={(event) => {
                      setDetails({
                        ...details,
                        userAreaCode: event.target.value,
                      });
                    }}
                  />
                </div>

                <div class="flex flex-col space-y-2">
                  <div class="text-sm text-gray-500 dark:text-gray-400">
                    Province
                  </div>
                  <input
                    type="text"
                    placeholder="Province"
                    class="bg-gray-200 dark:bg-gray-800 dark:text-white rounded px-3 py-2 outline-none"
                    onChange={(event) => {
                      setDetails({
                        ...details,
                        userProvince: event.target.value,
                      });
                    }}
                  />
                </div>

                <div class="flex flex-col space-y-2">
                  <div class="text-sm text-gray-500 dark:text-gray-400">
                    Country
                  </div>
                  <input
                    type="text"
                    placeholder="Country"
                    class="bg-gray-200 dark:bg-gray-800 dark:text-white rounded px-3 py-2 outline-none"
                    onChange={(event) => {
                      setDetails({
                        ...details,
                        userCountry: event.target.value,
                      });
                    }}
                  />
                </div>
              </div>
              <button
                class="self-end rounded-full p-2 bg-white dark:bg-gray-900 w-10 h-10 shadow"
                onClick={() => {
                  completeProfile();
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SetupCompanyProfilePage;
