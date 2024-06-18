import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Sidebar from './components/Sidebar'; // Your Sidebar component
import Navbar from './components/Navbar';
import Overview from './components/Overview';
import TableComponent from './components/TableComponent';

function App() {
  return (
    <BrowserRouter>
      <div className="flex h-screen"> {/* Ensure full height for the container */}
        <Sidebar />
        <div className="flex-1 flex flex-col"> 
          <Navbar />
          <div className="overflow-y-auto flex-1">
            <Overview />
            <TableComponent />
          </div>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
