import { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import Header from "./components/Header";

import Adoptables from "./components/Adoptables";
import Base from "./components/Base";
import Nosotros from "./components/Nosotros";
import Contacto from "./components/Contacto";
import LoginModal from "./modals/LoginModal"; // Modal de inicio de sesión

function App() {
  const [isLoginModalOpen, setLoginModalOpen] = useState(false);

  const openLoginModal = () => setLoginModalOpen(true);
  const closeLoginModal = () => setLoginModalOpen(false);

  return (
    <>
      <Router>
        <LoginModal isOpen={isLoginModalOpen} closeModal={closeLoginModal} />
        <Header openLoginModal={openLoginModal}></Header>
        <main className="w-full">
          <Routes>
            <Route path="/" element={<Base />} />
            <Route path="/adoptables" element={<Adoptables />} />
            <Route path="/nosotros" element={<Nosotros />} />
            <Route path="/contacto" element={<Contacto />} />
          </Routes>
        </main>
      </Router>
    </>
  );
}

export default App;
