import { Link } from "react-router-dom";

interface HeaderProps {
  openLoginModal: () => void;
}
export default function Header({ openLoginModal }: HeaderProps) {
  return (
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
        </ul>
      </nav>
      <button
        onClick={openLoginModal}
        className="bg-pink-600 text-white px-4 py-2 rounded-full"
      >
        INICIAR SESION
      </button>
    </header>
  );
}
