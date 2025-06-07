import { useEffect, useState } from "react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { BookOpenText } from "lucide-react";

const slides = [
  {
    image:
      "https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=1470&q=80",
    title: "Track Your Favorite Books",
    description:
      "Save what you read, plan your next reads, and organize your bookshelf virtually.",
  },
  {
    image:
      "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&w=1470&q=80",
    title: "Review and Rate Reads",
    description:
      "Write short reviews, leave star ratings, and see what others are reading.",
  },
  {
    image:
      "https://images.unsplash.com/photo-1507842217343-583bb7270b66?auto=format&fit=crop&w=1470&q=80",
    title: "Discover New Titles",
    description:
      "Get inspired by trending books and curated lists from your bookshelf buddies.",
  },
];

const Banner = () => {
  const [current, setCurrent] = useState(0);
  const total = slides.length;

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % total);
    }, 5000); // 0.5 seconds

    return () => clearInterval(interval);
  }, [total]);

  const prevSlide = () => setCurrent((prev) => (prev - 1 + total) % total);
  const nextSlide = () => setCurrent((prev) => (prev + 1) % total);

  return (
    <div className="relative w-full h-[80vh] overflow-hidden">
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 w-full h-full transition-transform ease-in-out duration-6000 ${
            index === current ? "opacity-100 z-10" : "opacity-0 z-0"
          }`}
        >
          <img
            src={slide.image}
            className="w-full h-full object-cover"
            alt={slide.title}
          />
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0 w-2/3 h-2/3 mx-auto my-auto place-items-center text-center bg-black/30 bg-opacity-60 flex flex-col justify-center px-6 md:px-16 text-white"
          >
            <BookOpenText className="text-secondary mb-4" size={44} />
            <h2 className="text-3xl md:text-5xl font-bold mb-2">
              {slide.title}
            </h2>
            <p className="max-w-xl text-base md:text-lg text-gray-300">
              {slide.description}
            </p>
            <button className="btn btn-secondary mt-6 w-fit px-6">
              Start Reading →
            </button>
          </motion.div>
        </div>
      ))}

      {/* Manual Controls */}
      <div className="absolute flex justify-between transform -translate-y-1/2 left-4 right-4 top-1/2 z-20">
        <button
          onClick={prevSlide}
          className="btn btn-circle bg-primary text-white"
        >
          ❮
        </button>
        <button
          onClick={nextSlide}
          className="btn btn-circle bg-primary text-white"
        >
          ❯
        </button>
      </div>

      {/* Indicators */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2 z-20">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrent(index)}
            className={`btn btn-xs ${
              index === current
                ? "bg-secondary"
                : "bg-base-300 hover:bg-secondary/50"
            } border-none`}
          ></button>
        ))}
      </div>
    </div>
  );
};

export default Banner;
