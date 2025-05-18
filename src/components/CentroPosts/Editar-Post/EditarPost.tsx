import { useParams } from "react-router-dom";
import DatosPost from "./DatosPost";
import ActualizarPost from "./ActualizarPost";
export default function EditarPost() {
  // Obtenemos la id del post de la url
  const { id } = useParams();

  const tamañoArticle = "min-w-screen min-h-screen p-10";
  const flexArticle = "flex flex-col gap-y-4 items-center";

  return (
    <article className={`${flexArticle} ${tamañoArticle}`}>
      <h1 className="text-3xl font-bold ">EDITAR POST</h1>
      <div className="lg:flex lg:flex-row gap-x-4 w-full min-h-screen flex-col">
        <section className=" lg:w-1/2 p-10 w-full">
          <DatosPost id={Number(id)}></DatosPost>
        </section>
        <section className=" lg:w-1/2 p-10 w-full">
          <ActualizarPost id={Number(id)}></ActualizarPost>
        </section>
      </div>
    </article>
  );
}
