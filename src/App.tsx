import History from '@/components/History';
import Preview from '@/components/Preview';
import usePdfHistory from '@/hooks/usePdfHistory';
import { convertTextToPdf } from '@/lib/requests';
import { getPdfFile } from '@/lib/storage';
import { useMemo, useRef, useState } from 'react';

function App() {
  const scrollContainer = useRef<HTMLDivElement>(null);
  const { history, savePdf, deletePdf } = usePdfHistory();
  const [text, setText] = useState('');
  const [previewId, setPreviewId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const previewData = useMemo(() => {
    if (!previewId) return null;
    return getPdfFile(previewId);
  }, [previewId, history]);

  const handleConvertToPDF = () => {
    setIsLoading(true);
    convertTextToPdf(text)
      .then((pdfBlob) => {
        setText('');
        const id = Date.now().toString();
        if (pdfBlob) savePdf(pdfBlob, id);
        setPreviewId(id);
      })
      .finally(() => setIsLoading(false));
  };

  return (
    <div className="w-dvw h-dvh overflow-hidden">
      <div
        ref={scrollContainer}
        className="container grid md:grid-cols-2 md:auto-rows-fr auto-rows-max gap-8 h-full max-h-full overflow-y-scroll stable-scrollbar custom-scrollbar"
      >
        <div className="grow min-w-[350px] min-h-[500px] h-full max-h-[500px] md:max-h-[calc(100dvh-6rem)] md:sticky md:top-12 mt-12">
          <Preview
            enabled={Boolean(previewId)}
            url={previewData}
            title={`Preview ${new Date(Number(previewId)).toLocaleDateString()}`}
          />
        </div>
        <div className="py-12 grid auto-rows-max gap-12 grow shrink min-w-[350px]">
          <section>
            <h1 className="text-5xl font-extrabold pb-8">Text to PDF</h1>
            <div>
              <h2 className="text-2xl font-bold py-4">
                Convert your text to PDF
              </h2>
              <div className="grid gap-4">
                <textarea
                  className="p-2 border-2 border-primary rounded-md min-h-14 max-h-[450px] h-72 bg-input text-lg disabled:opacity-50 disabled:pointer-events-none"
                  placeholder="Text"
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  disabled={isLoading}
                />
                <button
                  className="w-max border-2 border-primary rounded-[30px] py-1 px-6 mx-auto bg-primary text-white font-bold transition hover:bg-transparent hover:text-primary disabled:opacity-50 disabled:pointer-events-none"
                  onClick={handleConvertToPDF}
                  disabled={!text || isLoading}
                >
                  Convert to PDF
                </button>
              </div>
            </div>
          </section>

          <History
            history={history}
            onPreview={(id) => {
              setPreviewId(id);
              if (scrollContainer.current) {
                scrollContainer.current.scrollTo({
                  top: 0,
                  behavior: 'smooth',
                });
              }
            }}
            onDelete={deletePdf}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
