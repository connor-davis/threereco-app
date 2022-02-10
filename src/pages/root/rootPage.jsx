import { Outlet, useNavigate } from 'solid-app-router';
import { createSignal } from 'solid-js';
import Sidebar from '../../components/sidebar/Sidebar';
import SidebarItem from '../../components/sidebar/SidebarItem';
import useState from '../../hooks/state';

let RootPage = () => {
  let navigate = useNavigate();
  let [authState, setAuthState, clearAuthState] = useState(
    'authenticationGuard'
  );
  let [userState, setUserState, clearUserState] = useState('userState');

  let [sidebarActive, setSidebarActive] = createSignal(false);

  return (
    <div class="flex w-full h-full text-gray-900 dark:text-white flex-none">
      <div class="hidden md:block bg-green-300 flex-none">
        <Sidebar
          sidebarActive={true}
          setSidebarActive={(value) => setSidebarActive(value)}
        >
          <SidebarItem
            onClick={() => {
              navigate('/');
            }}
            icon={() => (
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
                  d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                />
              </svg>
            )}
            element={() => <div>Dashboard</div>}
          />

          <SidebarItem
            onClick={() => {
              navigate('/materials');
            }}
            icon={() => (
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
                  d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                />
              </svg>
            )}
            element={() => <div>Materials</div>}
          />

          <SidebarItem
            onClick={() => {
              navigate('/connections');
            }}
            icon={() => (
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
                  d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"
                />
              </svg>
            )}
            element={() => <div>Connections</div>}
          />

          <SidebarItem
            onClick={() => {
              navigate('/transactions');
              setSidebarActive(false);
            }}
            icon={() => (
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
                  d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
            )}
            element={() => <div>Transactions</div>}
          />

          <SidebarItem
            className="hover:bg-red-500 dark:hover:bg-red-500 hover:text-white dark:hover:text-white"
            onClick={() => {
              clearUserState();
              clearAuthState();
              window.location.reload();
            }}
            icon={() => (
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
                  d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                />
              </svg>
            )}
            element={() => <div>Logout</div>}
          />
        </Sidebar>
      </div>

      {sidebarActive() && (
        <div class="flex absolute w-full h-full md:hidden">
          <Sidebar
            sidebarActive={sidebarActive()}
            setSidebarActive={(value) => setSidebarActive(value)}
          >
            <SidebarItem
              onClick={() => {
                navigate('/');
                setSidebarActive(false);
              }}
              icon={() => (
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
                    d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                  />
                </svg>
              )}
              element={() => <div>Dashboard</div>}
            />

            <SidebarItem
              onClick={() => {
                navigate('/materials');
                setSidebarActive(false);
              }}
              icon={() => (
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
                    d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                  />
                </svg>
              )}
              element={() => <div>Materials</div>}
            />

            <SidebarItem
              onClick={() => {
                navigate('/connections');
                setSidebarActive(false);
              }}
              icon={() => (
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
                    d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"
                  />
                </svg>
              )}
              element={() => <div>Connections</div>}
            />

            <SidebarItem
              onClick={() => {
                navigate('/transactions');
                setSidebarActive(false);
              }}
              icon={() => (
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
                    d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
              )}
              element={() => <div>Transactions</div>}
            />

            <SidebarItem
              className="hover:bg-red-500 dark:hover:bg-red-500 hover:text-white dark:hover:text-white"
              onClick={() => {
                clearUserState();
                clearAuthState();
                window.location.reload();
              }}
              icon={() => (
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
                    d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                  />
                </svg>
              )}
              element={() => <div>Logout</div>}
            />
          </Sidebar>

          <div class="w-1/6 h-full bg-gray-900 opacity-70">{''}</div>
        </div>
      )}

      <div class="flex flex-col w-full h-full bg-gray-200 dark:bg-gray-800 px-2 pt-2  overflow-hidden">
        <div class="flex justify-between items-center md:justify-end mb-5">
          <div class="md:hidden" onClick={() => setSidebarActive(true)}>
            <div class="cursor-pointer">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-8 w-8"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </div>
          </div>
          <div class="flex flex-col">
            {userState.userDisplayName ? (
              <div>Welcome, {userState.userDisplayName}</div>
            ) : (
              <div>Welcome, {userState.userIdNumber}</div>
            )}
          </div>
        </div>

        <div class="w-full h-full overflow-hidden">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default RootPage;
