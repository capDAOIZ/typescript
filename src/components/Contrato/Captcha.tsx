import { useState } from "react";

interface Props {
  trueValido: () => void;
}
export default function Captcha({ trueValido }: Props) {
  const [captcha, setCaptcha] = useState(generarCaptcha());
  const [input, setInput] = useState("");
  const [validado, setValidado] = useState(false);

  function generarCaptcha() {
    return Math.floor(1000 + Math.random() * 9000).toString(); // 4 dígitos aleatorios
  }
  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (input === captcha) {
      setValidado(true);
      trueValido();
    } else {
      alert("Captcha incorrecto");
      setCaptcha(generarCaptcha()); // Genera uno nuevo
      setInput(""); // Limpia input
    }
  }
  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-64">
      <label className="text-lg font-bold">
        Introduce el siguiente número para poder firmar el contrato:
      </label>
      <div className="bg-gray-200 text-xl font-mono p-2 text-center rounded-md tracking-widest">
        {captcha}
      </div>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        className="border p-2 rounded"
        placeholder="Escribe el número"
      />
      <button
        type="submit"
        className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-800"
      >
        Verificar
      </button>

      {validado && (
        <p className="text-green-600 font-bold">✅ Captcha válido</p>
      )}
    </form>
  );
}
