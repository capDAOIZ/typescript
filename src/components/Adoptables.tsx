function Adoptables() {
    return (
      <section className="w-full min-h-screen py-12 bg-gray-100 text-center px-12">
        <h2 className="text-3xl font-bold text-gray-800">Mascotas en Adopción</h2>
        <p className="text-gray-600 mt-2">Aquí tienes algunas de las últimas mascotas en adopción.</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6 max-w-7xl mx-auto">
          <div className="bg-white p-4 shadow-lg rounded-lg">
            <img src="https://source.unsplash.com/400x300/?dog" alt="Perro" className="w-full rounded-lg" />
            <h3 className="text-xl font-semibold mt-4">Firulais</h3>
            <p className="text-gray-600">Juguetón y cariñoso.</p>
          </div>
          <div className="bg-white p-4 shadow-lg rounded-lg">
            <img src="https://source.unsplash.com/400x300/?cat" alt="Gato" className="w-full rounded-lg" />
            <h3 className="text-xl font-semibold mt-4">Mishi</h3>
            <p className="text-gray-600">Tranquilo y amoroso.</p>
          </div>
          <div className="bg-white p-4 shadow-lg rounded-lg">
            <img src="https://source.unsplash.com/400x300/?rabbit" alt="Conejo" className="w-full rounded-lg" />
            <h3 className="text-xl font-semibold mt-4">Bunny</h3>
            <p className="text-gray-600">Pequeño y esponjoso.</p>
          </div>
        </div>
      </section>
    );
  }

  export default Adoptables;