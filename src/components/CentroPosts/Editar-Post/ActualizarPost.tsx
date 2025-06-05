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
        console.log(p);
        setSelectedVaccines(p.vaccines || []);
        // (opcional: podrías precargar otros campos si lo necesitas)
      } catch (err) {
        console.error("Error al cargar post:", err);
      }
    }
    fetchPost();
  }, [id]);

  function handleCheckboxChange(vacuna: string, estáChecked: boolean) {
    setSelectedVaccines((prev) => {
      if (estáChecked) {
        // Agrego la vacuna si no estaba
        return prev.includes(vacuna) ? prev : [...prev, vacuna];
      } else {
        // Quito la vacuna si estaba
        return prev.filter((v) => v !== vacuna);
      }
    });
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const original = new FormData(e.target as HTMLFormElement);
    const formDataCleaned = new FormData();

    // Copiamos sólo los campos no vacíos
    for (const [key, value] of original) {
      const stringVacio = typeof value === "string" && value.trim() === "";
      const fileVacio = value instanceof File && value.size === 0;
      if (!stringVacio && !fileVacio) {
        formDataCleaned.append(key, value);
      }
    }

    // Además, añadimos las vacunas actuales al FormData:
    // (porque los inputs type="checkbox" usan name="vaccines[]" y React no los incluye automáticamente
    //  si hemos hecho controlled components. Por eso si queremos mandarlo al servidor,
    //  hay que construirlo “a mano”).
    selectedVaccines.forEach((v) => {
      formDataCleaned.append("vaccines[]", v);
    });

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
            {/* Rabia */}
            <label className="inline-flex items-center">
              <input
                type="checkbox"
                name="vaccines[]"
                value="rabia"
                className="form-checkbox h-5 w-5 text-pink-600"
                checked={selectedVaccines.includes("rabia")}
                onChange={(e) =>
                  handleCheckboxChange("rabia", e.target.checked)
                }
              />
              <span className="ml-2">Rabia</span>
            </label>

            {/* Parvovirus */}
            <label className="inline-flex items-center">
              <input
                type="checkbox"
                name="vaccines[]"
                value="parvovirus"
                className="form-checkbox h-5 w-5 text-pink-600"
                checked={selectedVaccines.includes("parvovirus")}
                onChange={(e) =>
                  handleCheckboxChange("parvovirus", e.target.checked)
                }
              />
              <span className="ml-2">Parvovirus</span>
            </label>

            {/* Moquillo */}
            <label className="inline-flex items-center">
              <input
                type="checkbox"
                name="vaccines[]"
                value="moquillo"
                className="form-checkbox h-5 w-5 text-pink-600"
                checked={selectedVaccines.includes("moquillo")}
                onChange={(e) =>
                  handleCheckboxChange("moquillo", e.target.checked)
                }
              />
              <span className="ml-2">Moquillo</span>
            </label>

            {/* Leucemia */}
            <label className="inline-flex items-center">
              <input
                type="checkbox"
                name="vaccines[]"
                value="leucemia"
                className="form-checkbox h-5 w-5 text-pink-600"
                checked={selectedVaccines.includes("leucemia")}
                onChange={(e) =>
                  handleCheckboxChange("leucemia", e.target.checked)
                }
              />
              <span className="ml-2">Leucemia</span>
            </label>

            {/* Parainfluenza */}
            <label className="inline-flex items-center">
              <input
                type="checkbox"
                name="vaccines[]"
                value="parainfluen"
                className="form-checkbox h-5 w-5 text-pink-600"
                checked={selectedVaccines.includes("parainfluen")}
                onChange={(e) =>
                  handleCheckboxChange("parainfluen", e.target.checked)
                }
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
