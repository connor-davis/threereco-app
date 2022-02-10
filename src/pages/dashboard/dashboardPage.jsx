import axios from 'axios';
import 'https://cdn.jsdelivr.net/npm/chart.js@3.7.0/dist/chart.min.js';
import moment from 'moment';
import { onMount } from 'solid-js';
import { createStore } from 'solid-js/store';
import useState from '../../hooks/state';

let DashboardPage = () => {
  let [authState, setAuthState] = useState('authenticationGuard');
  let [userState, setUserState] = useState('userState');
  let [themeState, toggle] = useState('theme');

  let [connections, setConnections] = createStore([], { name: 'connections' });
  let [transactions, setTransactions] = createStore([], {
    name: 'transactions',
  });

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
            setTransactions(
              [...response.data.data].sort((a, b) => {
                if (a.material.materialName > b.material.materialName) return 1;
                if (a.material.materialName < b.material.materialName)
                  return -1;

                return 0;
              })
            );

            return initTransactionsChart();
          }
        });

      axios
        .get('http://192.168.101.120:3000/api/connections/get', {
          headers: {
            authorization: 'Bearer ' + authState.authenticationToken,
          },
        })
        .then((response) => {
          if (response.status === 200) {
            setConnections(response.data.data);
          }
        });
    }, 300);
  });

  let calculateMonthsPurchases = (month) => {
    return transactions.filter(
      (transaction) =>
        transaction.type === 'purchase' &&
        moment(transaction.date).format('YYYY') ===
          moment(Date.now()).format('YYYY') &&
        moment(transaction.date).format('MMMM') === month
    ).length;
  };

  let calculateMonthsSales = (month) => {
    return transactions.filter(
      (transaction) =>
        transaction.type === 'sale' &&
        moment(transaction.date).format('YYYY') ===
          moment(Date.now()).format('YYYY') &&
        moment(transaction.date).format('MMMM') === month
    ).length;
  };

  let initTransactionsChart = () => {
    let months = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ];

    let purchases = months.map((month) => {
      return {
        x: month,
        y: calculateMonthsPurchases(month),
      };
    });

    let sales = months.map((month) => {
      return {
        x: month,
        y: calculateMonthsSales(month),
      };
    });

    const ctx = document.getElementById('transactions').getContext('2d');
    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: months,
        datasets: [
          {
            label: 'Purchases',
            type: 'line',
            data: purchases,
            backgroundColor: 'rgba(6,95,70,1)',
            borderColor: 'rgba(6,95,70,0.5)',
            fill: false,
            order: 1,
          },
          {
            label: 'Sales',
            type: 'line',
            data: sales,
            backgroundColor: 'rgba(220,38,38,1)',
            borderColor: 'rgba(220,38,38,0.5)',
            fill: false,
            order: 2,
          },
        ],
      },
      options: {
        responsive: true,
        interaction: {
          mode: 'index',
          intersect: false,
        },
        stacked: false,
        scales: {
          xAxes: [
            {
              type: 'time',
              time: {
                unit: 'month',
                displayFormats: {
                  month: 'MMM',
                },
              },
              distribution: 'linear',
            },
          ],
          yAxes: [
            {
              ticks: {
                beginAtZero: true,
              },
            },
          ],
        },
      },
    });
  };

  return (
    <div class="flex flex-col space-y-5 w-full h-full p-2 md:p-5 rounded-t shadow bg-white dark:bg-gray-900">
      <div class="flex justify-between items-center">
        <div class="text-lg">Dashboard</div>
      </div>

      <div class="flex flex-col space-y-5 w-full h-full">
        <div class="flex w-full items-center space-x-2 md:space-x-5">
          <div class="flex flex-col w-full h-auto p-10 justify-center items-center bg-gray-200 dark:bg-gray-800 rounded select-none">
            <div class="text-lg font-bold">Connections</div>
            <div>{connections.length}</div>
          </div>
          <div class="flex flex-col w-full h-auto p-10 justify-center items-center bg-gray-200 dark:bg-gray-800 rounded select-none">
            <div class="text-lg font-bold">Transactions</div>
            <div>{transactions.length}</div>
          </div>
        </div>

        <div class="flex flex-col w-full h-full pb-10 overflow-y-auto">
          <canvas id="transactions" class="max-h-96"></canvas>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
