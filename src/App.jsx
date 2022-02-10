import { Route, Routes, useNavigate } from 'solid-app-router';
import AuthenticationGuard from './guards/authenticationGuard';
import useState from './hooks/state';
import AddConnectionPage from './pages/connections/addConnectionPage';
import ConnectionsPage from './pages/connections/connectionsPage';
import DashboardPage from './pages/dashboard/dashboardPage';
import AddMaterialPage from './pages/materials/addMaterialPage';
import EditMaterialPage from './pages/materials/editMaterialPage';
import MaterialsPage from './pages/materials/materialsPage';
import RootPage from './pages/root/rootPage';
import SetupCompanyProfilePage from './pages/setup/setupCompanyProfilePage';
import SetupIndividualProfilePage from './pages/setup/setupIndividualProfilePage';
import AddPurchasePage from './pages/transactions/addPurchasePage';
import AddSalePage from './pages/transactions/addSalePage';
import TransactionsPage from './pages/transactions/transactionsPage';

function App() {
  let [themeState, toggle] = useState('theme');
  let [userState, updateUserState] = useState('userState');
  let navigate = useNavigate();

  return (
    <div class={themeState.theme}>
      <div class="w-screen h-screen bg-white dark:bg-gray-900 overflow-hidden">
        <AuthenticationGuard>
          {userState.userType === 'company' && (
            <Routes>
              <Route path="/" element={<RootPage />}>
                <Route path="/" element={<DashboardPage />} />
                <Route path="/materials" element={<MaterialsPage />}></Route>
                <Route path="/materials/add" element={<AddMaterialPage />} />
                <Route
                  path="/materials/edit/:id"
                  element={<EditMaterialPage />}
                />
                <Route path="/connections" element={<ConnectionsPage />} />
                <Route
                  path="/connections/add"
                  element={<AddConnectionPage />}
                />
                <Route path="/transactions" element={<TransactionsPage />} />
                <Route
                  path="/transactions/purchase"
                  element={<AddPurchasePage />}
                />
                <Route path="/transactions/sell" element={<AddSalePage />} />
              </Route>
            </Routes>
          )}

          {userState.userType === 'employee' && (
            <Routes>
              <Route
                path="/"
                component={() => (
                  <div class="dark:text-white">
                    Welcome, {userState.userIdNumber}
                  </div>
                )}
              />
            </Routes>
          )}

          {userState.userType === 'individual' && (
            <Routes>
              <Route path="/" element={<RootPage />}>
                <Route path="/" element={<DashboardPage />} />
                <Route path="/materials" element={<MaterialsPage />}></Route>
                <Route path="/materials/add" element={<AddMaterialPage />} />
                <Route
                  path="/materials/edit/:id"
                  element={<EditMaterialPage />}
                />
                <Route path="/connections" element={<ConnectionsPage />} />
                <Route
                  path="/connections/add"
                  element={<AddConnectionPage />}
                />
                <Route path="/transactions" element={<TransactionsPage />} />
                <Route
                  path="/transactions/purchase"
                  element={<AddPurchasePage />}
                />
                <Route path="/transactions/sell" element={<AddSalePage />} />
              </Route>
            </Routes>
          )}

          {userState.userType === undefined && (
            <Routes>
              <Route
                path="/"
                component={() => (
                  <div class="flex flex-col w-full h-full justify-center items-center bg-gray-200 dark:bg-gray-800">
                    <div class="flex flex-col space-y-5 bg-white dark:bg-gray-900 rounded shadow p-5">
                      <div class="dark:text-white">
                        Lets setup your profile.
                      </div>

                      <div class="flex flex-col space-y-3">
                        <button
                          class="px-3 py-2 bg-emerald-800 text-white rounded shadow select-none"
                          onClick={() => navigate('/setupCompanyProfile')}
                        >
                          Company
                        </button>
                        <button
                          class="px-3 py-2 bg-emerald-800 text-white rounded shadow select-none"
                          onClick={() => navigate('/setupIndividualProfile')}
                        >
                          Individual
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              />

              <Route
                path="/setupCompanyProfile"
                element={<SetupCompanyProfilePage />}
              />

              <Route
                path="/setupIndividualProfile"
                element={<SetupIndividualProfilePage />}
              />
            </Routes>
          )}
        </AuthenticationGuard>
      </div>
    </div>
  );
}

export default App;
