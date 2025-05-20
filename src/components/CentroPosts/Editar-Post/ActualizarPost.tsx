import { useState } from "react";
import { updatePost } from "../../../services/ApiPost";
import useImagenPreview from "../../Hooks/useImagenPreview";
interface Props {
  id: number;
}
export default function ActualizarPost({ id }: Props) {
  const [cargandoSubmit, setCargandoSubmit] = useState(false);
  const [errorSubmit, setErrorSubmit] = useState("");
  const [mensaje, setMensaje] = useState("");

  const { imagePreview, handleImageChange } = useImagenPreview();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const original = new FormData(e.target as HTMLFormElement);
    const cleaned = new FormData();

    // destructuramos el FormData original
    for (const [key, value] of original) {
      const stringVacio = typeof value === "string" && value.trim() === "";
      const fileVacio = value instanceof File && value.size === 0;
      if (!stringVacio && !fileVacio) {
        // ③ solo copiamos si NO está vacío
        cleaned.append(key, value);
      }
    }
    // Convertir un iterador en un array || Si cleaned tiene las claves "title" y "content", el iterador produce "title" → "content".
    if (![...cleaned.keys()].length) {
      setMensaje("No se detectaron cambios");
      return;
    }

    try {
      setCargandoSubmit(true);
      const response = await updatePost(Number(id), cleaned);
      console.log(response);
      setMensaje("Post actualizado correctamente");
      return;
    } catch (error: any) {
      var mensaje = "";
      const errorResponse = error.errores;
      Object.keys(errorResponse).forEach((key) => {
        errorResponse[key].forEach((msg: string) => {
          mensaje += `${msg}\n`;
        });
      });
      setErrorSubmit(mensaje);
    } finally {
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    }
  }
  return (
    <>
      <h2 className="text-2xl font-semibold text-center ">
        ACTUALIZAR DATOS DEL POST
      </h2>
      <form
        onSubmit={handleSubmit}
        encType="multipart/form-data"
        method="POST"
        className="flex flex-col w-full gap-y-5 mt-5 border-2 border-pink-600 p-10  rounded-xl shadow-2xl"
      >
        <div className=" flex flex-col gap-y-3">
          <label htmlFor="nameAnimal" className="font-medium text-center">
            Nombre del animal
          </label>
          <input
            type="text"
            id="nameAnimal"
            name="nameAnimal"
            className="border-2 rounded-md p-2 focus:border-pink-600 outline-none"
            placeholder="Escribe el nuevo nombre del animal..."
            minLength={3}
          ></input>
        </div>
        <div className=" flex flex-col gap-y-3">
          <label htmlFor="description" className="font-medium text-center">
            Descripcion del animal
          </label>
          <textarea
            id="description"
            name="description"
            className="border-2 rounded-md p-2 focus:border-pink-600 outline-none"
            placeholder="Escribe la nueva descripcion del animal..."
            rows={4}
            minLength={10}
          ></textarea>
        </div>
        <div className=" flex flex-col gap-y-3">
          <label htmlFor="race" className="font-medium text-center">
            Raza del animal
          </label>
          <input
            type="text"
            id="race"
            name="race"
            className="border-2 rounded-md p-2 focus:border-pink-600 outline-none"
            placeholder="Escribe la raza del animal..."
            min={3}
          ></input>
        </div>
        <div className=" flex flex-col gap-y-3">
          <label htmlFor="image" className="font-medium text-center">
            Imagen del animal
          </label>
          <input
            type="file"
            id="image"
            name="image"
            onChange={handleImageChange}
            className="m-auto"
          ></input>
          {imagePreview && (
            <img
              src={imagePreview}
              alt="Preview"
              className="mt-4 w-full h-64 object-cover rounded-lg border-2 border-pink-300 shadow"
            />
          )}
        </div>
        <button
          type="submit"
          className={`${
            cargandoSubmit ? "bg-gray-400" : "bg-pink-300"
          } py-2 rounded-lg mt-4 font-bold`}
          disabled={cargandoSubmit}
        >
          {cargandoSubmit ? (
            <div className=" flex justify-center items-center col-span-full gap-x-2">
              <div className=" w-6 h-6 border-4 border-pink-400 border-t-transparent rounded-full animate-spin"></div>
              Cargando...
            </div>
          ) : (
            "ACTUALIZAR"
          )}
        </button>
        {errorSubmit ? (
          <pre className="text-red-600 text-center whitespace-break-spaces">
            {errorSubmit}
          </pre>
        ) : mensaje ? (
          <p className="text-green-600 text-center">{mensaje}</p>
        ) : null}
      </form>
    </>
  );
}
