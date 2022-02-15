import axios from 'axios';
import { useNavigate } from 'solid-app-router';
import { createSignal, onMount } from 'solid-js';
import { createStore } from 'solid-js/store';
import useState from '../../hooks/state';

let AddConnectionPage = () => {
  let navigate = useNavigate();

  let [authState, setAuthState] = useState('authenticationGuard');
  let [userState, setUserState] = useState('userState');

  let [users, setUsers] = createStore([], { name: 'users' });

  let [searchTerm, setSearchTerm] = createSignal('');
  let [selectedUser, setSelectUser] = createSignal('');

  onMount(() => {
    setTimeout(() => {
      axios
        .get('https://api.3reco.co.za/api/users/get', {
          headers: {
            authorization: 'Bearer ' + authState.authenticationToken,
          },
        })
        .then((response) => {
          if (response.status === 200) {
            return setUsers([...response.data.data]);
          }
        });
    }, 300);
  });

  let addConnection = (id) => {
    axios
      .post(
        'https://api.3reco.co.za/api/connections/add',
        { id },
        {
          headers: {
            authorization: 'Bearer ' + authState.authenticationToken,
          },
        }
      )
      .then((response) => {
        if (response.status === 200) {
          navigate('/connections');
        }
      });
  };

  let filterUsersBy = (term) => {
    setUsers(
      users.filter((user) => {
        if (user.userIdNumber.includes(term)) return user;
        else return undefined;
      })
    );
  };

  return (
    <div class="flex flex-col space-y-5 w-full h-full p-2 rounded-t shadow bg-white dark:bg-gray-900">
      <div class="flex justify-between items-center">
        <div class="text-lg">Add Connection</div>
      </div>

      <div class="flex flex-col items-center space-y-5">
        <div class="flex w-full flex-col space-y-2">
          <input
            type="text"
            placeholder="Search by User Id"
            class="bg-gray-200 dark:bg-gray-800 dark:text-white rounded px-3 py-2 outline-none"
            onKeyUp={(event) => {
              setSearchTerm(event.target.value);
            }}
          />
        </div>

        <div class="flex w-full flex-col space-y-2">
          {searchTerm() !== '' && (
            <div class="w-full h-full overflow-y-auto">
              <table class="table-auto w-full">
                <thead class="border-b border-gray-200 dark:border-gray-800">
                  <tr>
                    <th class="p-3 text-left">Full Name</th>
                    <th class="p-3 text-left">Email</th>
                  </tr>
                </thead>
                <tbody class="w-full">
                  {users.map(
                    (user) =>
                      user.userIdNumber.includes(searchTerm()) && (
                        <tr
                          class={`border-b w-full border-gray-200 dark:border-gray-800 ${
                            selectedUser() === user.id && 'bg-green-300'
                          }`}
                        >
                          <td class="p-4">{user.userDisplayName}</td>
                          <td class="p-4">{user.userEmail}</td>
                          <td class="p-4 w-10">
                            <div
                              class="px-4 py-1 text-sm text-white bg-blue-500 rounded cursor-pointer"
                              onClick={() => setSelectUser(user.id)}
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                class="h-4 w-4"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                  stroke-width="2"
                                  d="M5 13l4 4L19 7"
                                />
                              </svg>
                            </div>
                          </td>
                        </tr>
                      )
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>

        <div class="flex space-x-3 items-center">
          <button
            class="px-3 py-2 bg-emerald-800 text-white rounded shadow select-none"
            onClick={() => navigate('/connections')}
          >
            Cancel
          </button>
          <button
            class="px-3 py-2 bg-emerald-800 text-white rounded shadow select-none"
            onClick={() => addConnection(selectedUser())}
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddConnectionPage;
