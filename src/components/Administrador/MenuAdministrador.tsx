import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";
export default function MenuAdministrador() {
  const { user } = useAuth();

  function abrirMenu() {
    const desplegarMenu = document.getElementById("desplegarMenu");
    const menu = document.getElementById("menu");
    if (desplegarMenu && menu) {
      desplegarMenu.classList.toggle("hidden");
      menu.classList.toggle("hidden");
    }
  }

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center mb-20">
      <h1 className="text-xl font-bold text-center mt-4 mb-4">
        Hola buenas querido administrador{" "}
        <span className="text-2xl text-pink-600"> {user?.name}</span>
      </h1>
      <div className="bg-pink-300 rounded-lg shadow-lg py-10 px-5 m-4 w-4/5 text-center">
        <section className="flex flex-col gap-4" id="desplegarMenu">
          <h2 className="text-lg font-bold mb-4">
            Desplega el menu donde puedes gestionar la pagina web
          </h2>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="size-8 mx-auto animate-bounce "
            onClick={abrirMenu}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m4.5 5.25 7.5 7.5 7.5-7.5m-15 6 7.5 7.5 7.5-7.5"
            />
          </svg>
          <footer className="text-sm text-gray-500 mt-20">
            Recuerda querido administrador que se te ha dado una resposabilidad
            y tienes que usarla como se te ha enseñado tanto sabiamente como
            objetivamente
          </footer>
        </section>
        <section id="menu" className="hidden">
          <h2 className="text-2xl font-bold mb-16">MENU</h2>
          <div className="flex flex-col">
            <div className="flex mb-10">
              <section className="w-1/2  flex flex-col items-center gap-y-5">
                <Link to="/menuAdmin/gestionarUsuarios">
                  <img
                    src="/imagenes/grupoUsuarios.png"
                    className="w-50 h-40 object-contain mb-5 "
                    alt="Grupo de usuarios"
                  ></img>
                  <p>Gestionar Usuarios</p>
                </Link>
              </section>
              <section className="w-1/2 flex flex-col items-center gap-y-5">
                <Link to={"/menuAdmin/gestionarMascotas"}>
                  <img
                    src="/imagenes/animales.jpg"
                    className="w-50 h-40 object-cover rounded mb-5"
                    alt="Animales"
                  ></img>
                  <p>Gestionar Mascotas</p>
                </Link>
              </section>
            </div>
            <section className="w-full flex flex-col items-center gap-y-5">
              <Link to="/menuAdmin/gestionarPosts">
                <img
                  src="/imagenes/checks.png"
                  className="w-50 h-40 object-cover rounded"
                  alt="Checks"
                ></img>
                <p>Verificacion de posts</p>
              </Link>
            </section>
          </div>
        </section>
      </div>
    </div>
  );
}
