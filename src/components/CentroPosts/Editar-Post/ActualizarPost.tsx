import { useState, useEffect } from "react";
import useImagenPreview from "../../../Hooks/useImagenPreview";
import useUpdatePost from "../../../Hooks/useUpdatePost";
import { BotonCargando } from "../../modals/Cargando";
import { getPost } from "../../../services/ApiPost";

interface Props {
  id: number;
}
export default function ActualizarPost({ id }: Props) {
  const { fecthUpdatePost, cargandoUpdate, mensajeUpdate, errorSubmit } =
    useUpdatePost();
  const { imagePreview, handleImageChange } = useImagenPreview();
  const [mensaje, setMensaje] = useState("");

  const [selectedVaccines, setSelectedVaccines] = useState<string[]>([]);

  useEffect(() => {
    async function fetchPost() {
      try {
        const data = await getPost(id); // devuelve { post: { ..., vaccines: ["rabia","moquillo"], ... } }
        const p = data.post;
        setSelectedVaccines(p.vaccines || []);
        // (opcional: podrías precargar otros campos si lo necesitas)
      } catch (err) {
        console.error("Error al cargar post:", err);
      }
    }
    fetchPost();
  }, [id]);

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
        <fieldset className="text-left border border-pink-300 rounded-lg p-4">
          <legend className="text-sm font-semibold text-pink-700 mb-2">
            Selecciona las vacunas 🩺
          </legend>
          <div className="grid grid-cols-2 gap-4">
            <label className="inline-flex items-center">
              <input
                type="checkbox"
                name="vaccines[]"
                value="rabia"
                className="form-checkbox h-5 w-5 text-pink-600"
                defaultChecked={selectedVaccines.includes("rabia")}
              />
              <span className="ml-2">Rabia</span>
            </label>
            <label className="inline-flex items-center">
              <input
                type="checkbox"
                name="vaccines[]"
                value="parvovirus"
                className="form-checkbox h-5 w-5 text-pink-600"
                defaultChecked={selectedVaccines.includes("parvovirus")}
              />
              <span className="ml-2">Parvovirus</span>
            </label>
            <label className="inline-flex items-center">
              <input
                type="checkbox"
                name="vaccines[]"
                value="moquillo"
                className="form-checkbox h-5 w-5 text-pink-600"
                defaultChecked={selectedVaccines.includes("moquillo")}
              />
              <span className="ml-2">Moquillo</span>
            </label>
            <label className="inline-flex items-center">
              <input
                type="checkbox"
                name="vaccines[]"
                value="leucemia"
                className="form-checkbox h-5 w-5 text-pink-600"
                defaultChecked={selectedVaccines.includes("leucemia")}
              />
              <span className="ml-2">Leucemia</span>
            </label>
            <label className="inline-flex items-center">
              <input
                type="checkbox"
                name="vaccines[]"
                value="parainfluen"
                className="form-checkbox h-5 w-5 text-pink-600"
                defaultChecked={selectedVaccines.includes("parainfluen")}
              />
              <span className="ml-2">Parainfluenza</span>
            </label>
          </div>
        </fieldset>
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
