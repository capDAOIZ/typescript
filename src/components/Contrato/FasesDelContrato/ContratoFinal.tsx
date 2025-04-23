import { useAuth } from "../../context/AuthContext";
export default function ContratoFinal() {
  const { user } = useAuth();
  return (
    <section className="bg-blue-400 w-full xl:w-1/2 min-h-screen rounded-3xl p-10  shadow-lg shadow-pink-600 ">
      <h1 className="text-4xl font-bold mb-5 text-center">
        FINALIZAR ADOPCION
      </h1>
      <p className="text-center text-lg mb-10">
        Hola, {user?.name} esta es la informacion del contrato{" "}
      </p>
      <div className="bg-white rounded-xl flex flex-col gap-y-10 p-10">
        <div className="flex flex-col gap-y-5 ">
          <h1 className="text-2xl font-bold">Datos del Adoptante</h1>
          <p>
            Nombre: <span className="font-bold">NOMBRE</span>
          </p>
          <p>
            Correo: <span className="font-bold">APELLIDOS</span>
          </p>
          <p>
            Telefono: <span className="font-bold">TELEFONO</span>
          </p>
          <p>
            Fecha nacimiento: <span className="font-bold">FECHA</span>
          </p>
          <p>
            Firma: <span className="font-bold">FIRMA</span>
          </p>
        </div>
        <div className="flex flex-col gap-y-5 ">
          <h1 className="text-2xl font-bold">Datos del animal Adoptado</h1>
          <p>
            Nombre: <span className="font-bold">NOMBRE</span>
          </p>
          <p>
            Tipo de animal: <span className="font-bold">PERRO O GATO</span>
          </p>
          <p>
            Raza del animal: <span className="font-bold">RAZA</span>
          </p>
          <p>
            Cartilla sanitaria: <span className="font-bold">CARTILLA</span>
          </p>
          <p>
            Imagen: <span className="font-bold">IMAGEN DEL ANIMAL</span>
          </p>
        </div>
        <button className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-800">
          FINALIZAR
        </button>
      </div>
    </section>
  );
}
