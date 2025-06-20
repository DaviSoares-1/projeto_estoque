import jsPDF from "jspdf";
import { formatPrice } from "./formatPrice";

export const exportProductsToPDF = (products) => {
  const doc = new jsPDF();
  const startX = 10;
  let startY = 20;
  const rowHeight = 10;

  // Título
  doc.setFontSize(14);
  doc.text("Estoque - JJ LAVA-JATO LANCHONETE", startX, 10);

  // Cabeçalhos
  const headers = ["ID", "Nome", "Categoria", "Preço Unitário", "Qtd"];
  const colWidths = [25, 60, 40, 35, 20];

  let currentX = startX;
  doc.setFontSize(11);
  headers.forEach((header, index) => {
    doc.rect(currentX, startY, colWidths[index], rowHeight);
    doc.text(header, currentX + 2, startY + 7);
    currentX += colWidths[index];
  });

  startY += rowHeight;

  // Corpo da tabela
  products.forEach((p) => {
    let currentX = startX;
    const rowData = [
      p.id,
      p.name,
      p.category,
      formatPrice(p.price),
      p.quantity.toString(),
    ];

    rowData.forEach((cell, index) => {
      doc.rect(currentX, startY, colWidths[index], rowHeight);
      const text = String(cell);
      doc.text(
        text.length > 20 ? text.slice(0, 20) + "..." : text,
        currentX + 2,
        startY + 7
      );
      currentX += colWidths[index];
    });

    startY += rowHeight;

    if (startY > 270) {
      doc.addPage();
      startY = 20;
    }
  });

  // Gerar nome de arquivo com data
  const today = new Date();
  const day = String(today.getDate()).padStart(2, "0");
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const year = today.getFullYear();
  const fileName = `estoque_${day}-${month}-${year}.pdf`;

  doc.save(fileName);
};
