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

  const { isAuthenticated, user } = useAuth();
  const navigate = useNavigate();
  console.log(user?.is_banned);

  function handleClick() {
    if (!isAuthenticated) {
      openLoginModal();
    } else {
      navigate(`/firmarContrato/${id}`);
    }
  }
   const vaccineInfo: Record<string, string> = {
    moquillo:
      "También conocido como distemper canino, es una enfermedad viral altamente contagiosa que afecta a perros.",
    parvovirus:
      "Virus que provoca gastroenteritis grave, caracterizada por diarrea sanguinolenta, letal si no se trata rápidamente.",
    hepatitis:
      "Enfermedad inflamatoria del hígado que puede poner en riesgo la vida del animal si no se vacuna a tiempo.",
    parainfluen:
      "Virus respiratorio muy contagioso que causa traqueobronquitis infecciosa, conocida como “tos de las perreras”.",
    rabia:
      "Enfermedad zoonótica mortal que ataca el sistema nervioso central. La vacuna es obligatoria para prevenir contagios.",
    leucemia:
      "Vacuna contra la leucemia felina (en gatos) o la leucemia canina (en perros), importante para prevenir cánceres virales.",
  };
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
                    <CargandoConMensaje>Cargando cartilla…</CargandoConMensaje>
                  ) : (
                    <div>
                      <p className="text-center mb-3 font-semibold">
                        Actualmente {post?.nameAnimal} cuenta con las siguientes vacunas:
                      </p>

                      {/* Si no hay ninguna vacuna, mostramos un mensaje alternativo */}
                      {post?.vaccines?.length === 0 ? (
                        <p className="text-center font-medium">
                          No se encontraron vacunas registradas.
                        </p>
                      ) : (
                        <ul className="text-left list-disc list-inside space-y-2">
                          {post?.vaccines.map((key) => (
                            <li key={key}>
                              <details>
                                <summary className="font-black cursor-pointer">
                                  {/* Capitalizamos la primera letra de la clave */}
                                  {key.charAt(0).toUpperCase() + key.slice(1)}
                                </summary>
                                <p className="mt-2 text-justify">
                                  {vaccineInfo[key] ||
                                    "Descripción no disponible para esta vacuna."}
                                </p>
                              </details>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  )}
                </div>
              </div>

          {/* Boton para firmar la adopcion */}
          {post?.adopted == false && !cargando && user?.is_banned == false && (
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
