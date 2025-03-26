import { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import Header from "./components/Header";
import Footer from "./components/Footer/Footer";

import Adoptables from "./components/Adoptables";
import Base from "./components/Base";
import Nosotros from "./components/Nosotros";
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
          </Routes>
        </main>
        <Footer></Footer>
      </Router>
    </>
  );
}

export default App;
