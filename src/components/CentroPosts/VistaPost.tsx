import { useParams, useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../Hooks/useAuth";

import useGetPost from "../../Hooks/useGetPost";
import TarjetaUsuarioMini from "./TarjetaUsuarioMini";
import { Cargando, CargandoConMensaje } from "../modals/Cargando";

interface Props {
  openLoginModal: () => void;
}
export default function VistaPost({ openLoginModal }: Props) {
  // Obtenemos la id del post de la url
  const { id } = useParams();
  // Obtenemos los datos del post con la id
  const { post, cargando, error } = useGetPost({ id: Number(id) });

  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  function handleClick() {
    if (!isAuthenticated) {
      openLoginModal();
    } else {
      navigate(`/firmarContrato/${id}`);
    }
  }

  return (
    <div className=" flex xl:flex-row flex-col min-h-screen gap-6 m-12  ">
      {/* Imagen del animal */}
      <picture className="w-full xl:w-1/2 flex flex-col items-center justify-center gap-6 ">
        <img className="h-1/2 rounded-3xl" src="../imagenes/animales.jpg"></img>
        <p className="text-xl font-semibold ">
          {post.typeAnimal == "perro" ? "Perro 🐶 " : "Gato 🐱 "}
        </p>
      </picture>
      <article className="w-full xl:w-1/2 p-6 bg-pink-200 relative rounded-3xl shadow-lg">
        {cargando ? (
          <CargandoConMensaje>
            Cargando informacion del animal...
          </CargandoConMensaje>
        ) : (
          <div>
            <h2 className="text-center font-bold text-4xl mb-6">
              {post.nameAnimal}
            </h2>
            {/*Nombre y descripcion */}
            <section className="mb-6">
              <h3 className="font-semibold text-lg mb-3">
                Conoce a {post.nameAnimal}
              </h3>
              <p>{post?.description}</p>
            </section>
          </div>
        )}

        <hr className="my-6 border-black"></hr>
        {/* Datos del post */}
        <section className="flex flex-wrap w-full gap-6 mb-10">
          <div className="w-full flex gap-6 ">
            <div className="bg-gray-200 w-1/2 p-6 border-2 border-black rounded-3xl text-center">
              <h3 className="font-semibold text-2xl mb-3">
                Estado de adopcion...
              </h3>
              {cargando ? (
                <CargandoConMensaje>
                  Cargando estado de adopcion...
                </CargandoConMensaje>
              ) : (
                <div>
                  <p className="font-black mb-3">
                    {post?.adopted ? "ADOPTADO" : "NO ADOPTADO"}
                  </p>
                  <img
                    className="w-1/4 m-auto"
                    src={
                      post?.adopted == true
                        ? post.typeAnimal == "perro"
                          ? "/imagenes/perro-feliz.png"
                          : "/imagenes/gatito-feliz.png"
                        : post.typeAnimal == "perro"
                        ? "/imagenes/perro-triste.png"
                        : "/imagenes/gatito-triste.png"
                    }
                  ></img>
                </div>
              )}
            </div>
            <div className="bg-red-400 p-6 w-1/2 border-2 border-black rounded-3xl text-center">
              <h3 className="font-semibold text-2xl mb-3 ">
                Tipo de {post.typeAnimal == "perro" ? "Perro" : "Gato"}
              </h3>
              {cargando ? (
                <CargandoConMensaje>
                  Cargando raza del animal...
                </CargandoConMensaje>
              ) : (
                <div>
                  <p className="mb-3 font-semibold ">
                    La raza del animal es :{}
                  </p>
                  <p className=" font-black ">{post.race}</p>
                </div>
              )}
            </div>
          </div>

          <div className="w-full flex gap-6 justify-center">
            <div className="bg-blue-400 p-6 w-1/2 border-2 border-black rounded-3xl">
              <h3 className="font-semibold text-2xl mb-3 text-center">
                Cartilla sanitaria
              </h3>
              {cargando ? (
                <CargandoConMensaje>
                  Cargando cartilla del animal...
                </CargandoConMensaje>
              ) : (
                <div>
                  {" "}
                  <p className="text-center mb-3 font-semibold ">
                    Actualmente el animal cuanta con las siguientes vacunas:
                  </p>
                  <ul className="text-center ">
                    <li>
                      <details>
                        <summary className="font-black cursor-pointer ">
                          Distemper
                        </summary>
                        <p>
                          También conocido como moquillo canino, es una
                          enfermedad viral altamente contagiosa que afecta a
                          perros y otros animales, especialmente cachorros.
                        </p>
                      </details>
                    </li>
                    <li>
                      <details>
                        <summary className="font-black cursor-pointer ">
                          Parvovirus{" "}
                        </summary>
                        <p>
                          Es una enfermedad altamente contagiosa y letal que
                          afecta a los intestinos y que se manifiesta mediante
                          una diarrea sanguinolienta.
                        </p>
                      </details>
                    </li>
                    <li>
                      <details>
                        <summary className="font-black cursor-pointer ">
                          Hepatitis
                        </summary>
                        <p>
                          Enfermedad inflamatoria del hígado que puede afectar a
                          los perros.
                        </p>
                      </details>
                    </li>
                    <li>
                      <details>
                        <summary className="font-black cursor-pointer ">
                          Parainfluenza{" "}
                        </summary>
                        <p>
                          Es un virus respiratorio muy contagioso que causa la
                          traqueobronquitis infecciosa, también conocida como
                          tos de las perreras.
                        </p>
                      </details>
                    </li>
                    <li>
                      <details>
                        <summary className="font-black cursor-pointer ">
                          Vacuna contra la rabia
                        </summary>
                        <p>
                          es una enfermedad potencialmente mortal causada por un
                          virus que ataca el sistema nervioso central (cerebro y
                          médula espinal).
                        </p>
                      </details>
                    </li>
                  </ul>
                </div>
              )}
            </div>
          </div>

          {/* Boton para firmar la adopcion */}
          {post?.adopted == false && !cargando && (
            <div className="w-full flex gap-6 justify-center">
              <div className="p-6 text-black rounded-3xl text-center ">
                <h3 className="font-bold text-2xl mb-10">
                  Te gustaria darle otra oportunidad a {post?.nameAnimal}?
                </h3>
                <div className="relative inline-block">
                  <button
                    onClick={handleClick}
                    className="bg-white text-black px-6 py-3 rounded-full text-lg font-semibold relative"
                  >
                    Firma para una segunda oportunidad
                  </button>
                  <span className="absolute top-0 right-0 flex size-3">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-sky-400 opacity-75"></span>
                    <span className="relative inline-flex size-3 rounded-full bg-sky-500"></span>
                  </span>
                </div>
              </div>
            </div>
          )}
        </section>
        <hr className="mb-24 border-black "></hr>
        <footer className="absolute bottom-5 ">
          <p className="my-2">Publicado por: </p>
          {cargando ? (
            <Cargando></Cargando>
          ) : (
            <TarjetaUsuarioMini id={post.user_id}></TarjetaUsuarioMini>
          )}
        </footer>
      </article>
    </div>
  );
}
