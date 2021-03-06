import axios from 'axios';
import { onMount } from 'solid-js';
import useState from '../hooks/state';
import AuthenticationPage from '../pages/authentication';

let AuthenticationGuard = ({ children }) => {
  let [state, update] = useState('authenticationGuard');

  onMount(() => {
    setTimeout(() => {
      axios
        .get('https://api.3reco.co.za/api/authentication/check', {
          headers: {
            authorization: 'Bearer ' + state.authenticationToken,
          },
        })
        .catch((error) => {
          console.log(error);
          update({ authenticationToken: undefined });
        });
    }, 300);
  });

  return (
    <div class="w-full h-full">
      {state.authenticationToken ? children : <AuthenticationPage />}
    </div>
  );
};

export default AuthenticationGuard;
