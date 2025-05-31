import useCreatePost from "../../Hooks/useCreatePost";
import useImagenPreview from "../../Hooks/useImagenPreview";
import { BotonCargando } from "../modals/Cargando";
import { useRef } from "react";
export default function CrearPost() {
  const { error, cargando, mensaje, fecthCreatePost } = useCreatePost();
  const { handleImageChange, imagePreview, setImagePreview } =
    useImagenPreview();
  const formRef = useRef<HTMLFormElement>(null);
  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    await fecthCreatePost(formData);
    formRef.current?.reset();
    setImagePreview(null);
  }

  return (
    <div className="w-full min-h-screen py-10 bg-gradient-to-b from-gray-100 to-gray-200 px-4 lg:px-10 text-center">
      <h1 className="text-4xl font-extrabold text-pink-600 mb-2">
        ¿Quieres dar en adopción a un animal? 🐶🐱
      </h1>
      <p className="font-medium text-gray-700 text-lg mb-10">
        Añade sus datos y empieza el proceso de adopción 🐾
      </p>

      <form
        className="max-w-2xl mx-auto bg-white shadow-xl border border-pink-300 rounded-xl px-6 py-10 flex flex-col gap-6"
        onSubmit={handleSubmit}
        encType="multipart/form-data"
        method="POST"
        ref={formRef}
      >
        {/* NOMBRE */}
        <div className="text-left">
          <label
            htmlFor="nameAnimal"
            className="block text-sm font-semibold text-pink-700 mb-1"
          >
            Nombre 🐕
          </label>
          <input
            className="w-full px-4 py-2 border border-pink-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
            type="text"
            id="nameAnimal"
            name="nameAnimal"
            placeholder="Nombre del animal"
            minLength={3}
            maxLength={50}
            required
          />
        </div>
        {/* DESCRIPCION */}
        <div className="text-left">
          <label
            htmlFor="description"
            className="block text-sm font-semibold text-pink-700 mb-1"
          >
            Descripción 📝
          </label>
          <textarea
            className="w-full px-4 py-2 border border-pink-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
            id="description"
            name="description"
            placeholder="Descríbenos al animal"
            minLength={10}
            maxLength={200}
            rows={5}
            required
          />
        </div>
        {/* TIPO DE ANIMAL */}
        <div className="text-left">
          <label
            htmlFor="typeAnimal"
            className="block text-sm font-semibold text-pink-700 mb-1"
          >
            Tipo de Animal 🐾
          </label>
          <select
            name="typeAnimal"
            id="typeAnimal"
            className="w-full px-4 py-2 border border-pink-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
            required
          >
            <option value="">Selecciona una opción</option>
            <option value="perro">Perro 🐶</option>
            <option value="gato">Gato 🐱</option>
          </select>
        </div>
        {/* IMAGEN DEL ANIMAL */}
        <div className="text-left">
          <label
            htmlFor="image"
            className="block text-sm font-semibold text-pink-700 mb-1"
          >
            Imagen del animal 📷
          </label>
          <input
            className="w-full file:py-2 file:px-4 file:border-0 file:rounded-lg file:bg-pink-500 file:text-white file:font-semibold hover:file:bg-pink-600"
            type="file"
            name="image"
            id="image"
            onChange={handleImageChange}
            required
          />
          {imagePreview && (
            <img
              src={imagePreview}
              alt="Preview"
              className="mt-4 w-full h-64 object-cover rounded-lg border-2 border-pink-300 shadow"
            />
          )}
        </div>

        {cargando ? (
          <BotonCargando></BotonCargando>
        ) : (
          <button
            type="submit"
            className="bg-pink-600 hover:bg-pink-700 text-white font-bold py-3 px-6 rounded-full shadow-md transition duration-300 ease-in-out w-full"
          >
            Publicar
          </button>
        )}
        {error ? (
          <pre className="text-red-600 font-semibold text-md whitespace-pre-wrap break-words">
            {error}
          </pre>
        ) : mensaje ? (
          <div className="text-green-600 font-semibold text-lg">{mensaje}</div>
        ) : null}
      </form>
    </div>
  );
}
