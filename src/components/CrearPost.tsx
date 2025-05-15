import React, { useState } from "react";
import { createPost } from "../services/ApiPost";

export default function CrearPost() {
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    try {
      const response = await createPost(formData);
      alert("Post creado con éxito");
    } catch (error) {
      console.log(error);
      alert("Error al crear el post");
    }
  }

  function handleImageChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setImagePreview(null);
    }
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
        method="POST"
        className="max-w-2xl mx-auto bg-white shadow-xl border border-pink-300 rounded-xl px-6 py-10 flex flex-col gap-6"
        encType="multipart/form-data"
        onSubmit={handleSubmit}
      >
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
            minLength={2}
            maxLength={50}
            required
          />
        </div>

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
            maxLength={100}
            rows={5}
            required
          />
        </div>

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
            accept="image/*"
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

        <button
          type="submit"
          className="bg-pink-600 hover:bg-pink-700 text-white font-bold py-3 px-6 rounded-full shadow-md transition duration-300 ease-in-out w-full"
        >
          Publicar
        </button>
      </form>
    </div>
  );
}
