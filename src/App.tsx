import { Route, BrowserRouter, Routes } from "react-router-dom"
import { Home } from "./pages/landingpage"
import { ThemeProvider } from "./components/ui/themeprovider"
import { Login } from "./auth/login";
import { Signup } from "./auth/signup";
import { Sidebarrrender } from "./pages/sidebar";
import { Dashboard } from "./pages/dashboard";
import { Protectedroute } from "./routes/protectedroute";
import { useAuthStore } from "./store/authstore";
import { Errorpage } from "./error/errorpage";
import { useEffect } from "react";
import { Spinner } from "./components/ui/spinner";

function App() {
  const { id, userfetch, loadinguser } = useAuthStore();

  useEffect(() => {
    if (!id) {
      userfetch();
    }
  }, [id, userfetch]);

  if (loadinguser) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Spinner className="size-10" />
      </div>
    );
  }

  return (
    <BrowserRouter>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <Routes>
          <Route path="/" element={<Home />} />
          {!id &&
            <>
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
            </>
          }
          <Route element={<Protectedroute />} >
            <Route path="/" element={<Sidebarrrender />}>
              <Route path="dashboard" element={<Dashboard />} />
            </Route>
          </Route>
          <Route path="*" element={<Errorpage />} />
        </Routes>
      </ThemeProvider>
    </BrowserRouter>
  )
}

export default App;
