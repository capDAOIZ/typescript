export default function FooterRedesSociales() {
  return (
    <div className="flex flex-col items-center">
      <h3 className="text-lg text-pink-600 mb-4">Redes sociales</h3>
      <div className="flex gap-6 text-2xl justify-center">
        <a
          href="https://youtube.com"
          target="_blank"
          rel="noopener noreferrer"
          className="text-red-500 hover:text-red-700 transition-transform transform hover:scale-110"
        >
          <i className="fab fa-youtube"></i>
        </a>
        <a
          href="https://instagram.com"
          target="_blank"
          rel="noopener noreferrer"
          className="text-pink-500 hover:text-pink-700 transition-transform transform hover:scale-110"
        >
          <i className="fab fa-instagram"></i>
        </a>
        <a
          href="https://facebook.com"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 hover:text-blue-800 transition-transform transform hover:scale-110"
        >
          <i className="fab fa-facebook"></i>
        </a>
      </div>
    </div>
  );
}
