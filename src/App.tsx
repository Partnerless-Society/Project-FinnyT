import { Route, BrowserRouter, Routes } from "react-router-dom"
import { Home } from "./pages/landingpage"
import { ThemeProvider } from "./components/ui/themeprovider"
import { Login } from "./auth/login";
import { Signup } from "./auth/signup";
import { Sidebarrrender } from "./pages/sidebar";
import { Dashboard } from "./pages/dashboard";
import { Protectedroute } from "./routes/protectedroute";
import { Errorpage } from "./error/errorpage";
import { Tracker } from "./pages/tracker";
import { useAuthStore } from "./store/authstore";
import { useEffect } from "react";

function App() {

  const { id , userfetch } = useAuthStore();

   useEffect(() => {
        if (!id) {
            userfetch();
        }
    }, [id, userfetch]);

  return (
    <BrowserRouter>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <Routes>
          <Route path="/" element={<Home />} />

          {!id &&
          <> 
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          </>}


          <Route element={<Protectedroute />} >
            <Route path="/app" element={<Sidebarrrender />}>
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="track" element={<Tracker />} />
            </Route>
          </Route>

          <Route path="*" element={<Errorpage />} />
        </Routes>
      </ThemeProvider>
    </BrowserRouter>
  )
}

export default App;
