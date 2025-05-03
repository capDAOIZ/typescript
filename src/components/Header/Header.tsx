import { useAuth } from "../context/AuthContext";
import SideBar from "./SideBar";
import { Link } from "react-router-dom";
interface HeaderProps {
  openLoginModal: () => void;
}
export default function Header({ openLoginModal }: HeaderProps) {
  const { isAuthenticated, user } = useAuth();

  return (
    <header className="bg-white shadow-md p-4 flex justify-around items-center w-full">
      <h1 className="text-pink-600 text-2xl font-bold">Animal Rescue</h1>
      <nav className="">
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
          {isAuthenticated && !user?.is_banned ? (
            <li>
              <Link to="/crearPost">
                <button className="">Buscar Familia🐾</button>
              </Link>
            </li>
          ) : (
            ""
          )}
        </ul>
      </nav>

      <div className="flex items-center space-x-2">
        <button
          onClick={openLoginModal}
          className={`${
            isAuthenticated ? "hidden" : ""
          } bg-pink-600 text-white px-4 py-2 rounded-full`}
        >
          INICIAR SESION
        </button>
        {isAuthenticated && <SideBar />}
      </div>
    </header>
  );
}
