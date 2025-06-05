import { jsPDF } from "jspdf";
import { getContratoForPostID } from "../../services/ApiContrato";
import { useState, useEffect } from "react";
import useGetPost from "../../Hooks/useGetPost";

interface Props {
  PostId: number;
}

interface Adoptante {
  id: number;
  nombre: string;
  primerApellido: string;
  segundoApellido: string;
  email: string;
  telefono: string;
  fecha_nacimiento: string;
  firma: string; // Base64 puro, sin prefijo “data:image/...;base64,”
}

export default function BotonPDF({ PostId }: Props) {
  const [adoptante, setAdoptante] = useState<Adoptante | null>(null);
  const { post } = useGetPost({ id: PostId });

  useEffect(() => {
    async function fetchGetContratoForPostID() {
      try {
        const response = await getContratoForPostID(PostId);
        setAdoptante(response.contrato);
      } catch (error) {
        console.error("Error al obtener el contrato:", error);
      }
    }
    fetchGetContratoForPostID();
  }, [PostId]);

  // Función auxiliar para convertir una URL local (en /public) a Base64
  async function getBase64FromLocalUrl(url: string): Promise<string> {
    const response = await fetch(url);
    const blob = await response.blob();
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onerror = () => {
        reader.abort();
        reject(new Error("Error leyendo blob como Base64."));
      };
      reader.onload = () => {
        resolve(reader.result as string); // Esto es ya un DataURL completo
      };
      reader.readAsDataURL(blob);
    });
  }

  async function generatePDF() {
    const doc = new jsPDF({
      unit: "pt",
      format: "letter",
    });

    const leftMargin = 40;
    const rightMargin = 40;
    const pageWidth = doc.internal.pageSize.getWidth();
    const usableWidth = pageWidth - leftMargin - rightMargin;
    let cursorY = 60;
    const lineHeight = 18;

    // ————— 1) ENCABEZADO —————
    doc.setFont("helvetica", "bold");
    doc.setFontSize(18);
    doc.text("CONTRATO DE ADOPCIÓN DE ANIMAL", pageWidth / 2, cursorY, {
      align: "center",
    });
    cursorY += 35;

    // ————— 2) DATOS DEL ADOPTANTE —————
    doc.setFont("helvetica", "normal");
    doc.setFontSize(12);
    doc.text("El adoptante:", leftMargin, cursorY);
    cursorY += 22;

    doc.text(
      `Nombre: ${adoptante?.nombre || ""} ${adoptante?.primerApellido || ""} ${
        adoptante?.segundoApellido || ""
      }`,
      leftMargin + 15,
      cursorY
    );
    cursorY += lineHeight;

    doc.text(
      `Correo electrónico: ${adoptante?.email || ""}`,
      leftMargin + 15,
      cursorY
    );
    cursorY += lineHeight;

    doc.text(
      `Teléfono: ${adoptante?.telefono || ""}`,
      leftMargin + 15,
      cursorY
    );
    cursorY += lineHeight;

    doc.text(
      `Fecha de nacimiento: ${adoptante?.fecha_nacimiento || ""}`,
      leftMargin + 15,
      cursorY
    );
    cursorY += lineHeight + 15;

    // ————— 3) SEPARADOR —————
    doc.setLineWidth(0.5);
    doc.setDrawColor(200, 200, 200);
    doc.line(leftMargin, cursorY, pageWidth - rightMargin, cursorY);
    cursorY += 25;

    // ————— 4) DATOS DEL ANIMAL —————
    doc.setFontSize(12);
    doc.setFont("helvetica", "normal");
    doc.text("El animal adoptado:", leftMargin, cursorY);
    cursorY += 22;

    doc.text(`Nombre: ${post?.nameAnimal || ""}`, leftMargin + 15, cursorY);
    cursorY += lineHeight;

    doc.text(`Tipo: ${post?.typeAnimal || ""}`, leftMargin + 15, cursorY);
    cursorY += lineHeight;

    doc.text(`Raza: ${post?.race || ""}`, leftMargin + 15, cursorY);
    cursorY += lineHeight + 15;

    // === NUEVA FORMA DE IMPRIMIR “VACUNAS” ===
    // 1) Extraigo y capitalizo cada vacuna
    const vacunasArray = post?.vaccines || [];
    const vacunasCapitalizadas = vacunasArray.map(
      (key) => key.charAt(0).toUpperCase() + key.slice(1)
    );

    // 2) Convierto ese array en un string, separado por comas:
    const textoVacunas = vacunasCapitalizadas.join(", ");

    // 3) Si cabe en una sola línea, uso `doc.text`; si es muy largo, puedo partirlo en varias líneas:
    //    Por ejemplo, para que corte automáticamente:
    const lineasVacunas = doc.splitTextToSize(
      `Vacunas: ${textoVacunas}`,
      usableWidth - 30
    );

    // 4) Lo muestro en el PDF
    doc.text(lineasVacunas, leftMargin + 15, cursorY);

    cursorY += lineasVacunas.length * lineHeight + 15;

    // ————— 5) IMAGEN ESTÁTICA DEL ANIMAL —————
    try {
      const imgBase64 = await getBase64FromLocalUrl("/imagenes/animales.jpg");
      const imgX = leftMargin + 15;
      const imgY = cursorY;
      const imgW = 200;
      const imgH = 120;
      doc.addImage(imgBase64, "JPEG", imgX, imgY, imgW, imgH);
      cursorY += imgH + 20;
    } catch {
      cursorY += 20;
    }

    // ————— 6) CLÁUSULAS —————
    doc.setFontSize(12);
    doc.text("Cláusulas del Contrato:", leftMargin, cursorY);
    cursorY += 22;

    const clausulas = [
      "1. El presente contrato tiene como objeto la adopción de un animal, y el adoptante se compromete a brindarle cuidados y trato adecuado.",
      "2. El adoptante se compromete a no vender, ceder ni regalar al animal sin autorización del centro de adopción.",
      "3. El animal será tratado con respeto y no se permitirá maltrato.",
      "4. El adoptante permitirá un seguimiento del bienestar del animal por parte del centro.",
      "5. En caso de abandono, el animal será devuelto al centro de adopción.",
    ];

    clausulas.forEach((texto) => {
      // splitTextToSize parte el párrafo en tantas líneas como necesite
      const lineas = doc.splitTextToSize(texto, usableWidth - 30);
      doc.text(lineas, leftMargin + 15, cursorY);
      cursorY += lineas.length * lineHeight + 8;
    });

    cursorY += 40;

    // ————— 7) ZONA DE FIRMAS AL PIE —————
    const firmaAdoptX = leftMargin + 15;
    const firmaRespX = leftMargin + 300;
    const firmaY = cursorY;

    doc.setLineWidth(0.7);
    doc.setDrawColor(0, 0, 0);
    // Línea para Adoptante
    doc.line(firmaAdoptX, firmaY, firmaAdoptX + 150, firmaY);
    // Línea para Responsable
    doc.line(firmaRespX, firmaY, firmaRespX + 150, firmaY);

    // Etiquetas
    doc.setFontSize(11);
    doc.text("Firma del Adoptante", firmaAdoptX, firmaY + 15);
    doc.text("Firma del Responsable", firmaRespX, firmaY + 15);

    // ————— 8) AÑADIR Firma del Adoptante —————
    if (adoptante?.firma) {
      const pref = "data:image/png;base64,";
      const xa = firmaAdoptX;
      const ya = firmaY - 45;
      const wa = 150;
      const ha = 50;
      doc.addImage(pref + adoptante.firma, "PNG", xa, ya, wa, ha);
    }

    // ————— 9) AÑADIR Firma del Responsable —————
    try {
      // Suponemos que el archivo está en public/imagenes/firma_responsable.png
      const firmaRespBase64 = await getBase64FromLocalUrl(
        "/imagenes/firma_responsable.png"
      );
      const xr = firmaRespX;
      const yr = firmaY - 55; // para que la parte inferior de la firma toque la línea
      const wr = 150;
      const hr = 50;
      doc.addImage(firmaRespBase64, "PNG", xr, yr, wr, hr);
    } catch {
      console.warn("No se pudo cargar la firma del responsable.");
    }

    // ————— 10) DESCARGA BLOBrizada —————
    const pdfBlob = doc.output("blob");
    const url = URL.createObjectURL(pdfBlob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "contrato-adopcion.pdf";
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  }

  return (
    <button
      type="button"
      onClick={generatePDF}
      className="bg-red-300 py-2 px-4 rounded-full disabled:opacity-50"
    >
      {"Descargar Contrato PDF"}
    </button>
  );
}
