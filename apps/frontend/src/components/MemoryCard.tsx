import { Play } from 'lucide-react';

interface MemoryCardProps {
  mediaUrl: string;
  mediaType: 'IMAGE' | 'VIDEO';
  caption: string;
}

export default function MemoryCard({ mediaUrl, mediaType, caption }: MemoryCardProps) {
  return (
    <div className="relative aspect-square rounded-lg overflow-hidden group bg-gray-100">
      {mediaType === 'VIDEO' ? (
        <div className="relative w-full h-full">
          <video src={mediaUrl} className="w-full h-full object-cover" muted playsInline />
          <div className="absolute inset-0 flex items-center justify-center bg-black/20">
            <Play className="w-10 h-10 text-white" fill="white" />
          </div>
        </div>
      ) : (
        <img src={mediaUrl} alt={caption} className="w-full h-full object-cover" />
      )}

      <div className="absolute inset-0 flex items-end p-3 bg-black/0 opacity-0 group-hover:bg-black/40 group-hover:opacity-100 transition-all">
        <p className="text-white text-sm line-clamp-2">{caption}</p>
      </div>
    </div>
  );
}
