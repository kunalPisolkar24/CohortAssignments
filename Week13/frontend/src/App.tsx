import { Button } from "@/components/ui/button"
import { ThemeProvider } from "@/components/theme-provider"
export default function App() {

  return (
    <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
      <>
        <Button>Click Me</Button>
      </>
    </ThemeProvider>
  )
}

