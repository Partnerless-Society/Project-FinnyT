import { Route, BrowserRouter, Routes } from "react-router-dom"
import { Home } from "./pages/landingpage"
import { ThemeProvider } from "./components/ui/themeprovider"
import { Login } from "./auth/login";
import { Signup } from "./auth/signup";

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login/>} />
          <Route path="/signup" element={<Signup/>} />
        </Routes>
      </ThemeProvider>
    </BrowserRouter>
  )
}

export default App;
