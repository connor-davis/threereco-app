import axios from 'axios';
import { useNavigate } from 'solid-app-router';
import { createSignal, onMount } from 'solid-js';
import { createStore } from 'solid-js/store';
import useState from '../../hooks/state';

let AddSalePage = () => {
  let navigate = useNavigate();

  let [authState, setAuthState] = useState('authenticationGuard');
  let [userState, setUserState] = useState('userState');

  let [connections, setConnections] = createStore([], { name: 'connections' });
  let [materials, setMaterials] = createStore([], { name: 'materials' });

  let [searchUser, setSearchUser] = createSignal('');

  let [saleDetails, setSaleDetails] = createStore(
    { type: 'sale' },
    { name: 'sale-details' }
  );

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
            return setConnections([...response.data.data]);
          }
        });

      axios
        .get('https://api.3reco.co.za/api/materials/get', {
          headers: {
            authorization: 'Bearer ' + authState.authenticationToken,
          },
        })
        .then((response) => {
          if (response.status === 200) {
            return setMaterials([...response.data.data]);
          }
        });
    }, 300);
  });

  let addSale = () => {
    axios
      .post('https://api.3reco.co.za/api/transactions/add', saleDetails, {
        headers: {
          authorization: 'Bearer ' + authState.authenticationToken,
        },
      })
      .then((response) => {
        if (response.status === 200) {
          navigate('/transactions');
        }
      });
  };

  return (
    <div class="flex flex-col space-y-5 w-full h-full p-5 rounded-t shadow bg-white dark:bg-gray-900 select-none">
      <div class="flex justify-between items-center">
        <div class="text-lg">Add Sale</div>
        <div
          class="text-lg cursor-pointer"
          onClick={() => navigate('/transactions')}
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
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </div>
      </div>

      <div class="flex flex-col md:flex-row space-y-5 space-x-0 md:space-x-5 md:space-y-0 overflow-y-auto">
        <div class="flex w-full flex-col space-y-5">
          <div class="flex flex-col w-full h-64 overflow-y-auto border-l border-t border-r border-b border-gray-200 dark:border-gray-800 rounded p-2">
            <div class="flex w-full flex-col space-y-2">
              <div class="flex w-full flex-col space-y-2 flex-none">
                <input
                  type="text"
                  placeholder="Search by User Id"
                  class="bg-gray-200 dark:bg-gray-800 dark:text-white rounded px-3 py-2 outline-none"
                  onKeyUp={(event) => {
                    setSearchUser(event.target.value);
                  }}
                />
              </div>
              <div class="w-full h-full overflow-y-auto">
                <table class="table-auto w-full">
                  <thead class="border-b border-gray-200 dark:border-gray-800">
                    <tr>
                      <th class="p-3 text-left">Full Name</th>
                      <th class="p-3 text-left">Email</th>
                    </tr>
                  </thead>
                  <tbody class="relative w-full h-full overflow-y-scroll">
                    {connections.map(
                      (connection) =>
                        (connection.initiator.id === userState.id
                          ? connection.connection.userIdNumber.startsWith(
                              searchUser()
                            )
                          : connection.initiator.userIdNumber.startsWith(
                              searchUser()
                            )) && (
                          <tr
                            class={`border-b w-full border-gray-200 dark:border-gray-800 ${
                              saleDetails.purchaser &&
                              saleDetails.purchaser.id === connection.id &&
                              'bg-green-300'
                            }`}
                          >
                            <td class="p-4">
                              {connection.initiator.userIdNumber ===
                              userState.userIdNumber
                                ? connection.connection.userDisplayName
                                : connection.initiator.userDisplayName}
                            </td>
                            <td class="p-4">
                              {connection.initiator.userIdNumber ===
                              userState.userIdNumber
                                ? connection.connection.userEmail
                                : connection.initiator.userEmail}
                            </td>
                            <td class="p-4 w-10">
                              <div
                                class="px-4 py-1 text-sm text-white bg-blue-500 rounded cursor-pointer"
                                onClick={() =>
                                  setSaleDetails(
                                    'purchaser',
                                    connection.initiator.userIdNumber ===
                                      userState.userIdNumber
                                      ? connection.connection
                                      : connection.initiator
                                  )
                                }
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
            </div>
          </div>

          <div class="flex flex-col w-full h-64 overflow-y-auto border-l border-t border-r border-b border-gray-200 dark:border-gray-800 rounded p-2">
            <div class="flex w-full flex-col space-y-2">
              <div class="w-full h-full overflow-hidden">
                <table class="table-auto w-full h-full overflow-hidden">
                  <thead class="border-b border-gray-200 dark:border-gray-800">
                    <tr>
                      <th class="p-3 text-left">Name</th>
                      <th class="p-3 text-left">Value</th>
                    </tr>
                  </thead>
                  <tbody class="relative w-full h-full overflow-y-auto">
                    {materials.map((material) => (
                      <tr
                        class={`border-b w-full border-gray-200 dark:border-gray-800 ${
                          saleDetails.material &&
                          saleDetails.material.id === material.id &&
                          'bg-green-300'
                        }`}
                      >
                        <td class="p-4">{material.materialName}</td>
                        <td class="p-4">R {material.materialValue}</td>
                        <td class="p-4 w-10">
                          <div
                            class="px-4 py-1 text-sm text-white bg-blue-500 rounded cursor-pointer"
                            onClick={() => setSaleDetails('material', material)}
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
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        <div class="flex flex-col w-full">
          <div
            class={`flex flex-col w-full ${
              !saleDetails.purchaser || !saleDetails.material
                ? 'h-96 opacity-50 cursor-not-allowed'
                : 'h-auto'
            } overflow-y-auto border-l border-t border-r border-b border-gray-200 dark:border-gray-800 rounded p-2`}
          >
            <div class="flex flex-col space-y-5">
              {saleDetails.purchaser && (
                <div class="flex flex-col space-y-2 overflow-x-auto">
                  <div class="text-lg font-bold">Purchaser Details</div>
                  <table class="table-auto w-full h-full overflow-hidden">
                    <thead class="border-b border-gray-200 dark:border-gray-800">
                      <tr>
                        <th class="p-3 text-left">Full Name</th>
                        <th class="p-3 text-left">Email</th>
                      </tr>
                    </thead>
                    <tbody class="relative w-full h-full overflow-y-auto">
                      <tr
                        class={`border-b w-full border-gray-200 dark:border-gray-800`}
                      >
                        <td class="p-4">
                          {saleDetails.purchaser.userDisplayName}
                        </td>
                        <td class="p-4">{saleDetails.purchaser.userEmail}</td>
                        <td class="p-4 w-10">
                          <div
                            class="px-4 py-1 text-sm text-white bg-blue-500 rounded cursor-pointer"
                            onClick={() =>
                              setSaleDetails('purchaser', undefined)
                            }
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
                                d="M6 18L18 6M6 6l12 12"
                              />
                            </svg>
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              )}
              {saleDetails.material && (
                <div class="flex flex-col space-y-2">
                  <div class="text-lg font-bold">Material Details</div>
                  <table class="table-auto w-full h-full overflow-hidden">
                    <thead class="border-b border-gray-200 dark:border-gray-800">
                      <tr>
                        <th class="p-3 text-left">Name</th>
                        <th class="p-3 text-left">Value</th>
                      </tr>
                    </thead>
                    <tbody class="relative w-full h-full overflow-y-auto">
                      <tr
                        class={`border-b w-full border-gray-200 dark:border-gray-800`}
                      >
                        <td class="p-4">{saleDetails.material.materialName}</td>
                        <td class="p-4">
                          {saleDetails.material.materialValue}
                        </td>
                        <td class="p-4 w-10">
                          <div
                            class="px-4 py-1 text-sm text-white bg-blue-500 rounded cursor-pointer"
                            onClick={() =>
                              setSaleDetails('material', undefined)
                            }
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
                                d="M6 18L18 6M6 6l12 12"
                              />
                            </svg>
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              )}
              <div class="flex flex-col space-y-5">
                <div class="flex w-full flex-col space-y-2 flex-none">
                  <input
                    type="text"
                    placeholder="Weight"
                    disabled={!saleDetails.purchaser || !saleDetails.material}
                    class={`bg-gray-200 dark:bg-gray-800 dark:text-white rounded px-3 py-2 outline-none ${
                      !saleDetails.purchaser || !saleDetails.material
                        ? 'opacity-50 cursor-not-allowed'
                        : ''
                    }`}
                    onKeyUp={(event) => {
                      setSaleDetails('weight', parseFloat(event.target.value));
                      setSaleDetails(
                        'price',
                        saleDetails.material
                          ? parseFloat(saleDetails.material.materialValue) *
                              parseFloat(event.target.value)
                          : 0
                      );
                    }}
                  />
                </div>

                <div class="text-lg font-bold">
                  Sale Weight: {saleDetails.weight || 0} kg
                </div>

                <div class="text-lg font-bold">
                  Sale Price: R {saleDetails.price || 0}
                </div>

                <div class="flex space-x-3 items-center h-full">
                  <button
                    disabled={!saleDetails.purchaser || !saleDetails.material}
                    class={`px-3 py-2 bg-emerald-800 text-white rounded shadow select-none ${
                      !saleDetails.purchaser || !saleDetails.material
                        ? 'opacity-50 cursor-not-allowed'
                        : ''
                    }`}
                    onClick={() => navigate('/transactions')}
                  >
                    Cancel
                  </button>
                  <button
                    disabled={!saleDetails.purchaser || !saleDetails.material}
                    class={`px-3 py-2 bg-emerald-800 text-white rounded shadow select-none ${
                      !saleDetails.purchaser || !saleDetails.material
                        ? 'opacity-50 cursor-not-allowed'
                        : ''
                    }`}
                    onClick={() => addSale()}
                  >
                    Continue
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddSalePage;
