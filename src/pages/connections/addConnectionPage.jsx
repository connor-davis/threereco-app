import axios from 'axios';
import { useNavigate } from 'solid-app-router';
import { createSignal, onMount } from 'solid-js';
import { createStore } from 'solid-js/store';
import useState from '../../hooks/state';

let AddConnectionPage = () => {
  let navigate = useNavigate();

  let [authState, setAuthState] = useState('authenticationGuard');

  let [users, setUsers] = createStore([], { name: 'users' });

  let [selectedUser, setSelectedUser] = createSignal('');

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

  return (
    <div class="flex flex-col space-y-5 w-full h-full p-2 rounded-t shadow bg-white dark:bg-gray-900">
      <div class="flex justify-between items-center">
        <div class="text-lg">Add Connection</div>
      </div>

      <div class="flex flex-col items-center space-y-5">
        <div class="flex w-full flex-col space-y-2">
          <input
            type="text"
            placeholder="Search by ID/Reg Number"
            class="bg-gray-200 dark:bg-gray-800 dark:text-white rounded px-3 py-2 outline-none"
            value={selectedUser()}
            onChange={(event) => setSelectedUser(event.target.value)}
          />
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
