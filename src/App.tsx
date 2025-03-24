import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import "tailwindcss/tailwind.css";

import Adoptables from "./components/Adoptables";
import Base from "./components/Base";
import Nosotros from "./components/Nosotros";
import Contacto from "./components/Contacto";
import LoginModal from "./components/LoginModal"; // Modal de inicio de sesión

const App: React.FC = () => {
  const [isLoginModalOpen, setLoginModalOpen] = useState(false);

  const openLoginModal = () => setLoginModalOpen(true);
  const closeLoginModal = () => setLoginModalOpen(false);

  return (
    <Router>
      <header className="bg-white shadow-md p-4 flex justify-between items-center w-full">
        <h1 className="text-pink-600 text-2xl font-bold">Animal Rescue</h1>
        <nav className="flex-1">
          <ul className="flex space-x-6 text-gray-700 justify-center">
            <li>
              <Link to="/" className="hover:text-pink-600">
                Inicio
              </Link>
            </li>
            <li>
              <Link to="/adoptables" className="hover:text-pink-600">
                Mascotas en Adopción
              </Link>
            </li>
            <li>
              <Link to="/nosotros" className="hover:text-pink-600">
                Sobre Nosotros
              </Link>
            </li>
            <li>
              <Link to="/contacto" className="hover:text-pink-600">
                Contacto
              </Link>
            </li>
          </ul>
        </nav>
        <button
          onClick={openLoginModal}
          className="bg-pink-600 text-white px-4 py-2 rounded-full"
        >
          INICIAR SESION
        </button>
      </header>

      <main className="w-full">
        <Routes>
          <Route path="/" element={<Base />} />
          <Route path="/adoptables" element={<Adoptables />} />
          <Route path="/nosotros" element={<Nosotros />} />
          <Route path="/contacto" element={<Contacto />} />
        </Routes>
      </main>

      <LoginModal isOpen={isLoginModalOpen} closeModal={closeLoginModal} />
    </Router>
  );
};

export default App;
