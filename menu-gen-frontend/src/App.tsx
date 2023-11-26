import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/landing";
import InputPage from "./pages/input";
import MenuPage from "./pages/menu";
import LoginPage from "./pages/LoginPage";
import MenusPage from "./pages/MenusPage";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/input" element={<InputPage />} />
        <Route path="/menu" element={<MenuPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/menus" element={<MenusPage />} />
      </Routes>
    </BrowserRouter>
  );
}
