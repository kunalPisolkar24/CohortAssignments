import { useState } from 'react';
import {MagnifyingGlassIcon, ChevronDownIcon, ArrowUpIcon, ArrowDownOnSquareIcon } from '@heroicons/react/24/outline';

const transactions = [
  {
    orderId: '#281209',
    status: 'Successful',
    transactionId: 'TRX123456',
    refundDate: 'Today, 8:45 PM',
    orderAmount: '₹1125.00',
  },
  {
    orderId: '#281210',
    status: 'Processing',
    transactionId: 'TRX789012',
    refundDate: 'Tomorrow, 10:00 AM',
    orderAmount: '₹950.50',
  },
  {
    orderId: '#281211',
    status: 'Successful',
    transactionId: 'TRX345678',
    refundDate: 'Yesterday, 3:30 PM',
    orderAmount: '₹750.00',
  },
  {
    orderId: '#281212',
    status: 'Successful',
    transactionId: 'TRX9801234',
    refundDate: 'Today, 11:20 AM',
    orderAmount: '₹669.00',
  },
  {
    orderId: '#281213',
    status: 'Processing',
    transactionId: 'TRX567890',
    refundDate: 'Tomorrow, 9:00 AM',
    orderAmount: '₹850.00',
  },
];

const TableComponent = () => {
  const [sortOrder, setSortOrder] = useState('asc'); // 'asc' or 'desc'

  const handleSort = () => {
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
  };

  return (
    <div className="bg-white shadow-md rounded-md overflow-hidden">
      <div className="flex items-center justify-between px-4 py-3 bg-gray-100">
        <div className="relative flex items-center">
          <input
            type="text"
            placeholder="Order ID or transactions ID"
            className="pl-10 pr-3 py-2 rounded-md border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <MagnifyingGlassIcon className="h-5 w-5 text-gray-400 absolute left-3" />
        </div>
        <div className="flex items-center">
          <button className="flex items-center px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500">
            Sort
            <ChevronDownIcon className="h-4 w-4 ml-1" />
          </button>
          <button className="ml-2 px-3 py-2 rounded-md bg-gray-700 hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500">
            <ArrowDownOnSquareIcon className="h-5 w-5 text-white" />
          </button>
        </div>
      </div>
      <table className="w-full table-auto text-sm text-left text-gray-500">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50">
          <tr>
            <th scope="col" className="px-6 py-3">
              Order ID
            </th>
            <th scope="col" className="px-6 py-3">
              Status
            </th>
            <th scope="col" className="px-6 py-3">
              Transaction ID
            </th>
            <th scope="col" className="px-6 py-3">
              Refund Date
            </th>
            <th scope="col" className="px-6 py-3">
              Order Amount
              <button
                onClick={handleSort}
                className="ml-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {sortOrder === 'asc' ? (
                  <ArrowUpIcon className="h-4 w-4" />
                ) : (
                  <ChevronDownIcon className="h-4 w-4" />
                )}
              </button>
            </th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((transaction, index) => (
            <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
              <td className="px-6 py-4">{transaction.orderId}</td>
              <td className="px-6 py-4">
                <span
                  className={`inline-block px-2 py-1 text-xs font-semibold rounded-full ${
                    transaction.status === 'Successful'
                      ? 'bg-green-100 text-green-800'
                      : 'bg-yellow-100 text-yellow-800'
                  }`}
                >
                  {transaction.status}
                </span>
              </td>
              <td className="px-6 py-4">{transaction.transactionId}</td>
              <td className="px-6 py-4">{transaction.refundDate}</td>
              <td className="px-6 py-4">{transaction.orderAmount}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TableComponent;