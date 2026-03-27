import { Route, BrowserRouter, Routes } from "react-router-dom"
import { Home } from "./pages/landingpage"
import { ThemeProvider } from "./components/ui/themeprovider"
import { Login } from "./auth/login";
import { Signup } from "./auth/signup";
import { Sidebarrrender } from "./pages/sidebar";
import { Dashboard } from "./pages/dashboard";

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/" element={<Sidebarrrender />}>
            <Route path="dashboard" element={<Dashboard />} />
          </Route>
        </Routes>
      </ThemeProvider>
    </BrowserRouter>
  )
}

export default App;
