import { createSignal } from 'solid-js';
import LoginPage from './loginPage';
import RegisterPage from './registerPage';

let AuthenticationPage = () => {
  let [login, toggleLogin] = createSignal(false);

  return (
    <div class="w-full h-full">
      {login() ? (
        <LoginPage toggleLogin={() => toggleLogin(!login())} />
      ) : (
        <RegisterPage toggleLogin={() => toggleLogin(!login())} />
      )}
    </div>
  );
};

export default AuthenticationPage;
