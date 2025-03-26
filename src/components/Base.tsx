import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div
      className="w-full  min-h-screen bg-cover bg-center flex items-center justify-center relative"
      style={{
        backgroundImage: "url(/images/animales.jpg)",
        backgroundSize: "cover",
      }}
    >
      <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col items-center justify-center text-center p-4 w-full">
        <h1 className="text-white text-4xl md:text-6xl font-bold">
          RESCATAMOS Y CUIDAMOS ANIMALES ABANDONADOS
        </h1>
        <p className="text-white text-lg mt-4">
          Ayúdanos adoptando y dales una segunda oportunidad
        </p>
        <div className="mt-6 flex gap-4">
          <Link
            to="/adoptables"
            className="bg-pink-600 text-white px-6 py-3 rounded-full text-lg font-semibold"
          >
            ADOPTAR PERRO
          </Link>
          <Link
            to="/adoptables"
            className="bg-purple-600 text-white px-6 py-3 rounded-full text-lg font-semibold"
          >
            ADOPTAR GATO
          </Link>
        </div>
      </div>
    </div>
  );
}
