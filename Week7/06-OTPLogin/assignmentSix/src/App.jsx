import React from 'react';
import { Button } from './components/ui/button';
import { Card } from './components/ui/card';
import { OTPLogin } from './components/OTPLogin';
import { ThemeProvider } from './components/theme-provider';
function App() {
  return (
    <div>
      <ThemeProvider defaultTheme='dark' storageKey='vite-ui-theme'>
        <OTPLogin />
      </ThemeProvider>
    </div>
  );
}

export default App;