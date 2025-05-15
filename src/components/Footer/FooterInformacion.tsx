export default function FooterInformacion() {
  return (
    <div>
      <h3 className="text-lg text-pink-600 mb-4">Información útil</h3>
      <ul className="text-sm space-y-2">
        <li>
          <a href="#" className="hover:underline text-gray-700">
            Términos y condiciones
          </a>
        </li>
        <li>
          <a href="#" className="hover:underline text-gray-700">
            Política de privacidad
          </a>
        </li>
        <li>
          <a href="#" className="hover:underline text-gray-700">
            Protección de datos
          </a>
        </li>
      </ul>
    </div>
  );
}
