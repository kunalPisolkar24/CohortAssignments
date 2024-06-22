import React from "react";
import { ThemeProvider } from "./components/theme-provider";
import { Button } from "./components/ui/button";
import { Auth } from "./components/Auth";
import Dashboard from "@/components/Dashboard";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { RecoilRoot, useRecoilValue } from "recoil";
import { userState } from "@/store/atom";
import Payments from "./components/Payments";

function App() {
  const user = useRecoilValue(userState);

  return(
 
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme"> 
        <Router>
          <Routes>
            <Route path="/login" element={<Auth />} />
            <Route path="/signup" element={<Auth />} />
            {/* <Route path="/dashboard" element={user ? <Dashboard /> : <Navigate to="/login" />} /> */}
            <Route path="/dashboard" element={<Dashboard />}></Route>
            <Route path="/payments" element={<Payments />}></Route>
            <Route path="/" element={<Navigate to="/login" replace/>} />
          </Routes>
        </Router>
    </ThemeProvider>

  );
};

export default App;