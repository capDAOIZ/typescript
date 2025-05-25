interface Props {
  setTerms: (terms: boolean) => void;
}
export default function TerminosYMas({ setTerms }: Props) {
  return (
    <div>
      <h2 className="text-2xl font-semibold">Terminos y condiciones</h2>
      <p className="mb-5">
        Para continuar, revisa y acepta los términos y condiciones y política de
        protección de datos
      </p>

      <p>
        <input
          type="checkbox"
          name="terminos"
          onChange={(e) => setTerms(e.target.checked)}
        ></input>{" "}
        Acepta nuestros{" "}
        <a
          href="https://www.youtube.com/watch?v=ZHgyQGoeaB0"
          className="underline text-blue-600 font-semibold "
        >
          TERMINOS
        </a>{" "}
        y{" "}
        <a
          href="https://www.youtube.com/watch?v=FoZdT_fAXew"
          className="underline text-blue-600 font-semibold "
        >
          CONDICIONES
        </a>
      </p>
    </div>
  );
}
