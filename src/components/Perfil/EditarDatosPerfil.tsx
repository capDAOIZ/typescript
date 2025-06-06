import { useState, useId } from "react";
import { BotonCargando } from "../modals/Cargando";
import useImagenPreview from "../../Hooks/useImagenPreview";
interface Props {
  user: any;
  error: string;
  loading: boolean;
  setEditando: (value: boolean) => void;
  handleSubmit: (e: React.FormEvent) => void;
  mensaje: string;
}
export default function EditarDatosPerfil({
  user,
  setEditando,
  error,
  loading,
  handleSubmit,
  mensaje,
}: Props) {
  const [mostrarContraseña, setMostrarContraseña] = useState(false);
  const [password, setPassword] = useState("");
  const { imagePreview, setImagePreview, handleImageChange } =
    useImagenPreview();
  function handleClick(e: React.FormEvent) {
    e.preventDefault();
    setMostrarContraseña(!mostrarContraseña);
  }
  return (
    <form encType="multipart/form-data" onSubmit={handleSubmit}>
      {/*Foto */}
      <div className="flex flex-col w-full">
        <img
          className="rounded-full object-cover  w-72 h-72 border-4 border-black self-center"
          src={
            user.image
              ? `data:image/jpeg;base64,${user.image}`
              : "/imagenes/fotoPredeterminada.jpg"
          }
          alt={user.name}
        />
        {/*Nombre , email, contraseña*/}
        <div className="p-5 space-y-4">
          {/* Nombre*/}
          <div className="flex flex-col gap-y-2">
            <label htmlFor="name" className="text-xl font-semibold ">
              Nombre:
            </label>
            <input
              type="text"
              name="name"
              placeholder="Escribe tu nombre..."
              defaultValue={user.name}
              className="border-2 w-full border-black rounded-lg p-2 focus:outline-none focus:border-pink-600"
            ></input>
          </div>
          {/* Email */}
          <div className="flex flex-col gap-y-2">
            <label htmlFor="email" className="text-xl font-semibold ">
              Email:
            </label>
            <input
              type="email"
              name="email"
              placeholder="Escribe tu nuevo email..."
              defaultValue={user.email}
              className="border-2 w-full border-black rounded-lg p-2 focus:outline-none focus:border-pink-600"
            ></input>
          </div>
          {/* Contraseña */}
          <div className="flex flex-col gap-y-2 ">
            <label htmlFor="password" className="text-xl font-semibold ">
              Contraseña :
            </label>
            <div className="flex items-center gap-x-2">
              <input
                type={mostrarContraseña ? "text" : "password"}
                placeholder="Recuerda!!! Contraseña segura"
                className="border-2 w-full border-black rounded-lg p-2 focus:outline-none focus:border-pink-600"
                id="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              ></input>
              <button
                onClick={handleClick}
                className="border-2 border-black rounded-lg p-2"
              >
                {mostrarContraseña ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-gray-700"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3 3l18 18"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M13.875 18.825A10.05 10.05 0 0112 19c-4.968 0-9.1-3.21-10.94-7.5a10.056 
                    10.056 0 012.573-3.522M6.159 6.159A10.056 10.056 0 0112 5c4.968 
                    0 9.1 3.21 10.94 7.5a10.056 10.056 0 01-1.05 1.993M15 
                    12a3 3 0 11-6 0 3 3 0 016 0"
                    />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-gray-700"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 
                    0 8.268 2.943 9.542 7-1.274 4.057-5.064 
                    7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                    />
                  </svg>
                )}
              </button>
            </div>
          </div>
          {/* Foto */}
          <div className="flex flex-col">
            <label
              htmlFor="image"
              className="bg-pink-500 text-white px-4 py-2 rounded-full cursor-pointer hover:bg-pink-600 text-center mt-3"
            >
              Cambiar foto 📷
            </label>
            <input
              type="file"
              name="image"
              id="image"
              className="hidden"
              onChange={handleImageChange}
            ></input>
            {imagePreview && (
              <img
                src={imagePreview}
                alt="Preview"
                className="mt-4 w-full h-64 object-contain rounded-lg border-2 border-pink-300 shadow"
              />
            )}
          </div>
          {/* Biografía */}
          <section className="flex flex-col gap-y-2 pb-4">
            <label htmlFor="biografia">
              <h1 className="text-xl font-semibold">Sobre mi</h1>
            </label>
            <textarea
              id="biografia"
              className="border-2 w-full border-black rounded-lg p-2 focus:outline-none focus:border-pink-600"
              name="biografia"
              placeholder="Escribe algo sobre ti..."
              defaultValue={user.biografia ? user.biografia : ""}
            ></textarea>
          </section>
          {error ? (
            <p className="text-red-600 text-sm pb-4 text-center">{error}</p>
          ) : mensaje ? (
            <p className="text-green-600 text-sm my-4 text-center">{mensaje}</p>
          ) : null}
          {!loading ? (
            <div className="flex gap-x-4">
              <button
                className="bg-green-600 text-black relative  px-10 py-2  rounded-full w-1/2"
                type="submit"
              >
                Guardar
              </button>

              <button
                className="bg-red-600 text-black px-10 py-2  rounded-full w-1/2"
                onClick={() => {
                  setEditando(false);
                }}
              >
                Cancelar
              </button>
            </div>
          ) : (
            <BotonCargando></BotonCargando>
          )}
        </div>
      </div>
    </form>
  );
}
