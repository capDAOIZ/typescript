export default function FooterRedesSociales() {
  return (
    <div className="w-full sm:w-full md:w-1/3">
      <h1 className="text-2xl font-bold text-black text-center">
        Redes sociales
      </h1>
      <div className="justify-around flex mt-4">
        <a href="https://youtube.com" target="_blank">
          <i className="fab fa-youtube text-4xl  text-red-600 hover:text-6xl"></i>
        </a>

        <a href="https://instagram.com" target="_blank">
          <i className="fab fa-instagram text-4xl  text-purple-900 hover:text-6xl"></i>
        </a>

        <a href="https://facebook.com" target="_blank">
          <i className="fab fa-facebook text-4xl  text-blue-600 hover:text-6xl"></i>
        </a>
      </div>
    </div>
  );
}
