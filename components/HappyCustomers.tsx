import Image from "next/image";

const photos = [
  {
    src: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=600&h=400&fit=crop",
    alt: "Happy family streaming a movie on their new home internet connection",
    caption: "Stream movies, games & more — all with lightning-fast WiFi.",
  },
  {
    src: "https://images.unsplash.com/photo-1556740758-90de374c12ad?w=600&h=400&fit=crop",
    alt: "Smiling technician installing wireless service for a customer",
    caption: "Professional setup so you're connected from day one.",
  },
  {
    src: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=600&h=400&fit=crop",
    alt: "Group of friends video calling on a fast wireless connection",
    caption: "Stay connected with friends & family, anywhere in the home.",
  },
];

export default function HappyCustomers() {
  return (
    <section className="py-16 sm:py-20 px-4 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-3">
            Happy Customers, <span className="text-spectrum-blue">Connected Homes</span>
          </h2>
          <p className="text-gray-500 text-lg max-w-2xl mx-auto">
            See why families and businesses trust HIWS for fast, reliable internet and wireless service.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {photos.map((photo) => (
            <div
              key={photo.src}
              className="group relative rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-shadow"
            >
              <Image
                src={photo.src}
                alt={photo.alt}
                width={600}
                height={400}
                className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              <p className="absolute bottom-4 left-4 right-4 text-white text-sm font-medium leading-snug">
                {photo.caption}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
