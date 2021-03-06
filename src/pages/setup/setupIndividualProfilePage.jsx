import axios from 'axios';
import { useNavigate } from 'solid-app-router';
import { createSignal } from 'solid-js';
import { createStore } from 'solid-js/store';
import DropDown from '../../components/dropdown/DropDown';
import DropDownItem from '../../components/dropdown/DropDownItem';
import useState from '../../hooks/state';

let SetupIndividualProfilePage = () => {
  let [authState, updateAuthState] = useState('authenticationGuard');
  let [userState, updateUserState] = useState('userState');
  let [stage, setStage] = createSignal(0);
  let navigate = useNavigate();

  let [details, setDetails] = createStore(
    { userType: 'individual' },
    { name: 'details' }
  );

  let [userGender, setUserGender] = createSignal('Select');
  let [userEthnicity, setUserEthnicity] = createSignal('Select');

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
            Remember, keep things professional and fill in all your details we
            ask for. Your data is safe with us.
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
                    Full Name
                  </div>
                  <input
                    type="text"
                    placeholder="Full Name"
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
                    About You
                  </div>
                  <div
                    type="text"
                    placeholder="About You"
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

                <div class="flex flex-col space-y-2">
                  <div class="text-sm text-gray-500 dark:text-gray-400">
                    Gender
                  </div>
                  <div class="bg-gray-200 dark:bg-gray-800 dark:text-white rounded px-3 py-2 outline-none w-64">
                    <DropDown text={userGender}>
                      <DropDownItem
                        text={'Male'}
                        onClick={() => {
                          setUserGender('Male');
                          setDetails({ ...details, userGender: 'Male' });
                        }}
                      />

                      <DropDownItem
                        text={'Female'}
                        onClick={() => {
                          setUserGender('Female');
                          setDetails({ ...details, userGender: 'Female' });
                        }}
                      />
                    </DropDown>
                  </div>
                </div>

                <div class="flex flex-col space-y-2">
                  <div class="text-sm text-gray-500 dark:text-gray-400">
                    Ethnicity
                  </div>
                  <div class="bg-gray-200 dark:bg-gray-800 dark:text-white rounded px-3 py-2 outline-none w-64">
                    <DropDown text={userEthnicity}>
                      <DropDownItem
                        text={'White'}
                        onClick={() => {
                          setUserEthnicity('White');
                          setDetails({ ...details, userEthnicity: 'White' });
                        }}
                      />

                      <DropDownItem
                        text={'Coloured'}
                        onClick={() => {
                          setUserEthnicity('Coloured');
                          setDetails({ ...details, userEthnicity: 'Coloured' });
                        }}
                      />

                      <DropDownItem
                        text={'Indian'}
                        onClick={() => {
                          setUserEthnicity('Indian');
                          setDetails({ ...details, userEthnicity: 'Indian' });
                        }}
                      />

                      <DropDownItem
                        text={'Black'}
                        onClick={() => {
                          setUserEthnicity('Black');
                          setDetails({ ...details, userEthnicity: 'Black' });
                        }}
                      />
                    </DropDown>
                  </div>
                </div>

                <div class="flex flex-col space-y-2">
                  <div class="text-sm text-gray-500 dark:text-gray-400">
                    Age
                  </div>
                  <input
                    type="text"
                    placeholder="Age"
                    class="bg-gray-200 dark:bg-gray-800 dark:text-white rounded px-3 py-2 outline-none"
                    onChange={(event) => {
                      setDetails({
                        ...details,
                        userAge: event.target.value,
                      });
                    }}
                  />
                </div>
              </div>
              <button
                class="self-end rounded-full p-2 bg-white dark:bg-gray-900 w-10 h-10 shadow"
                disabled={
                  !details.userDisplayName ||
                  !details.userDescription ||
                  !details.userGender ||
                  !details.userEthnicity ||
                  !details.userAge
                }
                title={
                  !details.userDisplayName ||
                  !details.userDescription ||
                  !details.userGender ||
                  !details.userEthnicity ||
                  !details.userAge
                    ? 'Enter all fields.'
                    : 'Next'
                }
                onClick={() => {
                  if (
                    !details.userDisplayName ||
                    !details.userDescription ||
                    !details.userGender ||
                    !details.userEthnicity ||
                    !details.userAge
                  ) {
                    return;
                  }

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
                title="Back"
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
                disabled={!details.userPhoneNumber}
                title={!details.userPhoneNumber ? 'Enter all fields.' : 'Next'}
                onClick={() => {
                  if (!details.userPhoneNumber) {
                    return;
                  }

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
                title="Back"
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
                disabled={
                  !details.userStreetAddress ||
                  !details.userSuburb ||
                  !details.userWard ||
                  !details.userCity ||
                  !details.userAreaCode ||
                  !details.userProvince ||
                  !details.userCountry
                }
                title={
                  !details.userStreetAddress ||
                  !details.userSuburb ||
                  !details.userWard ||
                  !details.userCity ||
                  !details.userAreaCode ||
                  !details.userProvince ||
                  !details.userCountry
                    ? 'Enter all fields.'
                    : 'Next'
                }
                onClick={() => {
                  if (
                    !details.userStreetAddress ||
                    !details.userSuburb ||
                    !details.userWard ||
                    !details.userCity ||
                    !details.userAreaCode ||
                    !details.userProvince ||
                    !details.userCountry
                  ) {
                    return;
                  }

                  completeProfile();
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  stroke-width="2"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M5 13l4 4L19 7"
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

export default SetupIndividualProfilePage;
