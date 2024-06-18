import React, { useState } from 'react';
import { ChevronDownIcon, QuestionMarkCircleIcon, ChevronRightIcon } from '@heroicons/react/24/outline';

const Overview = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-gray-800">Overview</h2>
        <div className="relative inline-block text-left">
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            type="button"
            className="inline-flex items-center justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            id="menu-button"
            aria-expanded={isDropdownOpen}
            aria-haspopup="true"
          >
            This Month
            <ChevronDownIcon className="ml-2 -mr-1 h-5 w-5" aria-hidden="true" />
          </button>

          {/* Dropdown menu (hidden by default) */}
          <div
            className={`${
              isDropdownOpen ? '' : 'hidden'
            } origin-top-right absolute right-0 mt-2 w-[8rem] rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none`}
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="menu-button"
            tabIndex="-1"
          >
            {/* Dropdown menu items */}
            <a
              href="#"
              className="text-gray-700 block px-4 py-2 text-sm hover:bg-gray-100"
              role="menuitem"
              tabIndex="-1"
              id="menu-item-0"
            >
              Last Month
            </a>
            {/* Add more dropdown items as needed */}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-1 gap-6 xl:grid-cols-3">
       
        <div className="bg-[#243245] rounded-lg p-6 text-white">
          <h3 className="text-lg font-medium mb-2 flex items-center gap-2">Next Payout 
            <QuestionMarkCircleIcon className="h-5 w-5" />
          </h3>
          <p className="text-3xl font-bold">₹2,312.23</p>
          <div className="flex items-center mt-4">
            <span className="bg-[#405878] shadow-lg shadow-white-700/40 rounded-full px-3 py-1 text-xs font-semibold mr-2">23 Orders</span>
            <ChevronRightIcon className="h-5 w-5" />
          </div>
          <p className="text-sm mt-2">Next Payment Date: <span className="font-medium">Today, 4:00PM</span></p>
        </div>

        <div className="bg-white border border-gray-300 rounded-lg p-6">
          <h3 className="text-lg font-medium text-gray-800 mb-2 flex items-center gap-2">Amount Pending 
            <QuestionMarkCircleIcon className="h-5 w-5" />
          </h3>
          <p className="text-3xl font-bold text-gray-900">₹92,312.20</p>
          <div className="flex items-center mt-4">
            <span className="bg-gray-300 rounded-full px-3 py-1 text-xs font-semibold mr-2">13 Orders</span>
            <ChevronRightIcon className="h-5 w-5" />
          </div>
        </div>

        <div className="bg-white border border-gray-300 rounded-lg p-6">
          <h3 className="text-lg font-medium text-gray-800 mb-2 flex items-center gap-2">Amount Processed 
            
            <QuestionMarkCircleIcon className="h-5 w-5" />

          </h3>
          <p className="text-3xl font-bold text-gray-900">₹23,92,312.19</p>
        </div>
      </div>

      <div className="mt-6 pt-4">
        <h3 className="text-xl font-medium text-gray-900 pb-2">
          Transactions | This Month
        </h3>
        <div className="mt-2 flex">
          <a
            href="#"
            className="bg-gray-200 text-gray-900 px-5 py-3 rounded-full mr-2"
          >
            Payouts (22)
          </a>
          <a
            href="#"
            className="bg-[#243245] text-white px-5 py-3 rounded-full"
          >
            Refunds (6)
          </a>
        </div>
      </div>
    </div>
  );
};

export default Overview;
