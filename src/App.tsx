import { useState } from "react";
import { useAuth } from "./components/context/AuthContext";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { RutaPrivada, RutaPrivadaAdmin } from "./components/RutaPrivada";

import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";

import Adoptables from "./components/Header/Adoptables";
import Base from "./components/Base/Base";
import Nosotros from "./components/Header/Nosotros";
import LoginModal from "./modals/LoginModal"; // Modal de inicio de sesión
import Perfil from "./Perfil/Perfil";
import CrearPost from "./components/CrearPost";
import Registrarse from "./components/Registrarse";
import VistaPost from "./components/CentroPosts/VistaPost";
import MenuAdministrador from "./components/Administrador/MenuAdministrador";
import FirmaContrato from "./components/Contrato/FirmaContrato";
import GestionUsuarios from "./components/Administrador/GestionUsuarios";
import GestionMascotas from "./components/Administrador/GestionMascotas";
import VistaUsuario from "./Perfil/VistaUsuario";
import Publicaciones from "./components/CentroPosts/Publicaciones";
import GestionPosts from "./components/Administrador/GestionPosts";
import EditarPost from "./components/CentroPosts/Editar-Post/EditarPost";

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
            <Route
              path={"/adoptables/:id"}
              element={<VistaPost openLoginModal={openLoginModal} />}
            ></Route>

            <Route path="/nosotros" element={<Nosotros />} />
            <Route path="/registrarse" element={<Registrarse />} />

            <Route path="/firmarContrato/:id" element={<FirmaContrato />} />

            <Route path="/perfilUsuario/:id" element={<VistaUsuario />} />

            <Route
              path="/perfil"
              element={<RutaPrivada component={Perfil} />}
            />

            <Route
              path="/publicaciones"
              element={<RutaPrivada component={Publicaciones} />}
            ></Route>

            <Route
              path="/menuAdmin"
              element={<RutaPrivadaAdmin component={MenuAdministrador} />}
            />
            <Route
              path="/menuAdmin/gestionarUsuarios"
              element={<RutaPrivadaAdmin component={GestionUsuarios} />}
            />
            <Route
              path="/menuAdmin/gestionarMascotas"
              element={<RutaPrivadaAdmin component={GestionMascotas} />}
            />
            <Route
              path="/menuAdmin/gestionarPosts"
              element={<RutaPrivadaAdmin component={GestionPosts} />}
            />

            <Route
              path="/crearPost"
              element={<RutaPrivada component={CrearPost} />}
            />

            <Route
              path="/editarPost/:id"
              element={<RutaPrivada component={EditarPost} />}
            />

            {/* Redirigir cualquier ruta no definida al inicio */}
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </main>
        <Footer></Footer>
      </Router>
    </div>
  );
}
