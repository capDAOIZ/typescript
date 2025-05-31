import { useAuth } from "../../../Hooks/useAuth";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Confetti from "react-confetti";
import { useWindowSize } from "react-use";

import { getPost } from "../../../services/ApiPost";

interface Props {
  handleCrearContrato: () => Promise<boolean>;
  datosContrato?: Record<string, string>;
}
interface Post {
  nombre: string;
  tipo: string;
  description?: string;
  raza: string;
  imagen: File;
  user_id?: number;
  adopted?: boolean;
}

interface Adoptante {
  nombre: string;
  primerApellido: string;
  segundoApellido: string;
  email: string;
  telefono: string;
  fecha_nacimiento: string;
  firma: string;
  postId: string;
}

export default function ContratoFinal({
  handleCrearContrato,
  datosContrato,
}: Props) {
  const [adoptante, setAdoptante] = useState<Adoptante>();
  const [post, setPost] = useState<Post>();
  const [cargando, setCargando] = useState(false);
  const [mostrarConfeti, setMostrarConfeti] = useState(false);

  const { user } = useAuth();
  const navigate = useNavigate();

  //Datos del adoptante
  useEffect(() => {
    const adoptante = {
      nombre: datosContrato?.nombre || "nombre del adoptante",
      primerApellido:
        datosContrato?.primerApellido || "primer apellido del adoptante",
      segundoApellido:
        datosContrato?.segundoApellido || "segundo apellido del adoptante",
      email: datosContrato?.email || "email del adoptante",
      telefono: datosContrato?.telefono || "telefono del adoptante",
      fecha_nacimiento:
        datosContrato?.fecha_nacimiento || "fecha de nacimiento del adoptante",
      firma: datosContrato?.firma || "firma del adoptante",
      postId: datosContrato?.post_id || "0",
    };
    setAdoptante(adoptante);
  }, []);

  //Datos del animal adoptado
  useEffect(() => {
    async function datosAnimal() {
      if (!adoptante) return;
      try {
        const response = await getPost(Number(adoptante.postId));
        const data = response.post;
        //Porque hariamos esto? Porque existe la posibilidad de que el nombre de los datos que nos viene de la api cambie, asi que asi lo tenemos encapsulado
        const nuevoData: Post = {
          nombre: data.nameAnimal,
          tipo: data.typeAnimal,
          raza: data.race,
          imagen: data.image,
        };

        setPost(nuevoData);
      } catch (error) {}
    }
    datosAnimal();
  }, [adoptante]);

  async function handleClick() {
    setCargando(true);
    const confirmacionContrato = await handleCrearContrato();
    if (confirmacionContrato) {
      setMostrarConfeti(true);
      setTimeout(() => {
        navigate("/");
      }, 5000);
    } else {
      alert("Error al crear el contrato");
      setCargando(false);
    }
  }
  return (
    <section className="bg-blue-400 w-full xl:w-1/2 min-h-screen rounded-3xl p-10  shadow-lg shadow-pink-600 ">
      <h1 className="text-4xl font-bold mb-5 text-center">
        FINALIZAR ADOPCION
      </h1>
      <p className="text-center text-lg mb-10">
        Hola, {user?.name} esta es la informacion del contrato{" "}
      </p>
      <div className="bg-white rounded-xl flex flex-col gap-y-10 p-10">
        <div>
          <h1 className="text-2xl font-bold mb-10">Datos del Adoptante</h1>
          <div className="flex justify-between items-center ">
            <section className="flex flex-col gap-y-5 w-1/2">
              <p>
                Nombre: <span className="font-bold">{adoptante?.nombre}</span>
              </p>
              <p>
                Apellidos:{" "}
                <span className="font-bold">
                  {adoptante?.primerApellido} {adoptante?.segundoApellido}
                </span>
              </p>
              <p>
                Correo: <span className="font-bold">{adoptante?.email}</span>
              </p>
              <p>
                Telefono:{" "}
                <span className="font-bold">{adoptante?.telefono}</span>
              </p>
              <p>
                Fecha nacimiento:{" "}
                <span className="font-bold">{adoptante?.fecha_nacimiento}</span>
              </p>
              <p>
                DNI: <span className="font-bold">DNI</span>
              </p>
            </section>
            <section className="flex flex-col items-center w-1/2">
              <p className="mb-2 font-bold">Firma:</p>
              <img
                src={adoptante?.firma}
                alt="Firma del adoptante"
                className="border p-2 rounded w-10/12"
              />
            </section>
          </div>
        </div>
        <div>
          <h1 className="text-2xl font-bold mb-5">Datos del animal Adoptado</h1>
          <div className="flex justify-between items-center ">
            <section className="flex flex-col gap-y-5 w-1/2 py-8 ">
              <p>
                Nombre: <span className="font-bold">{post?.nombre}</span>
              </p>
              <p>
                Tipo de animal: <span className="font-bold">{post?.tipo}</span>
              </p>
              <p>
                Raza del animal: <span className="font-bold">{post?.raza}</span>
              </p>
              <p>
                Cartilla sanitaria: <span className="font-bold">CARTILLA</span>
              </p>
            </section>
            <section className="flex flex-col items-center w-1/2 ">
              <p className="mb-2 font-bold ">Imagen del animal:</p>
              <img
                src="/images/animales.jpg"
                alt="Imagen del adoptado"
                className="border p-2 rounded w-10/12"
              />
            </section>
          </div>
        </div>
        <button
          onClick={handleClick}
          className={
            cargando
              ? "bg-gray-600 text-white py-2 px-4 rounded  mt-10"
              : "bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-800 mt-10"
          }
          disabled={cargando}
        >
          {cargando ? (
            <div className=" flex justify-center items-center gap-x-2">
              <div className=" w-6 h-6 border-4 border-pink-400 border-t-transparent rounded-full animate-spin"></div>
              Cargando...
            </div>
          ) : (
            "Finalizar adopcion"
          )}
        </button>
      </div>
      {mostrarConfeti && (
        <Confetti width={window.innerWidth} height={window.innerHeight} />
      )}
    </section>
  );
}
