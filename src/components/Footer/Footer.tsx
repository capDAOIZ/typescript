import FooterContacto from "./FooterContacto";
import FooterInformacion from "./FooterInformacion";
import FooterRedesSociales from "./FooterRedesSociales";
export default function Footer() {
  return (
    <footer className="bg-pink-500  text-white p-4 w-full">
      <div className="container mx-auto flex flex-wrap justify-between text-center">
        <FooterContacto />
        <FooterRedesSociales />
        <FooterInformacion />
      </div>
      <div className="w-full text-center mt-4">
        <p className="text-black font-black">ANIMAL RESCUE © 2025</p>
      </div>
    </footer>
  );
}
