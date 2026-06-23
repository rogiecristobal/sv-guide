export async function exportChecklistToPDF(elementId, title) {
  const { default: html2canvas } = await import('html2canvas');
  const { default: jsPDF } = await import('jspdf');

  const element = document.getElementById(elementId);
  if (!element) return;

  const canvas = await html2canvas(element, {
    backgroundColor: '#FFF8E7',
    scale: 2,
    useCORS: true,
  });

  const imgData = canvas.toDataURL('image/png');
  const pdf = new jsPDF('p', 'mm', 'a4');
  const imgWidth = 190;
  const imgHeight = (canvas.height * imgWidth) / canvas.width;

  pdf.setFontSize(16);
  pdf.text(title || 'Stardew Valley Checklist', 105, 15, { align: 'center' });

  let heightLeft = imgHeight;
  let position = 25;

  pdf.addImage(imgData, 'PNG', 10, position, imgWidth, imgHeight);
  heightLeft -= (297 - position);

  while (heightLeft > 0) {
    position = 10;
    pdf.addPage();
    pdf.addImage(imgData, 'PNG', 10, position, imgWidth, imgHeight);
    heightLeft -= (297 - position);
  }

  const filename = (title || 'stardew-checklist').toLowerCase().replace(/\s+/g, '-') + '.pdf';
  pdf.save(filename);
}
