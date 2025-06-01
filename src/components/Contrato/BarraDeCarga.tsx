interface Props {
  faseIntermedia: boolean;
  faseFinal: boolean;
}
export default function BarraDeCarga({ faseIntermedia, faseFinal }: Props) {
  return (
    <section className="flex items-center gap-2 justify-center w-full  px-10">
      <div className="bg-blue-400 w-10 h-10 rounded-full border-2 border-pink-600"></div>
      <div className="w-1/3 h-1 bg-pink-600"></div>
      <div
        className={`w-10 h-10 rounded-full border-2 border-pink-600 ${
          faseIntermedia ? "bg-blue-400" : ""
        }`}
      ></div>
      <div className="w-1/3 h-1 bg-pink-600"></div>
      <div
        className={`w-10 h-10 rounded-full border-2 border-pink-600 ${
          faseFinal ? "bg-blue-400" : ""
        }`}
      ></div>
    </section>
  );
}
