import { Link } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";
export default function SideBar() {
  const [isOpen, setIsOpen] = useState(false);
  const { logout, user } = useAuth();

  // Funcion para cerrar sesion
  const handleCerrarSesion = () => {
    logout();
    setIsOpen(false);
  };

  return (
    <div>
      {/* Boton para abrir el sidebar, es la foto */}
      <button onClick={() => setIsOpen(true)}>
        <img
          className="rounded-full object-cover w-12 h-12 border-2 border-pink-600 "
          src={
            user?.image
              ? `data:image/jpeg;base64,${user.image}`
              : "/imagenes/fotoPredeterminada.jpg"
          }
          alt={user?.name}
        />
      </button>
      {/* Fondo negro que esta de fondo del sidebar */}
      <div
        className={`${
          !isOpen && "hidden"
        } bg-gray-600/50 min-h-screen w-full fixed top-0 right-0 backdrop-blur-0 z-10`}
        onClick={() => setIsOpen(false)}
      ></div>
      {/* Sidebar */}
      <div
        className={`${
          isOpen ? "w-80 " : "w-0"
        } bg-pink-600 min-h-screen fixed top-0 right-0 z-50 transition-all duration-200 ease-in-out`}
      >
        {/* Parte de arriba donde aparece la info del usuario */}
        <div className={`p-5 flex flex-row justify-between `}>
          <section className="flex flex-row gap-2 items-center justify-center">
            <img
              className="rounded-full object-cover w-10 h-10 border-2 border-gray-700"
              src={
                user?.image
                  ? `data:image/jpeg;base64,${user.image}`
                  : "/imagenes/fotoPredeterminada.jpg"
              }
              alt={user?.name}
            />
            <div>
              <p>{user?.name}</p>
              <p>{user?.email} </p>
            </div>
          </section>
          <button className="ml-4" onClick={() => setIsOpen(false)}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
              />
            </svg>
          </button>
        </div>

        <hr className="mb-2"></hr>

        {/* Enlaces */}
        <Link to="/perfil" onClick={() => setIsOpen(false)}>
          {" "}
          <div className="text-lg hover:bg-white/70 cursor-pointer py-3 mb-2 px-4 flex flex-row justify-start gap-2 items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
              />
            </svg>
            <p>Tu Perfil</p>
          </div>
        </Link>

        {user?.role === "admin" && (
          <Link to="/menuAdmin" onClick={() => setIsOpen(false)}>
            {" "}
            <div className="text-lg hover:bg-white/70 cursor-pointer py-3 mb-2 px-4 flex flex-row justify-start gap-2 items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88"
                />
              </svg>

              <p>Menu Administrador</p>
            </div>
          </Link>
        )}

        <Link to="/publicaciones" onClick={() => setIsOpen(false)}>
          <div className="text-lg hover:bg-white/70 cursor-pointer py-3 mb-2 px-4 flex flex-row justify-start gap-2 items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.25 13.5h3.86a2.25 2.25 0 0 1 2.012 1.244l.256.512a2.25 2.25 0 0 0 2.013 1.244h3.218a2.25 2.25 0 0 0 2.013-1.244l.256-.512a2.25 2.25 0 0 1 2.013-1.244h3.859m-19.5.338V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18v-4.162c0-.224-.034-.447-.1-.661L19.24 5.338a2.25 2.25 0 0 0-2.15-1.588H6.911a2.25 2.25 0 0 0-2.15 1.588L2.35 13.177a2.25 2.25 0 0 0-.1.661Z"
              />
            </svg>

            <p>Tus publicaciones</p>
          </div>
        </Link>

        <Link to="/crearPost" onClick={() => setIsOpen(false)}>
          <div className="text-lg hover:bg-white/70 cursor-pointer py-3 mb-2 px-4 flex flex-row justify-start gap-2 items-center">
            <p>🐾 Buscar Familia</p>
          </div>
        </Link>

        <hr className="mb-2"></hr>
        {/* Enlaces para cerrar la sesion */}
        <div
          onClick={handleCerrarSesion}
          className="text-lg hover:bg-white/70 cursor-pointer py-3 mb-2 px-4 flex flex-row justify-start gap-2 items-center "
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className="size-5"
          >
            <path
              fillRule="evenodd"
              d="M3 4.25A2.25 2.25 0 0 1 5.25 2h5.5A2.25 2.25 0 0 1 13 4.25v2a.75.75 0 0 1-1.5 0v-2a.75.75 0 0 0-.75-.75h-5.5a.75.75 0 0 0-.75.75v11.5c0 .414.336.75.75.75h5.5a.75.75 0 0 0 .75-.75v-2a.75.75 0 0 1 1.5 0v2A2.25 2.25 0 0 1 10.75 18h-5.5A2.25 2.25 0 0 1 3 15.75V4.25Z"
              clipRule="evenodd"
            />
            <path
              fillRule="evenodd"
              d="M19 10a.75.75 0 0 0-.75-.75H8.704l1.048-.943a.75.75 0 1 0-1.004-1.114l-2.5 2.25a.75.75 0 0 0 0 1.114l2.5 2.25a.75.75 0 1 0 1.004-1.114l-1.048-.943h9.546A.75.75 0 0 0 19 10Z"
              clipRule="evenodd"
            />
          </svg>
          <p>Cerrar sesion</p>
        </div>
      </div>
    </div>
  );
}
