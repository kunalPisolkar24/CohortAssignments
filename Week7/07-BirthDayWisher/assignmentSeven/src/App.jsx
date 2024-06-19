import React from "react"
import { ThemeProvider } from "@/components/theme-provider"
import { InputCard } from "./components/InputCard"

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <InputCard className="" />
    </ThemeProvider>
  )
}

export default App
