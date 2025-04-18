export default function Nosotros() {
  return (
    <div className="w-full min-h-screen">
      <section className=" py-12  text-center px-12">
        <h1 className="text-3xl font-bold text-gray-800">Sobre Nosotros</h1>
        <p className="text-gray-600 mt-2">
          Somos un grupo de voluntarios dedicados a rescatar y cuidar animales
          abandonados, brindándoles un hogar lleno de amor y atención.
        </p>
        <p className="text-gray-600 mt-4">
          Nuestra misión es encontrar familias que les den una segunda
          oportunidad a estos animales, ayudándolos a recuperar la confianza y
          felicidad.
        </p>
        <p className="text-gray-600 mt-4">
          Grupo liderado por <strong>Mario Garrido</strong> y {""}
          <strong>Jorge Zavaleta</strong>.
        </p>
      </section>
      <article className="flex flex-row lg:justify-center gap-6 py-12 px-12">
        <picture className="w-1/2 lg:w-2/6 bg-pink-200 flex flex-col items-center gap-4 p-4 rounded-3xl">
          <img
            src="../images/JorgeZavaleta.jpg"
            className="w-1/2 rounded-xl"
          ></img>
          <section>
            <h2 className="text-center text-lg font-semibold">
              Jorge Zavaleta
            </h2>
            <p className="pt-7">
              <strong>Profesión:</strong> Desarrollador web
            </p>
            <hr className="border-black my-3"></hr>
            <p>
              Profesional programador con años de experiencia, encargado de
              administrar la pagina web.
            </p>
            <p>
              <strong>Co-lider</strong> de la comunidad de rescate animal
            </p>
          </section>
        </picture>
        <picture className="w-1/2 lg:w-2/6 bg-pink-200 flex flex-col items-center gap-4 p-4 rounded-3xl">
          <img
            src="../images/JorgeZavaleta.jpg"
            className="w-1/2 rounded-xl"
          ></img>
          <section>
            <h2 className="text-center text-lg font-semibold">Mario Garrido</h2>
            <p className="pt-7">
              <strong>Profesión:</strong> Desarrollador web y administrador
            </p>
            <hr className="border-black my-3"></hr>
            <p>
              Programador con años de experiencia, encargado de administrar la
              gestion de datos y nuestra comunidad.
            </p>
            <p>
              <strong>Lider</strong> de la comunidad de rescate animal
            </p>
          </section>
        </picture>
      </article>
      <section className="flex flex-col items-center py-12 px-12">
        <h3 className="font-bold text-xl sm:text-2xl pb-7 text-gray-700">
          Nuestros primeros amigos salvados
        </h3>
        <img src="../images/AnimalesGrupo.jpg"></img>
      </section>
    </div>
  );
}
