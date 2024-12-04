const PDF_LOCAL_KEY = 'pdfs';

function blobToBase64(blob: Blob): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      const result = reader.result;
      if (typeof result === 'string') {
        resolve(result);
      } else {
        reject(new Error('Failed convert to Base64'));
      }
    };
    reader.onerror = () => reject(new Error('FileReader error'));
    reader.readAsDataURL(blob);
  });
}

export async function persistPdfToHistory(pdfBlob: Blob, id: string) {
  const base64 = await blobToBase64(pdfBlob);

  const existingPdfIds = JSON.parse(
    localStorage.getItem(PDF_LOCAL_KEY) || '[]'
  ) as string[];
  localStorage.setItem(PDF_LOCAL_KEY, JSON.stringify([id, ...existingPdfIds]));
  localStorage.setItem(`file-${id}`, base64);
}

export function clearPdfHistory() {
  const existingPdfIds = JSON.parse(
    localStorage.getItem(PDF_LOCAL_KEY) || '[]'
  ) as string[];
  existingPdfIds.forEach((id) => localStorage.removeItem(`file-${id}`));
  localStorage.removeItem(PDF_LOCAL_KEY);
}

export function deletePdfFromHistory(pdfId: string) {
  const existingPdfIds = JSON.parse(
    localStorage.getItem(PDF_LOCAL_KEY) || '[]'
  ) as string[];
  const updatedPdfIds = existingPdfIds.filter((id) => id !== pdfId);
  localStorage.setItem(PDF_LOCAL_KEY, JSON.stringify(updatedPdfIds));
  localStorage.removeItem(`file-${pdfId}`);
}

export function getPdfHistory() {
  return JSON.parse(localStorage.getItem(PDF_LOCAL_KEY) || '[]') as string[];
}

export function getPdfFile(id: string) {
  return localStorage.getItem(`file-${id}`);
}
