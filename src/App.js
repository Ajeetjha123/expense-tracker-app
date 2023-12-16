//import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AuthForm from "./components/auth/AuthForm";
import { Expenses } from "./pages/Expenses";
import Profile from "./pages/Profile";
import { useContext } from "react";
import AuthContext from "./store/auth-context";
import ForgotPassword from "./pages/ForgotPassword";
function App() {
  const authCtx = useContext(AuthContext);
  const isLoggedIn = authCtx.isLoggedIn;
  return (
    <Router>
      <Routes>
        {isLoggedIn ? (
          <Route path="/expense" element={<Expenses />} />
        ) : (
          <Route path="/" element={<AuthForm />} />
        )}
        <Route path="/profile" element={<Profile />} />
        <Route path="/forgot" element={<ForgotPassword />} />
      </Routes>
    </Router>
  );
}

export default App;
