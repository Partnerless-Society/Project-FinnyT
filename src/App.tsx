import { Route, BrowserRouter, Routes } from "react-router-dom"
import { Home } from "./pages/landing/landingpage"
import { ThemeProvider } from "./components/ui/themeprovider"
import { Login } from "./auth/login";
import { Signup } from "./auth/signup";
import { Sidebarrrender } from "./pages/sidebar/sidebar";
import { Dashboard } from "./pages/dashboard/dashboard";
import { Protectedroute } from "./routes/protectedroute";
import { Errorpage } from "./error/errorpage";
import { Tracker } from "./pages/dashboard/tracker";
import { useAuthStore } from "./store/authstore";
import { useEffect } from "react";
import { Agenting } from "./pages/dashboard/agenting";
import { Sidebarrrenderagent } from "./pages/sidebar/agentsidebar";
import { GoogleSheetagent } from "./pages/agenting/googlesheetagent";
import { Setting } from "./pages/agenting/setting";
import ContactPage from "./pages/landing/contactpage";

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
          <Route path="/contact" element={<ContactPage/>} />
          {!id &&
          <> 
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          </>}


          <Route element={<Protectedroute />} >
            <Route path="/app" element={<Sidebarrrender />}>
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="track" element={<Tracker />} />
              <Route path="agent" element={<Agenting/>} />
            </Route>
            <Route path="/agent" element={<Sidebarrrenderagent/>} >
              <Route path="googlesheet-agent" element={<GoogleSheetagent />} />
              <Route path="settings" element={<Setting />} />
            </Route>
          </Route>

          <Route path="*" element={<Errorpage />} />
        </Routes>
      </ThemeProvider>
    </BrowserRouter>
  )
}

export default App;
