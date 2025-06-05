export default function ProcesoAdopcion() {
  return (
    <section className="bg-gray-100 py-16 my-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Título de la sección */}
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
          ¿Cómo funciona el proceso de adopción?
        </h2>

        {/* Contenedor de pasos */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Paso 1 */}
          <div className="bg-white rounded-xl shadow-lg p-6 flex flex-col items-center text-center">
            <div className="h-16 w-16 bg-pink-200 rounded-full flex items-center justify-center mb-4">
              <span className="text-2xl font-black text-pink-600">1</span>
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              Elige tu Compañero
            </h3>
            <p className="text-gray-600">
              Navega por las mascotas disponibles en nuestro catálogo. Hay
              perros y gatos de todas las edades y tamaños, ¡seguro encontrarás
              uno que te robe el corazón!
            </p>
          </div>

          {/* Paso 2 */}
          <div className="bg-white rounded-xl shadow-lg p-6 flex flex-col items-center text-center">
            <div className="h-16 w-16 bg-pink-200 rounded-full flex items-center justify-center mb-4">
              <span className="text-2xl font-black text-pink-600">2</span>
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              Conoce al Animal
            </h3>
            <p className="text-gray-600">
              Coordina una visita o videollamada para conocer a tu futuro
              compañero. Conversa con nuestro equipo para resolver todas tus
              dudas y ver si la química es mutua.
            </p>
          </div>

          {/* Paso 3 */}
          <div className="bg-white rounded-xl shadow-lg p-6 flex flex-col items-center text-center">
            <div className="h-16 w-16 bg-pink-200 rounded-full flex items-center justify-center mb-4">
              <span className="text-2xl font-black text-pink-600">3</span>
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              Firma tu Solicitud
            </h3>
            <p className="text-gray-600">
              Completa nuestro formulario de adopción y firma el contrato. Te
              guiaremos en cada paso para asegurarnos de que el animal llegue a
              un hogar amoroso.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
