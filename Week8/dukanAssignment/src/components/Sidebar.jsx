import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import {
  HomeIcon,
  ShoppingBagIcon,
  BuildingStorefrontIcon,
  Bars3Icon,
  TruckIcon,
  MegaphoneIcon,
  ChartBarIcon,
  CreditCardIcon,
  UsersIcon,
  ReceiptPercentIcon,
  BoltIcon,
  SparklesIcon,
  ChevronDownIcon,
  WalletIcon 
} from '@heroicons/react/24/outline';

const navLinks = [
  { label: 'Home', to: '/', icon: HomeIcon },
  { label: 'Orders', to: '/orders', icon: ShoppingBagIcon },
  { label: 'Products', to: '/products', icon: BuildingStorefrontIcon },
  { label: 'Delivery', to: '/delivery', icon: TruckIcon },
  { label: 'Marketing', to: '/marketing', icon: MegaphoneIcon },
  { label: 'Analytics', to: '/analytics', icon: ChartBarIcon },
  { label: 'Payouts', to: '/payouts', icon: CreditCardIcon },
  { label: 'Discounts', to: '/discounts', icon: ReceiptPercentIcon },
  { label: 'Audience', to: '/audience', icon: UsersIcon },
  { label: 'Appearance', to: '/appearance', icon: SparklesIcon },
  { label: 'Plugins', to: '/plugins', icon: BoltIcon },
];

const Sidebar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = (event) => {
    event.stopPropagation(); // Prevent closing when clicking the sidebar itself
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="relative h-screen">
      {/* Toggle button */}
      <button
        className="md:hidden absolute top-4 left-4 z-30"
        onClick={toggleSidebar} // No need to pass event here 
      >
        <Bars3Icon className="h-8 w-8 text-black" />
      </button>

      {/* Sidebar content */}
      <div
        className={`bg-[#1B2430] text-white w-64 h-screen px-4 py-6 fixed top-0 left-0 transform duration-300 ease-in-out z-20 
          ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} 
          md:relative md:translate-x-0 flex flex-col`}
      >
               <div className="flex items-center mb-8">
          <img 
            src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=1888&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
            alt="Logo" 
            className="h-10 w-8 rounded-lg mr-2 object-cover" 
          />
          <div className="flex flex-col ml-2">
            <span className="text-lg font-semibold md:block">Nishani</span>
            <a
              href="#"
              className="text-gray-400 hover:underline text-sm"
            >
              Visit Store
            </a>
          </div>
          <ChevronDownIcon className="h-5 w-5 text-white ml-auto mr-3" />
        </div>

        <nav className="flex-grow overflow-y-auto">
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className="flex items-center py-2 px-3 rounded-md hover:bg-gray-700"
              onClick={toggleSidebar}
            >
              <link.icon className="h-5 w-5 mr-2" />
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="bg-[#243245] text-white rounded-lg p-4 shadow-md mt-4"> 
          <div className="flex items-center">
            <div className="p-3 bg-[#243245] shadow-lg shadow-white-700/40 rounded-lg">
              <WalletIcon className="h-6 w-6 text-white-400 rounded-md" />
            </div>
            <div className='ml-4'>
              <p className="text-sm font-medium">Available Credits</p>
              <p className="text-lg font-semibold">$ 234.10</p>
            </div>
          </div>
        </div>
      </div>

      {/* Overlay  */}
      {isSidebarOpen && (
        <div
          className="fixed top-0 left-0 w-full h-full bg-black opacity-50 z-10 md:hidden"
          onClick={toggleSidebar}
        />
      )}
    </div>
  );
};

export default Sidebar;