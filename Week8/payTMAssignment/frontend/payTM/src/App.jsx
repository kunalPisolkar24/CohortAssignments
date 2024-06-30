import React from "react";
import { ThemeProvider } from "./components/theme-provider";
import { Auth } from "./components/Auth";
import Dashboard from "@/components/Dashboard";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { RecoilRoot, useRecoilValue } from "recoil";
import { userState } from "@/store/atom";
import Payments from "./components/Payments";
import Profile from "./components/Profile";
import Navbar from "./components/Navbar"; 

function App() {
  const user = useRecoilValue(userState);


  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <Router>
        <div> 
          {user && <Navbar />}
          <Routes>
            <Route path="/login" element={<Auth />} />
            <Route path="/signup" element={<Auth />} />

            <Route
              path="/dashboard"
              element={user ? <Dashboard /> : <Navigate to="/login" />}
            />
            <Route
              path="/payments"
              element={user ? <Payments /> : <Navigate to="/login" />}
            />
            <Route
              path="/profile"
              element={user ? <Profile /> : <Navigate to="/login" />}
            />
            <Route path="/" element={user ? <Navigate to="/dashboard" /> : <Navigate to="/login" />} /> 
          </Routes>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;