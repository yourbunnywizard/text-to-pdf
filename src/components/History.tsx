import DownloadIcon from '@/components/icons/Download.icon';
import PdfIcon from '@/components/icons/Pdf.icon';
import PreviewIcon from '@/components/icons/Preview.icon';
import TrashIcon from '@/components/icons/Trash.icon';
import { getPdfFile } from '@/lib/storage';

interface HistoryProps {
  history: string[];
  onPreview: (id: string) => void;
  onDelete: (id: string) => void;
}

interface HistoryCardProps {
  id: string;
  onPreview: () => void;
  onDelete: () => void;
}

const HistoryCard = ({ id, onPreview, onDelete }: HistoryCardProps) => {
  const onDownload = () => {
    const pdf = getPdfFile(id);
    if (!pdf) return;

    const a = document.createElement('a');
    a.href = pdf;
    a.download = `${id}.pdf`;
    a.click();
  };

  return (
    <div className="flex gap-4 animate-slide-in">
      <div className="w-20 h-20 grid place-items-center bg-card-bg border-2 border-primary rounded-xl">
        <PdfIcon />
      </div>
      <div>
        <span className="text-lg font-bold">
          {new Date(Number(id)).toLocaleString()}
        </span>
        <div className="flex gap-2 mt-2">
          <button
            className="card-action-button"
            onClick={onPreview}
            title="Preview"
          >
            <PreviewIcon />
          </button>
          <button
            className="card-action-button"
            onClick={onDownload}
            title="Download"
          >
            <DownloadIcon />
          </button>
          <button
            className="card-action-button"
            onClick={onDelete}
            title="Delete"
          >
            <TrashIcon />
          </button>
        </div>
      </div>
    </div>
  );
};

const History = ({ history, onPreview, onDelete }: HistoryProps) => {
  if (!history.length) return <></>;

  return (
    <section>
      <h2 className="text-2xl font-bold py-2.5 bg-secondary text-white uppercase text-center rounded-[50px]">
        Saved conversions of PDF
      </h2>

      <div className="py-4 grid gap-4 overflow-hidden">
        {history.map((item) => (
          <HistoryCard
            key={item}
            id={item}
            onPreview={() => onPreview(item)}
            onDelete={() => onDelete(item)}
          />
        ))}
      </div>
    </section>
  );
};

export default History;
