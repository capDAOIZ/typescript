import { useAuth } from "../../../Hooks/useAuth";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Confetti from "react-confetti";
import { BotonCargando } from "../../modals/Cargando";
import { getPost } from "../../../services/ApiPost";

interface Props {
  handleCrearContrato: () => Promise<boolean>;
  datosContrato: FormData | null;
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
  const [error, setError] = useState(false);

  const { user } = useAuth();
  const navigate = useNavigate();

  //Datos del adoptante
  useEffect(() => {
    const adoptante = {
      nombre:
        (datosContrato?.get("nombre") as string) || "nombre del adoptante",
      primerApellido:
        (datosContrato?.get("primerApellido") as string) ||
        "primer apellido del adoptante",
      segundoApellido:
        (datosContrato?.get("segundoApellido") as string) ||
        "segundo apellido del adoptante",
      email: (datosContrato?.get("email") as string) || "email del adoptante",
      telefono:
        (datosContrato?.get("telefono") as string) || "telefono del adoptante",
      fecha_nacimiento:
        (datosContrato?.get("fecha_nacimiento") as string) ||
        "fecha de nacimiento del adoptante",
      firma: (datosContrato?.get("firma") as string) || "firma del adoptante",
      postId: (datosContrato?.get("post_id") as string) || "0",
    };
    setAdoptante(adoptante);
  }, []);

  //Datos del animal adoptado
  useEffect(() => {
    async function datosAnimal() {
      const postId = Number(datosContrato?.get("post_id") as string);
      try {
        const response = await getPost(postId);
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
  }, []);

  async function handleClick() {
    setCargando(true);
    const confirmacionContrato = await handleCrearContrato();
    if (confirmacionContrato) {
      setError(false);
      setMostrarConfeti(true);
      setTimeout(() => {
        navigate("/");
      }, 5000);
    } else {
      setError(true);
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
                src="/imagenes/animales.jpg"
                alt="Imagen del adoptado"
                className="border p-2 rounded w-10/12"
              />
            </section>
          </div>
        </div>
        <div className="">
          {error && (
            <p className="text-red-600 flex justify-center mb-5">
              Problemas en la red, intentalo mas tarde
            </p>
          )}
          {cargando ? (
            <BotonCargando />
          ) : (
            <button
              onClick={handleClick}
              className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-800 w-full"
              disabled={cargando}
            >
              "Finalizar adopcion"
            </button>
          )}
        </div>
      </div>
      {mostrarConfeti && (
        <Confetti width={window.innerWidth} height={window.innerHeight} />
      )}
    </section>
  );
}
