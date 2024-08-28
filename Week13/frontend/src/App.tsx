import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ThemeProvider } from "@/components/theme-provider";
import Signup from './components/pages/Signup'; 
import Signin from './components/pages/Signin'; 
import SignupCard from './components/pages/SignupCard';
export default function App() {
  return (
    <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
      <Router>
        <Routes>
          <Route path="/" element={<h1>This is the first page</h1>} />
          <Route path="/signup" element={<SignupCard />} />
          <Route path="/signin" element={<Signin />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

