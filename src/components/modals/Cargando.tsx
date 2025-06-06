export function BotonCargando() {
  return (
    <div className="bg-gray-500 text-white px-10 py-2  rounded-full w-full flex justify-center items-center gap-x-2">
      <div className=" w-6 h-6 border-4 border-pink-400 border-t-transparent rounded-full animate-spin"></div>
      Cargando...
    </div>
  );
}

export function Cargando() {
  return (
    <div className=" flex justify-center items-center gap-x-2">
      <div className=" w-6 h-6 border-4 border-pink-400 border-t-transparent rounded-full animate-spin"></div>
      Cargando...
    </div>
  );
}
interface CargandoConMensajeProps {
  children: React.ReactNode;
}

export function CargandoConMensaje({ children }: CargandoConMensajeProps) {
  return (
    <div className=" flex justify-center items-center gap-x-2">
      <div className=" w-6 h-6 border-4 border-pink-400 border-t-transparent rounded-full animate-spin"></div>
      {children}
    </div>
  );
}
