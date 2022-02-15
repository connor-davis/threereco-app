import axios from 'axios';
import { saveAs } from 'file-saver';
import moment from 'moment';
import { useNavigate } from 'solid-app-router';
import { createSignal, onMount } from 'solid-js';
import { createStore } from 'solid-js/store';
import useState from '../../hooks/state';

let ConnectionsPage = () => {
  let navigate = useNavigate();

  let [authState, setAuthState] = useState('authenticationGuard');

  let [connections, setConnections] = createStore([], { name: 'connections' });

  let [loading, setLoading] = createSignal(true);

  onMount(() => {
    setTimeout(() => {
      axios
        .get('https://api.3reco.co.za/api/connections/get', {
          headers: {
            authorization: 'Bearer ' + authState.authenticationToken,
          },
        })
        .then((response) => {
          if (response.status === 200) {
            setLoading(false);

            return setConnections([...response.data.data]);
          }
        });
    }, 300);
  });

  let deleteConnection = (id) => {
    setTimeout(() => {
      axios
        .post(
          'https://api.3reco.co.za/api/connections/delete',
          { id },
          {
            headers: {
              authorization: 'Bearer ' + authState.authenticationToken,
            },
          }
        )
        .then((response) => {
          if (response.status === 200) {
            setConnections(
              connections.map((connection) => {
                if (connection.id === id) return;
                else return connection;
              })
            );

            return console.log(response.data.message);
          }
        });
    }, 300);
  };

  let exportConnections = () => {
    setTimeout(() => {
      axios
        .get('https://api.3reco.co.za/api/exports/connections', {
          headers: {
            authorization: 'Bearer ' + authState.authenticationToken,
          },
          responseType: 'blob',
        })
        .then((response) => {
          if (response.status === 200) {
            saveAs(
              response.data,
              'Connections-' +
                moment(Date.now()).format('DD/MM/YYYY-HH:mm') +
                '.xlsx'
            );
          }
        });
    }, 300);
  };

  return (
    <div class="flex flex-col space-y-5 w-full h-full p-5 rounded-t shadow bg-white dark:bg-gray-900">
      <div class="flex justify-between items-center">
        <div class="text-lg">Connections</div>
        <div class="flex space-x-5">
          <div
            class="text-lg cursor-pointer"
            onClick={() => navigate('/connections/add')}
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
                d="M12 4v16m8-8H4"
              />
            </svg>
          </div>
          <div
            class="text-lg cursor-pointer"
            onClick={() => exportConnections()}
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
                d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
          </div>
        </div>
      </div>

      {!loading() &&
        connections.filter((material) => material !== (null || undefined))
          .length > 0 && (
          <div class="w-full h-full overflow-y-auto overflow-x-auto">
            <table class="table-auto w-full">
              <thead class="border-b border-gray-200 dark:border-gray-800">
                <tr>
                  <th class="p-3 text-left">Full Name</th>
                  <th class="p-3 text-left">Email</th>
                  <th class="p-3 text-left">Phone Number</th>
                </tr>
              </thead>
              <tbody class="w-full">
                {connections.map((connection) => (
                  <tr class="border-b w-full border-gray-200 dark:border-gray-800">
                    <td class="p-4">{connection.userDisplayName}</td>
                    <td class="p-4">{connection.userEmail}</td>
                    <td class="p-4">{connection.userPhoneNumber}</td>
                    <td class="p-4 w-10">
                      <div
                        class="px-4 py-1 text-sm text-white bg-red-500 rounded cursor-pointer"
                        onClick={() => deleteConnection(connection.user)}
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
                            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                          />
                        </svg>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

      {loading() && (
        <div class="flex flex-col justify-center items-center w-full h-full select-none text-gray-500 dark:text-gray-400">
          Loading connections.
        </div>
      )}

      {!loading() &&
        connections.filter((connection) => connection !== (null || undefined))
          .length === 0 && (
          <div class="flex flex-col justify-center items-center w-full h-full select-none text-gray-500 dark:text-gray-400">
            You have no connections.
          </div>
        )}
    </div>
  );
};

export default ConnectionsPage;
