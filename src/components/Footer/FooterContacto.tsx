export default function FooterContacto() {
  return (
    <div>
      <h3 className="text-lg text-pink-600 mb-4">Contacto</h3>
      <ul className="text-sm space-y-2">
        <li>
          <span className="text-gray-600">Teléfono:</span> +34 674 214 567
        </li>
        <li>
          <span className="text-gray-600">Correo:</span>{" "}
          contacto@animalrescue.com
        </li>
        <li>
          <span className="text-gray-600">Dirección:</span> Calle 123, Madrid
        </li>
      </ul>
    </div>
  );
}
