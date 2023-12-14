//import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AuthForm from "./components/auth/AuthForm";
import { Expenses } from "./pages/Expenses";
import Profile from "./pages/Profile";
import { useContext } from "react";
import AuthContext from "./store/auth-context";
function App() {
  const authCtx = useContext(AuthContext);
  const isLoggedIn = authCtx.isLoggedIn;
  return (
    <BrowserRouter>
      <Routes>
        {isLoggedIn ? (
          <Route path="/expense" element={<Expenses />} />
        ) : (
          <Route path="/" element={<AuthForm />} />
        )}
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
