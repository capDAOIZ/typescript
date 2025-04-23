export default function InformacioCondiciones() {
  return (
    <>
      <p className="text-lg font-semibold">
        📄 Condiciones Generales de Adopción
      </p>

      <details>
        <summary className="mb-3 cursor-pointer">
          Mediante la firma de estas condiciones, el adoptante declara haberlas
          leído, comprendido y aceptado en su totalidad.
        </summary>
        <ol className="list-decimal mx-10">
          <li>
            <strong>Objeto del presente acuerdo</strong>
            <p className="p-2">
              La adopción tiene como finalidad proporcionar al animal un hogar
              definitivo, seguro y en condiciones adecuadas para su bienestar.
            </p>
          </li>
          <li>
            <strong>Identificación del animal</strong>
            <p className="p-2">
              El animal adoptado será identificado, en su caso, mediante
              microchip, y sus datos serán registrados a nombre del adoptante,
              quien se hará responsable legal del mismo.
            </p>
          </li>
          <li>
            <strong>Cuidados básicos y atención veterinaria</strong>
            <p className="p-2">
              El adoptante se compromete a velar por la salud del animal,
              proporcionándole atención veterinaria cuando sea necesario,
              incluyendo vacunas, desparasitaciones y demás cuidados sanitarios.
            </p>
          </li>
          <li>
            <strong>Esterilización obligatoria</strong>
            <p className="p-2">
              En caso de no estar esterilizado, el adoptante deberá realizar el
              procedimiento en un plazo máximo de 3 meses desde la adopción,
              salvo contraindicación veterinaria.
            </p>
          </li>
          <li>
            <strong>Prohibición de cesión o abandono</strong>
            <p className="p-2">
              El adoptante no podrá vender, ceder, regalar ni abandonar al
              animal bajo ningún concepto. En caso de imposibilidad justificada
              para continuar con la tenencia, se compromete a contactar con la
              entidad de adopción.
            </p>
          </li>
          <li>
            <strong>Condiciones de vida adecuadas</strong>
            <p className="p-2">
              El animal vivirá en un entorno seguro, limpio, con acceso a
              alimento, agua, cobijo y compañía. Queda prohibida su permanencia
              en terrazas, azoteas, patios sin resguardo o en condiciones que
              comprometan su bienestar.
            </p>
          </li>
          <li>
            <strong>Supervisión y seguimiento</strong>
            <p className="p-2">
              La entidad de adopción se reserva el derecho de realizar
              seguimientos periódicos, presenciales o no, para verificar las
              condiciones en las que vive el animal.
            </p>
          </li>
          <li>
            <strong>Aceptación de responsabilidad</strong>
            <p className="p-2">
              El adoptante asume plena responsabilidad legal, ética y económica
              sobre el animal desde el momento de la adopción.
            </p>
          </li>
        </ol>
      </details>
    </>
  );
}
