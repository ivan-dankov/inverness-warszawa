import { useNavigate } from "react-router-dom";
import { getAllEarrings } from "@/lib/earrings";

export const Earrings = () => {
  const navigate = useNavigate();
  const earrings = getAllEarrings();
  const displayedEarrings = earrings.slice(0, 7);

  return (
    <section id="earrings" className="py-12 sm:py-20 bg-gradient-to-b from-background to-muted/20">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-3 sm:mb-4">
            Kolekcja Kolczyków <span className="text-teal-600">Inverness MED</span>
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Najwyższej jakości kolczyki medyczne - bezpieczne, hipoalergiczne i eleganckie
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
          {displayedEarrings.map((earring, index) => (
            <div
              key={index}
              onClick={() => navigate(`/earrings/${index}`)}
              className="relative aspect-square cursor-pointer overflow-hidden rounded-lg group"
            >
              <img
                src={earring.images[0]}
                alt={earring.name}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-2 sm:p-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <p className="text-white text-xs sm:text-sm font-medium line-clamp-2">{earring.name}</p>
              </div>
            </div>
          ))}

          {/* See All Tile */}
          <div 
            onClick={() => navigate('/earrings')}
            className="relative aspect-square cursor-pointer overflow-hidden rounded-lg bg-gradient-to-br from-teal-600/20 to-teal-800/20 backdrop-blur-sm border-2 border-teal-600/30 group hover:border-teal-600/60 transition-all duration-300"
          >
            <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center">
              <div className="text-3xl sm:text-4xl lg:text-5xl font-bold text-teal-600 mb-2">
                {earrings.length}+
              </div>
              <p className="text-sm sm:text-base lg:text-lg font-semibold text-foreground">
                Zobacz Wszystkie
              </p>
              <p className="text-xs sm:text-sm text-muted-foreground mt-1">
                Kolczyki
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
