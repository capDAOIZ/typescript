import { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import RutaPrivada from "./components/RutaPrivada";

import Header from "./components/Header";
import Footer from "./components/Footer/Footer";

import Adoptables from "./components/Adoptables";
import Base from "./components/Base";
import Nosotros from "./components/Nosotros";
import LoginModal from "./modals/LoginModal"; // Modal de inicio de sesión
import Perfil from "./components/Perfil";
import CrearPost from "./components/CrearPost";
import Registrarse from "./components/Registrarse";

export default function App() {
  const [isLoginModalOpen, setLoginModalOpen] = useState(false);

  const openLoginModal = () => setLoginModalOpen(true);
  const closeLoginModal = () => setLoginModalOpen(false);

  return (
    <div className="flex flex-col min-h-screen">
      <Router>
        <LoginModal isOpen={isLoginModalOpen} closeModal={closeLoginModal} />
        <Header openLoginModal={openLoginModal}></Header>
        <main className="w-full flex-1">
          <Routes>
            <Route path="/" element={<Base />} />
            <Route path="/adoptables" element={<Adoptables />} />
            <Route path="/nosotros" element={<Nosotros />} />
            <Route
              path="/perfil"
              element={<RutaPrivada component={Perfil} />}
            />
            <Route
              path="/crearPost"
              element={<RutaPrivada component={CrearPost} />}
            />
            <Route path="/registrarse" element={<Registrarse />} />
          </Routes>
        </main>
        <Footer></Footer>
      </Router>
    </div>
  );
}
