import { Link } from "react-router-dom";

interface EarringCardProps {
  earring: {
    images: string[];
    name: string;
  };
  index: number;
  className?: string;
}

export const EarringCard = ({ earring, index, className = "" }: EarringCardProps) => {
  return (
    <Link
      to={`/earrings/${index}`}
      className={`group relative aspect-square overflow-hidden rounded-lg bg-card border border-border hover:border-teal-600/50 transition-all duration-300 hover:shadow-lg min-h-[120px] sm:min-h-[160px] ${className}`}
    >
      <img
        src={earring.images[0]}
        alt={earring.name}
        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
        loading="lazy"
        decoding="async"
        width="400"
        height="400"
        style={{ 
          contentVisibility: 'auto',
          containIntrinsicSize: '400px 400px'
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/0 to-black/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4">
          <p className="text-white text-xs sm:text-sm font-medium line-clamp-2">
            {earring.name}
          </p>
        </div>
      </div>
    </Link>
  );
};
