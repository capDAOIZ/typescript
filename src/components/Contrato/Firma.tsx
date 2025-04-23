import SignatureCanvas from "react-signature-canvas";
import { useRef } from "react";

interface Props {
  handleFirma: (dataUrl: string) => void;
}
export default function Firma({ handleFirma }: Props) {
  const firmaRef = useRef<SignatureCanvas>(null);

  const limpiarFirma = () => firmaRef.current?.clear();
  const obtenerImagen = () => {
    if (firmaRef.current?.isEmpty()) {
      alert("Por favor, firma antes de continuar.");
      return;
    }
    const dataUrl = firmaRef.current?.getCanvas().toDataURL("image/png");
    if (dataUrl) {
      handleFirma(dataUrl);
    }
  };

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold">Firma aquí:</h2>
      <div className="border border-black rounded w-[400px] h-[200px]">
        <SignatureCanvas
          ref={firmaRef}
          penColor="black"
          canvasProps={{ width: 400, height: 200, className: "bg-white" }}
        />
      </div>
      <div className="flex gap-4">
        <button
          onClick={limpiarFirma}
          className="bg-red-500 text-white px-4 py-2 rounded"
        >
          Borrar
        </button>
        <button
          onClick={obtenerImagen}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Guardar Firma
        </button>
      </div>
    </div>
  );
}
