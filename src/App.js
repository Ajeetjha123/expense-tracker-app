//import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AuthForm from "./components/auth/AuthForm";
import { Expenses } from "./pages/Expenses";
import Profile from "./pages/Profile";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AuthForm />} />
        <Route path="/expense" element={<Expenses />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
