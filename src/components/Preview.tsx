interface PreviewProps {
  url?: string | null;
  title: string;
  enabled: boolean;
}

const Preview = ({ url, title, enabled = true }: PreviewProps) => {
  return (
    <div className="border-2 border-black w-full h-full relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -rotate-45 text-5xl font-bold opacity-50 z-0">
        PREVIEW
      </div>
      {Boolean(url && enabled) && (
        <iframe
          className="relative z-1"
          src={url!}
          style={{ width: '100%', height: '100%' }}
          title={title}
        ></iframe>
      )}
    </div>
  );
};

export default Preview;
