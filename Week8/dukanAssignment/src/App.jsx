// App.js
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Sidebar from './components/Sidebar'; // Your Sidebar component

function App() {
  return (
    <BrowserRouter>
      <div className="app-container"> 
        <Sidebar />
      </div>
    </BrowserRouter>
  );
}

export default App;