import { createPost } from "../services/ApiPost";

export default function CrearPost() {
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
  return (
    <div className="w-full min-h-screen py-10 bg-gray-100 px-10 text-center">
      <h1 className="text-3xl font-bold">
        ¿Quieres dar en adopcion a un animal?
      </h1>
      <p className="font-semibold text-lg">Añade sus datos y empieza</p>
      <form
        method="POST"
        className="my-10 py-7 border-4 w-full lg:w-1/2 border-pink-600 flex flex-col gap-4 mx-auto rounded-lg bg-white shadow-lg"
        action=""
        encType="multipart/form-data"
        onSubmit={handleSubmit}
      >
        <section>
          <label htmlFor="nameAnimal" className="font-semibold">
            Nombre :{" "}
          </label>
          <input
            className="p-1 border-2 border-pink-600 rounded-lg"
            type="text"
            id="nameAnimal"
            name="nameAnimal"
            placeholder="Indicanos el nombre del animal 🤔"
            minLength={2}
            maxLength={50}
            size={30}
            required
          ></input>
        </section>
        <section>
          <label htmlFor="description" className="font-semibold">
            Descripcion :{" "}
          </label>
          <br></br>
          <textarea
            className="p-1 border-2 border-pink-600 rounded-lg"
            id="description"
            name="description"
            placeholder="Describenos un poco el animal ✍️"
            minLength={10}
            maxLength={100}
            rows={5}
            cols={50}
            required
          ></textarea>
        </section>
        <section>
          <label htmlFor="typeAnimal" className="font-semibold">
            Descripcion del animal :{" "}
          </label>
          <select
            name="typeAnimal"
            id="typeAnimal"
            className="p-1 border-2 border-pink-600 rounded-lg"
            required
          >
            <option value="perro">Perro 🐶</option>
            <option value="gato">Gato 🐱</option>
          </select>
        </section>

        <section>
          <label htmlFor="image" className="font-semibold ">
            Imagen🐾 :{" "}
          </label>
          <input
            className="p-1 "
            type="file"
            name="image"
            id="image"
            required
          ></input>
        </section>
        <button
          type="submit"
          className="border-2 rounded-lg  border-pink-600 bg-pink-600 w-1/2 mx-auto text-white font-semibold p-2"
        >
          Publicar
        </button>
      </form>
    </div>
  );
}
