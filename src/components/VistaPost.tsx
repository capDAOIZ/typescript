import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { getPost } from "../services/ApiPost";
import { perfilUsuario } from "../services/ApiUsuario";
interface Post {
  nameAnimal: string;
  typeAnimal: string;
  description: string;
  image: File;
  user_id: number;
  adopted: boolean;
}
interface Usuario {
  name: string;
  email: string;
  image: File;
}
export default function VistaPost() {
  const [post, setPost] = useState<Post>();
  const [usuario, setUsuario] = useState<Usuario>();

  const { id } = useParams();
  const idUsuario = post?.user_id;
  // Obtenemos los datos del post con la id
  useEffect(() => {
    async function fetchPost() {
      try {
        const response = await getPost(Number(id));
        const data = response.post;
        console.log(data);
        setPost(data);
      } catch (error) {}
    }
    fetchPost();
  }, []);

  // Obtenemos los datos del usuario que ha creado el post
  useEffect(() => {
    async function fetchUsuario() {
      try {
        if (!idUsuario) return;
        const response = await perfilUsuario(idUsuario);
        console.log(response);
        const data = response;
        setUsuario(data);
      } catch (error) {}
    }
    fetchUsuario();
  }, [idUsuario]);

  return (
    <div className=" flex lg:flex-row flex-col min-h-screen gap-6 m-12  ">
      <picture className="w-full lg:w-1/2 flex flex-col items-center justify-center gap-6 ">
        <img className="h-1/2 rounded-3xl" src="../images/animales.jpg"></img>
        <p className="text-xl font-semibold ">
          {post?.typeAnimal == "perro" ? "Perro 🐶 " : "Gato 🐱 "}
        </p>
      </picture>
      <article className="w-full lg:w-1/2 p-6 bg-pink-200 relative rounded-3xl shadow-lg">
        <h2 className="text-center font-bold text-4xl mb-6">
          {post?.nameAnimal}
        </h2>
        <section className="mb-6">
          <h3 className="font-semibold text-lg mb-3">
            Conoce a {post?.nameAnimal}
          </h3>
          <p>{post?.description}</p>
        </section>
        <hr className="my-6 border-black"></hr>
        <section className="flex flex-wrap w-full gap-6 mb-10">
          <div className="w-full flex gap-6 ">
            <div className="bg-pink-400 w-1/2 p-6 border-2 border-black rounded-3xl text-center">
              <h3 className="font-semibold text-2xl mb-3">
                Estado de adopcion...
              </h3>
              <p className="font-black mb-3">
                {post?.adopted ? "ADOPTADO" : "NO ADOPTADO"}
              </p>
              <img
                className="w-1/4 m-auto"
                src={
                  post?.adopted == true
                    ? post?.typeAnimal == "perro"
                      ? "/images/perro-feliz.png"
                      : "/images/gatito-feliz.png"
                    : post?.typeAnimal == "perro"
                    ? "/images/perro-triste.png"
                    : "/images/gatito-triste.png"
                }
              ></img>
            </div>
            <div className="bg-red-400 p-6 w-1/2 border-2 border-black rounded-3xl">
              <h3 className="font-semibold text-2xl mb-3 text-center">
                Tipo de {post?.typeAnimal == "perro" ? "Perro" : "Gato"}
              </h3>
              <p className="text-center mb-3 font-semibold ">
                La raza del animal es :{" "}
              </p>
              <p className="text-center font-black ">LABRADOR</p>
            </div>
          </div>

          <div className="w-full flex gap-6 justify-center">
            <div className="bg-blue-400 p-6 w-1/2 border-2 border-black rounded-3xl">
              <h3 className="font-semibold text-2xl mb-3 text-center">
                Cartilla sanitaria
              </h3>
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
                      También conocido como moquillo canino, es una enfermedad
                      viral altamente contagiosa que afecta a perros y otros
                      animales, especialmente cachorros.
                    </p>
                  </details>
                </li>
                <li>
                  <details>
                    <summary className="font-black cursor-pointer ">
                      Parvovirus{" "}
                    </summary>
                    <p>
                      Es una enfermedad altamente contagiosa y letal que afecta
                      a los intestinos y que se manifiesta mediante una diarrea
                      sanguinolienta.
                    </p>
                  </details>
                </li>
                <li>
                  <details>
                    <summary className="font-black cursor-pointer ">
                      Hepatitis
                    </summary>
                    <p>
                      Enfermedad inflamatoria del hígado que puede afectar a los
                      perros.
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
                      traqueobronquitis infecciosa, también conocida como tos de
                      las perreras.
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
          </div>

          {post?.adopted == false && (
            <div className="w-full flex gap-6 justify-center">
              <div className="p-6 text-black rounded-3xl text-center ">
                <h3 className="font-bold text-2xl mb-10">
                  Te gustaria darle otra oportunidad a {post?.nameAnimal}?
                </h3>
                <div className="relative inline-block">
                  <button className="bg-white text-black px-6 py-3 rounded-full text-lg font-semibold relative">
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
        <section className="absolute bottom-5  ">
          <p className="my-2">Publicado por: </p>
          <div className="flex items-center gap-3">
            <img
              className="rounded-full object-cover w-10 h-10 border-2  border-black "
              src={
                usuario?.image
                  ? `data:image/jpeg;base64,${usuario.image}`
                  : "/images/fotoPredeterminada.jpg"
              }
              alt={usuario?.name}
            />
            <div>
              <h6 className="font-semibold">{usuario?.name} </h6>
              <p>{usuario?.email}</p>
            </div>
          </div>
        </section>
      </article>
    </div>
  );
}
