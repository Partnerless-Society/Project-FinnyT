import { Route, BrowserRouter, Routes } from "react-router-dom"
import { Home } from "./pages/homepage"
import { ThemeProvider } from "./components/ui/themeprovider"

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </ThemeProvider>
    </BrowserRouter>
  )
}

export default App;
