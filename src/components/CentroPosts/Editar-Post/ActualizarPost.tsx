import { useState } from "react";
import useImagenPreview from "../../Hooks/useImagenPreview";
import useUpdatePost from "../../Hooks/useUpdatePost";
import { BotonCargando } from "../../../modals/Cargando";
interface Props {
  id: number;
}
export default function ActualizarPost({ id }: Props) {
  const { fecthUpdatePost, cargandoUpdate, mensajeUpdate, errorSubmit } =
    useUpdatePost();
  const { imagePreview, handleImageChange } = useImagenPreview();
  const [mensaje, setMensaje] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const original = new FormData(e.target as HTMLFormElement);
    const formDataCleaned = new FormData();

    // destructuramos el FormData original
    for (const [key, value] of original) {
      const stringVacio = typeof value === "string" && value.trim() === "";
      const fileVacio = value instanceof File && value.size === 0;
      if (!stringVacio && !fileVacio) {
        // ③ solo copiamos si NO está vacío
        formDataCleaned.append(key, value);
      }
    }
    // Convertir un iterador en un array || Si cleaned tiene las claves "title" y "content", el iterador produce "title" → "content".
    if (![...formDataCleaned.keys()].length) {
      setMensaje("No se detectaron cambios");
      return;
    }

    await fecthUpdatePost({ id, formDataCleaned });
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
        {cargandoUpdate ? (
          <BotonCargando />
        ) : (
          <button
            type="submit"
            className="bg-pink-300 py-2 rounded-lg mt-4 font-bold"
          >
            "ACTUALIZAR"
          </button>
        )}

        {errorSubmit ? (
          <pre className="text-red-600 text-center whitespace-break-spaces">
            {errorSubmit}
          </pre>
        ) : mensajeUpdate ? (
          <p className="text-green-600 text-center">{mensajeUpdate}</p>
        ) : mensaje ? (
          <p className="text-blue-600 text-center">{mensaje}</p>
        ) : null}
      </form>
    </>
  );
}
