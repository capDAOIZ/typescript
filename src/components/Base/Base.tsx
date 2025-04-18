import UltimosPots from "./UltimosPots";
import FotoPrincipal from "./FotoPrincipal";
export default function Home() {
  return (
    <div className="w-full  min-h-screen">
      <FotoPrincipal />
      <UltimosPots />
      <section className="w-full h-full">
        <h2>Nuestros Colaboradores</h2>
      </section>
    </div>
  );
}
