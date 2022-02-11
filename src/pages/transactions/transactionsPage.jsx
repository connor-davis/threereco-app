import axios from 'axios';
import moment from 'moment';
import { useNavigate } from 'solid-app-router';
import { createSignal, onMount } from 'solid-js';
import { createStore } from 'solid-js/store';
import useState from '../../hooks/state';

let TransactionsPage = () => {
  let navigate = useNavigate();

  let [authState, setAuthState] = useState('authenticationGuard');

  let [transactions, setTransactions] = createStore([], {
    name: 'transactions',
  });

  let [loading, setLoading] = createSignal(true);

  onMount(() => {
    setTimeout(() => {
      axios
        .get('http://192.168.101.120:3000/api/transactions/get', {
          headers: {
            authorization: 'Bearer ' + authState.authenticationToken,
          },
        })
        .then((response) => {
          if (response.status === 200) {
            setLoading(false);

            return setTransactions(
              [...response.data.data].sort((a, b) => {
                if (a.date > b.date) return -1;
                if (a.date < b.date) return 1;
                return 0;
              })
            );
          }
        });
    }, 300);
  });

  let deleteTransaction = (id) => {
    setTimeout(() => {
      axios
        .post(
          'http://192.168.101.120:3000/api/transactions/delete',
          { id },
          {
            headers: {
              authorization: 'Bearer ' + authState.authenticationToken,
            },
          }
        )
        .then((response) => {
          if (response.status === 200) {
            setTransactions(
              transactions.map((transaction) => {
                if (transaction.id === id) return;
                else return transaction;
              })
            );

            return console.log(response.data.message);
          }
        });
    }, 300);
  };

  let exportTransactions = () => {
    setTimeout(() => {
      axios
        .get('http://192.168.101.120:3000/api/exports/transactions', {
          headers: {
            authorization: 'Bearer ' + authState.authenticationToken,
          },
          responseType: 'blob',
        })
        .then((response) => {
          if (response.status === 200) {
            saveAs(
              response.data,
              'Transactions-' +
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
        <div class="text-lg">Transactions</div>
        <div class="flex space-x-5">
          <div
            class="text-lg cursor-pointer"
            onClick={() => navigate('/transactions/purchase')}
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
                d="M3 4h13M3 8h9m-9 4h9m5-4v12m0 0l-4-4m4 4l4-4"
              />
            </svg>
          </div>
          <div
            class="text-lg cursor-pointer"
            onClick={() => navigate('/transactions/sell')}
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
                d="M3 4h13M3 8h9m-9 4h6m4 0l4-4m0 0l4 4m-4-4v12"
              />
            </svg>
          </div>
          <div
            class="text-lg cursor-pointer"
            onClick={() => exportTransactions()}
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
        transactions.filter(
          (transaction) => transaction !== (null || undefined)
        ).length > 0 && (
          <div class="w-full h-full overflow-y-auto overflow-x-auto">
            <table class="table-auto w-full">
              <thead class="border-b border-gray-200 dark:border-gray-800">
                <tr>
                  <th class="p-3 text-left">Date</th>
                  <th class="p-3 text-left">Purchaser</th>
                  <th class="p-3 text-left">Seller</th>
                  <th class="p-3 text-left">Material</th>
                  <th class="p-3 text-left">Weight</th>
                  <th class="p-3 text-left">Price</th>
                </tr>
              </thead>
              <tbody class="w-full">
                {transactions.map((transaction) => (
                  <tr class="border-b w-full border-gray-200 dark:border-gray-800">
                    <td class="p-4">
                      {moment(transaction.date).format('DD/MM/YYYY')}
                    </td>
                    <td class="p-4">{transaction.purchaser.userDisplayName}</td>
                    <td class="p-4">{transaction.seller.userDisplayName}</td>
                    <td class="p-4">{transaction.material.materialName}</td>
                    <td class="p-4">{transaction.weight + 'kg'}</td>
                    <td class="p-4">{'R' + transaction.price}</td>
                    <td class="p-4 w-10">
                      <div
                        class="px-4 py-1 text-sm text-white bg-red-500 rounded cursor-pointer"
                        onClick={() =>
                          deleteTransaction(
                            transaction.id,
                            transaction.weight,
                            transaction.material
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
          Loading transactions.
        </div>
      )}

      {!loading() &&
        transactions.filter(
          (transaction) => transaction !== (null || undefined)
        ).length === 0 && (
          <div class="flex flex-col justify-center items-center w-full h-full select-none text-gray-500 dark:text-gray-400">
            You have no transactions.
          </div>
        )}
    </div>
  );
};

export default TransactionsPage;
