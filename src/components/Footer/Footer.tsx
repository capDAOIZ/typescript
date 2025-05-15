import FooterContacto from "./FooterContacto";
import FooterInformacion from "./FooterInformacion";
import FooterRedesSociales from "./FooterRedesSociales";

export default function Footer() {
  return (
    <footer className="bg-pink-50 text-gray-800 pt-10 pb-6 border-t border-pink-100">
      <div className="w-full max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 text-center ">
          <FooterContacto />
          <FooterRedesSociales />
          <FooterInformacion />
        </div>
        <div className="text-center text-sm text-gray-500 mt-8">
          © 2025 Animal Rescue. Todos los derechos reservados.
        </div>
      </div>
    </footer>
  );
}
