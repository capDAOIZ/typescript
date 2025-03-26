export default function FooterContacto() {
  return (
    <div className="w-full sm:w-full md:w-1/3">
      <h1 className="text-2xl font-bold text-black text-center">Contacto</h1>
      <p className="mt-4">
        ¿Tienes preguntas o quieres saber más sobre el proceso de adopción?
        ¡Contáctanos!
      </p>
      <ul className="mt-4 text-center">
        <li>
          <strong>Telefono: </strong>{" "}
          <span className="text-black font-semibold">+34 674214567</span>
        </li>
        <li>
          <strong>Correo electronico: </strong>
          <span className="text-black font-semibold">
            contacto@animalrescue.com
          </span>
        </li>
        <li>
          <strong>Direccion: </strong>
          <span className="text-black font-semibold">
            Calle 123, Ciudad Madrid
          </span>
        </li>
      </ul>
    </div>
  );
}
