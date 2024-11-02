import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "@/components/theme-provider";
import Signup from '@/components/pages/Signup'; 
import Signin from '@/components/pages/Signin'; 
import Home from "@/components/pages/Home";
import ViewBlogPage from '@/components/pages/ViewBlogPage';

export default function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <Router>
        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/" element={<Home />} /> 
          <Route path="*" element={<Navigate to="/signin" />} />
          <Route path="/blog" element={<ViewBlogPage />} />
        </Routes>
      </Router>
      <Toaster/>      
    </ThemeProvider>
  );
}

