import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import HomePage from "./pages/user-front/HomePage";
import ContactPage from "./pages/user-front/ContactPage";
import AccountPage from "./pages/user-admin/AccountPage";
import NotFoundPage from "./pages/NotFoundPage";
import SkillsUser from "./pages/user-admin/SkillsUser";
import ExperiencesUser from "./pages/user-admin/ExperiencesUser";
import EducationsUser from "./pages/user-admin/EducationsUser";
import PortfoliosUser from "./pages/user-admin/PortfoliosUser";
import UserLayout from "./components/layouts/UserLayout";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import { useAuth } from "./states/auth";
import FrontLayout from "./components/layouts/FrontLayout";
import AboutPage from "./pages/user-front/AboutPage";
import PortfoliosPage from "./pages/user-front/PortfoliosPage";
import ResumePage from "./pages/user-front/ResumePage";
import CheckClient from "./pages/CheckClient";

function App() {
  const { isAuthenticated } = useAuth();
  return (
    <BrowserRouter>
      <Routes>
        <Route
          index
          element={
            isAuthenticated ? (
              <Navigate to="/user-experiences" />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route path="/client" element={<CheckClient />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route element={<FrontLayout />}>
          <Route path="/about" element={<AboutPage />} />
          <Route path="/resume" element={<ResumePage />} />
          <Route path="/portfolios" element={<PortfoliosPage />} />
          <Route path="/contact" element={<ContactPage />} />
        </Route>
        {isAuthenticated ? (
          <Route element={<UserLayout />}>
            <Route path="/account" element={<AccountPage />} />
            <Route path="/user-skills" element={<SkillsUser />} />
            <Route path="/user-experiences" element={<ExperiencesUser />} />
            <Route path="/user-educations" element={<EducationsUser />} />
            <Route path="/user-portfolios" element={<PortfoliosUser />} />
            <Route path="/user-contact" element={<ContactPage />} />
          </Route>
        ) : null}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
