export const Gallery = () => {
  const galleryImages = [
    "https://d375139ucebi94.cloudfront.net/region2/pl/319418/biz_photo/fe2fefa17af54b6c919f56d37e7e97-inverness-med-medyczne-przeklu-biz-photo-895cc6a308e44d68bbb7a349741529-booksy.jpeg",
    "https://d375139ucebi94.cloudfront.net/region2/pl/319418/biz_photo/a6527f5bd2f047ca941c32318ba345-inverness-med-biz-photo-ebc63a90adca41af88dc95c41a56a9-booksy.jpeg",
    "https://d375139ucebi94.cloudfront.net/region2/pl/319418/inspiration/5f477df20f4b409ebdf3f3c595f3f8-inverness-med-medyczne-przeklu-inspiration-71c579082715496b9fb2c2a943dcdf-booksy.jpeg",
    "https://d375139ucebi94.cloudfront.net/region2/pl/319418/inspiration/18ce8b6047ac48ceb1603022f8df8c-inverness-med-medyczne-przeklu-inspiration-3ab9c2b17a99482ca0f77f7b4fe564-booksy.jpeg",
    "https://d375139ucebi94.cloudfront.net/region2/pl/319418/inspiration/ccb0e94cdec74ca9a622ab9c467ced-inverness-med-medyczne-przeklu-inspiration-4a4ec2db35f14fbb95e1fc187473e1-booksy.jpeg",
    "https://d375139ucebi94.cloudfront.net/region2/pl/319418/inspiration/9f9b7244c5d24cc2b1fe2082c39a80-inverness-med-medyczne-przeklu-inspiration-1f6c092935c94932a5d90d9d251363-booksy.jpeg",
  ];

  return (
    <section id="gallery" className="py-20 bg-gradient-to-b from-primary-light/10 to-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Galeria
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Zobacz nasz profesjonalny sprzęt i efekty naszej pracy
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {galleryImages.map((image, index) => (
            <div 
              key={index}
              className="relative aspect-square overflow-hidden rounded-lg shadow-soft hover:shadow-card transition-all duration-300 hover:scale-105 group"
            >
              <img 
                src={image}
                alt={`Inverness MED galeria ${index + 1}`}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
