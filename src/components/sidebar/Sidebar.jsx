import { createSignal } from 'solid-js';
import useState from '../../hooks/state';
import ArrowLeft from '../../icons/arrowLeft';
import EcoLogo from '../3rEcoLogo';
import SidebarHeader from './SidebarHeader';

let Sidebar = ({
  children,
  sidebarActive = true,
  setSidebarActive = (value) => {},
}) => {
  let [themeState, toggle] = useState('theme');

  let [active, setActive] = createSignal(sidebarActive);

  return (
    <div
      class={`flex flex-col space-y-3 h-full z-50 ${
        active() ? 'w-5/6 md:w-64' : 'w-16 items-center'
      } transition-width duration-300 bg-white dark:bg-gray-900 text-gray-900 dark:text-white shadow p-2`}
    >
      <SidebarHeader
        left={() =>
          active() && (
            <div
              class={`flex items-center space-x-2 cursor-pointer select-none ${
                active() ? 'animate-fade-in' : 'animate-fade-out'
              }`}
              onClick={() =>
                themeState.theme === 'dark'
                  ? toggle({ theme: 'light' })
                  : toggle({ theme: 'dark' })
              }
            >
              <EcoLogo className={'w-10 h-10'} />
              <div class="text-xl">3rEco</div>
            </div>
          )
        }
        right={() =>
          active() ? (
            <div
              class={`md:hidden flex flex-col justify-center items-center cursor-pointer w-10 h-10 ${
                active() ? 'animate-fade-in' : 'animate-fade-out'
              }`}
              onClick={() => {
                setActive(false);
                setSidebarActive(false);
              }}
            >
              <ArrowLeft />
            </div>
          ) : (
            <div
              class="md:hidden cursor-pointer"
              onClick={() => {
                setActive(true);
                setSidebarActive(true);
              }}
            >
              <EcoLogo className={'w-10 h-10'} />
            </div>
          )
        }
      />

      <div class="flex flex-col space-y-2">{children}</div>
    </div>
  );
};

export default Sidebar;
