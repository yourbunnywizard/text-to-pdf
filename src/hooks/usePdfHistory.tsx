import {
  deletePdfFromHistory,
  getPdfHistory,
  persistPdfToHistory,
} from '@/lib/storage';
import { useState } from 'react';

const usePdfHistory = () => {
  const [history, setHistory] = useState<string[]>(getPdfHistory());

  const savePdf = (blob: Blob, id: string) => {
    persistPdfToHistory(blob, id).then(() => setHistory(getPdfHistory()));
  };

  const deletePdf = (id: string) => {
    deletePdfFromHistory(id);
    setHistory(getPdfHistory());
  };

  return { history, savePdf, deletePdf };
};

export default usePdfHistory;
