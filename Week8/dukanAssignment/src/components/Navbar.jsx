import React from 'react';
import { BellIcon, ChevronDownIcon } from '@heroicons/react/24/solid';
import { MagnifyingGlassIcon, QuestionMarkCircleIcon } from '@heroicons/react/24/outline';

const Navbar = () => {
  return (
    <nav className="bg-white shadow-md px-4 py-3 flex justify-between items-center z-30">
      {/* Left Side - Title and "How it works" link */}
      <div className="flex items-center lg:flex hidden">
        <h2 className="text-lg font-medium text-gray-800">Payouts</h2>
        <QuestionMarkCircleIcon className="h-6 w-6 text-gray-600 ml-8" />
        <a href="#" className="ml-4 text-sm text-gray-600 hover:text-gray-900">
          How it works
        </a>
      </div>

      {/* Center - Search Bar */}
      <div className="relative md:flex items-center md:top-[0px] lg:top-[0px] lg:ml-auto ">
        <input
          type="text"
          placeholder="Search features, tutorials, etc."
          className="border border-gray-400 lg:px-[60px] md:ml-[40px] sm:px-[40px] px-[30px] sm:ml-[120px] ml-[110px] md:px-[40px] rounded-md px-[80px] py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 sm:mb-[-30px] md:mb-[0px] mb-[-30px] "
        />
        <MagnifyingGlassIcon className="h-5 mr-2 w-5 text-black-400 relative lg:right-[50px] md:right-[30px] lg:top-[0px] sm:bottom-[20px] md:bottom-[0px] sm:ml-auto sm:mr-4 ml-auto bottom-[20px]" />
      </div>

      {/* Right Side - Icons */}
      <div className="flex items-center space-x-4 ml-auto">
        <button className="p-2 rounded-md hover:bg-gray-100">
          <BellIcon className="h-6 w-6 text-gray-600" />
        </button>
        <button className="flex items-center p-2 rounded-md hover:bg-gray-100">
          <img
            src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=1888&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" // Replace with actual profile picture URL
            alt="Profile"
            className="h-10 w-8 rounded-lg mr-2 object-cover"
          />
          <ChevronDownIcon className="h-5 w-5 text-gray-600 ml-2" />
        </button>
      </div>
    </nav>
  );
};

export default Navbar;