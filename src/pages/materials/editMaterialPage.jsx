import axios from 'axios';
import { useNavigate, useParams } from 'solid-app-router';
import { onMount } from 'solid-js';
import { createStore } from 'solid-js/store';
import useState from '../../hooks/state';

let EditMaterialPage = () => {
  let { id } = useParams();
  let navigate = useNavigate();

  let [authState, setAuthState] = useState('authenticationGuard');
  let [userState, setUserState] = useState('userState');

  let [details, setDetails] = createStore({}, { name: 'details' });

  onMount(() => {
    setTimeout(() => {
      axios
        .get('http://192.168.101.120:3000/api/materials/get/' + id, {
          headers: {
            authorization: 'Bearer ' + authState.authenticationToken,
          },
        })
        .then((response) => {
          if (response.status === 200) {
            let data = response.data.data;

            setDetails({
              id: data.id,
              user: data.user,
              name: data.materialName,
              value: data.materialValue,
            });
          }
        });
    }, 300);
  });

  let addMaterial = () => {
    axios
      .put(
        'http://192.168.101.120:3000/api/materials/edit',
        { ...details, id },
        {
          headers: {
            authorization: 'Bearer ' + authState.authenticationToken,
          },
        }
      )
      .then((response) => {
        if (response.status === 200) {
          navigate('/materials');
        }
      });
  };

  return (
    <div class="flex flex-col space-y-5 w-full h-full p-2 rounded-t shadow bg-white dark:bg-gray-900">
      <div class="flex justify-between items-center">
        <div class="text-lg">Edit Material</div>
      </div>

      <div class="flex flex-col items-center space-y-5">
        <div class="flex flex-col space-y-2">
          <div class="text-sm text-gray-500 dark:text-gray-400">
            Material Name {details.name}
          </div>
          <input
            type="text"
            placeholder="Material Name"
            class="bg-gray-200 dark:bg-gray-800 dark:text-white rounded px-3 py-2 outline-none"
            value={details.name}
            onChange={(event) => {
              setDetails({
                ...details,
                name: event.target.value,
              });
            }}
          />
        </div>

        <div class="flex flex-col space-y-2">
          <div class="text-sm text-gray-500 dark:text-gray-400">
            Material Value
          </div>
          <input
            type="text"
            placeholder="Material Value"
            class="bg-gray-200 dark:bg-gray-800 dark:text-white rounded px-3 py-2 outline-none"
            value={details.value}
            onChange={(event) => {
              setDetails({
                ...details,
                value: event.target.value,
              });
            }}
          />
        </div>

        <div class="flex space-x-3 items-center">
          <button
            class="px-3 py-2 bg-emerald-800 text-white rounded shadow select-none"
            onClick={() => navigate('/materials')}
          >
            Cancel
          </button>
          <button
            class="px-3 py-2 bg-emerald-800 text-white rounded shadow select-none"
            onClick={() => addMaterial()}
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditMaterialPage;
