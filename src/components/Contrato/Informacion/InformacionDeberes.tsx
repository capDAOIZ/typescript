export default function InformacionDeberes() {
  return (
    <>
      <p className="text-lg font-semibold">
        🐾 Deberes de una persona al adoptar un gato o un perro
      </p>

      <details>
        <summary className="mb-3 cursor-pointer">
          Adoptar un animal es un acto de amor y responsabilidad. A partir del
          momento en que decides llevar a un gato o a un perro a tu hogar,
          adquieres una serie de compromisos esenciales para garantizar su
          bienestar y una convivencia armoniosa. Estos son los deberes
          fundamentales que debes cumplir:
        </summary>
        <ol className="list-decimal mx-10">
          <li>
            <strong>Proporcionar una alimentación adecuada</strong>
            <p className="p-2">
              Debes ofrecerle una dieta equilibrada y adaptada a su especie,
              edad y estado de salud. Asegúrate de que siempre tenga acceso a
              agua fresca y limpia.
            </p>
          </li>
          <li>
            <strong>Brindar atención veterinaria</strong>
            <p className="p-2">
              Es tu responsabilidad llevarlo a revisiones periódicas, vacunarlo,
              desparasitarlo y, en caso necesario, proporcionarle tratamiento
              médico. La esterilización también es una medida recomendada para
              su salud y para evitar camadas no deseadas.
            </p>
          </li>
          <li>
            <strong>Garantizar ejercicio y estimulación mental</strong>
            <p className="p-2">
              Los perros necesitan paseos diarios y juegos. Los gatos, aunque
              más independientes, requieren juguetes, rascadores y zonas donde
              explorar y trepar. El juego refuerza el vínculo y previene el
              aburrimiento.
            </p>
          </li>
          <li>
            <strong>Educar con respeto y paciencia</strong>
            <p className="p-2">
              La educación y la adaptación a nuevas rutinas requieren tiempo.
              Nunca utilices el castigo físico ni métodos agresivos. La
              paciencia y el refuerzo positivo son clave.
            </p>
          </li>
          <li>
            <strong>Ofrecer amor, compañía y tiempo</strong>
            <p className="p-2">
              Los animales no son objetos decorativos. Necesitan tu atención,
              cariño y compañía. No deben estar aislados ni pasar largas horas
              solos cada día.
            </p>
          </li>
          <li>
            <strong>Asumir la responsabilidad a largo plazo</strong>
            <p className="p-2">
              Un perro o un gato puede vivir más de 10 o 15 años. Adoptar es un
              compromiso de por vida. No es aceptable abandonarlo si cambian tus
              circunstancias personales.
            </p>
          </li>
        </ol>
      </details>
    </>
  );
}
