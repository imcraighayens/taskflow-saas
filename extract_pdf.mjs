import { getDocument } from 'pdfjs-dist/legacy/build/pdf.mjs';
import { readFileSync } from 'fs';

const data = readFileSync('C:/Users/x beast/Downloads/CAMEROON PITCH DECK.pdf');
const loadingTask = getDocument({ data: new Uint8Array(data) });
const pdf = await loadingTask.promise;
console.log('Pages:', pdf.numPages);

let fullText = '';
for (let i = 1; i <= pdf.numPages; i++) {
  const page = await pdf.getPage(i);
  const content = await page.getTextContent();
  const text = content.items.map(item => item.str).join(' ');
  fullText += `\n--- PAGE ${i} ---\n${text}`;
}
process.stdout.write(fullText.substring(0, 30000));
