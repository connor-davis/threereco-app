import axios from 'axios';
import { saveAs } from 'file-saver';
import moment from 'moment';
import { useNavigate } from 'solid-app-router';
import { createSignal, onMount } from 'solid-js';
import { createStore } from 'solid-js/store';
import useState from '../../hooks/state';

let MaterialsPage = () => {
  let navigate = useNavigate();

  let [authState, setAuthState] = useState('authenticationGuard');

  let [materials, setMaterials] = createStore([], { name: 'materials' });

  let [loading, setLoading] = createSignal(true);

  onMount(() => {
    setTimeout(() => {
      axios
        .get('https://api.3reco.co.za/api/materials/get', {
          headers: {
            authorization: 'Bearer ' + authState.authenticationToken,
          },
        })
        .then((response) => {
          if (response.status === 200) {
            setLoading(false);

            return setMaterials(
              [...response.data.data].sort((a, b) => {
                if (a.materialName > b.materialName) return 1;
                if (a.materialName < b.materialName) return -1;

                return 0;
              })
            );
          }
        });
    }, 300);
  });

  let deleteMaterial = (id) => {
    setTimeout(() => {
      axios
        .post(
          'https://api.3reco.co.za/api/materials/delete',
          { id },
          {
            headers: {
              authorization: 'Bearer ' + authState.authenticationToken,
            },
          }
        )
        .then((response) => {
          if (response.status === 200) {
            setMaterials(
              materials.map((material) => {
                if (material.id === id) return;
                else return material;
              })
            );

            return console.log(response.data.message);
          }
        });
    }, 300);
  };

  let exportMaterials = () => {
    setTimeout(() => {
      axios
        .get('https://api.3reco.co.za/api/exports/materials', {
          headers: {
            authorization: 'Bearer ' + authState.authenticationToken,
          },
          responseType: 'blob',
        })
        .then((response) => {
          if (response.status === 200) {
            saveAs(
              response.data,
              'Materials-' +
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
        <div class="text-lg">Materials</div>
        <div class="flex space-x-2">
          <button
            title="Add"
            class="flex space-x-2 items-center text-xs cursor-pointer p-2 rounded-md bg-gray-200"
            onClick={() => navigate('/materials/add')}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-4 w-46"
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

            <div class="hidden md:block">Add</div>
          </button>
          <button
            title="Export"
            class="flex space-x-2 items-center text-xs cursor-pointer p-2 rounded-md bg-gray-200"
            onClick={() => exportMaterials()}
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
                d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>

            <div class="hidden md:block">Export</div>
          </button>
        </div>
      </div>

      {!loading() &&
        materials.filter((material) => material !== (null || undefined))
          .length > 0 && (
          <div class="w-full h-full overflow-y-auto">
            <table class="table-auto w-full">
              <thead class="border-b border-gray-200 dark:border-gray-800">
                <tr>
                  <th class="p-3 text-left">Name</th>
                  <th class="p-3 text-left">Value</th>
                </tr>
              </thead>
              <tbody class="w-full">
                {materials.map((material) => (
                  <tr class="border-b w-full border-gray-200 dark:border-gray-800">
                    <td class="p-4">{material.materialName}</td>
                    <td class="p-4">R {material.materialValue}</td>
                    <td class="p-4 w-10">
                      <div
                        class="px-4 py-1 text-sm text-white bg-blue-500 rounded cursor-pointer"
                        onClick={() =>
                          navigate('/materials/edit/' + material.id)
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
                            d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                          />
                        </svg>
                      </div>
                    </td>
                    <td class="p-4 w-10">
                      <div
                        class="px-4 py-1 text-sm text-white bg-red-500 rounded cursor-pointer"
                        onClick={() => deleteMaterial(material.id)}
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
          Loading materials.
        </div>
      )}

      {!loading() &&
        materials.filter((material) => material !== (null || undefined))
          .length === 0 && (
          <div class="flex flex-col justify-center items-center w-full h-full select-none text-gray-500 dark:text-gray-400">
            You have no materials.
          </div>
        )}
    </div>
  );
};

export default MaterialsPage;
