import axios from 'axios';
import { useNavigate } from 'solid-app-router';
import { createStore } from 'solid-js/store';
import useState from '../../hooks/state';

let AddMaterialPage = () => {
  let navigate = useNavigate();

  let [authState, setAuthState] = useState('authenticationGuard');
  let [userState, setUserState] = useState('userState');

  let [details, setDetails] = createStore({}, { name: 'details' });

  let addMaterial = () => {
    axios
      .post(
        'http://192.168.101.120:3000/api/materials/add',
        { user: userState.id, ...details },
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
        <div class="text-lg">Add Material</div>
      </div>

      <div class="flex flex-col items-center space-y-5">
        <div class="flex flex-col space-y-2">
          <div class="text-sm text-gray-500 dark:text-gray-400">
            Material Name
          </div>
          <input
            type="text"
            placeholder="Material Name"
            class="bg-gray-200 dark:bg-gray-800 dark:text-white rounded px-3 py-2 outline-none"
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

export default AddMaterialPage;
