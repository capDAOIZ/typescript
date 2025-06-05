import UltimosPots from "./UltimosPots";
import FotoPrincipal from "./FotoPrincipal";
import ImageCarousel from "./ImageCarousel";
import ProcesoAdopcion from "./ProcesoAdopcion";
export default function Base() {
  const imagenes = [
    "/imagenes/Nike.png",
    "/imagenes/MarcaPerro.png",
    "/imagenes/ONG.webp",
    "/imagenes/RealMadrid.png",
    "/imagenes/ComunidadMadrid.png",
  ];
  return (
    <div className="w-full min-h-screen">
      <FotoPrincipal />
      <h2 className="text-2xl font-semibold my-10 text-center">
        Nuestras ultimas mascotas en adopcion 😊
      </h2>
      <UltimosPots />

      <ProcesoAdopcion></ProcesoAdopcion>
      <h2 className="text-2xl font-semibold my-10 text-center ">
        Nuestros Colaboradores 🤝
      </h2>
      <ImageCarousel imagenes={imagenes}></ImageCarousel>
    </div>
  );
}
