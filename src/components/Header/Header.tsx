import { useAuth } from "../context/AuthContext";
import SideBar from "../../modals/SideBar";
import { Link } from "react-router-dom";
import { useState } from "react";
interface HeaderProps {
  openLoginModal: () => void;
}
export default function Header({ openLoginModal }: HeaderProps) {
  const { isAuthenticated, user } = useAuth();
  const [abrirNav, setAbrirNav] = useState(false);
  return (
    <header className="bg-white shadow-md pt-4 flex flex-col min-w-full">
      <div className="flex justify-between items-center w-full px-20 pb-4">
        <h1
          onClick={() => {
            if (window.innerWidth < 1024) {
              setAbrirNav((prevData) => !prevData);
            }
          }}
          className="text-pink-600 text-2xl font-bold cursor-pointer lg:pointer-events-none"
        >
          Animal Rescue
        </h1>
        <nav className="hidden lg:block">
          <ul className="flex space-x-10 text-gray-700 justify-center">
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
            <li
              className={`${
                isAuthenticated && !user?.is_banned ? "" : "hidden"
              }`}
            >
              <Link to="/crearPost">Buscar Familia🐾</Link>
            </li>
          </ul>
        </nav>
        <button
          onClick={openLoginModal}
          className={`${
            isAuthenticated ? "hidden" : ""
          } bg-pink-600 text-white px-4 py-2 rounded-full `}
        >
          INICIAR SESION
        </button>

        {isAuthenticated && <SideBar />}
      </div>
      <div
        className={`${
          abrirNav ? "block" : "hidden"
        } lg:hidden bg-orange-100 w-full py-5`}
      >
        <ul className="flex space-x-10 text-gray-700 justify-center">
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
          {isAuthenticated && !user?.is_banned ? (
            <li>
              <Link to="/crearPost" className="hover:text-pink-600">
                <button className="">Buscar Familia🐾</button>
              </Link>
            </li>
          ) : (
            ""
          )}
        </ul>
      </div>
    </header>
  );
}
