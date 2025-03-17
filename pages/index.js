import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { motion } from "framer-motion";
import Head from "next/head";
import { ToastContainer, toast, Bounce } from "react-toastify";

export default function Home({ theme, toggleTheme }) {
  const [currentImage, setCurrentImage] = useState({ index: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState(null);


  const Categories = [
    {
      title: "Radhika Store",
      images: ["/categories/men1.jpg"],
      url: "/radhika",
    },
    {
      title: "Kanhas Restaurant",
      images: ["/categories/women1.jpg"],
      url: "/kanhas",
    },
    {
      title: "Old SC",
      images: ["/categories/kids1.jpg"],
      url: "/oldSC",
    },
  ];

  const featuredCollections = [
    {
      title: "Tshirts",
      images: ["/featured/tshirt1.jpg", "/featured/tshirt2.jpg", "/featured/tshirt3.jpg"],
    },
    {
      title: "Jeans",
      images: ["/featured/jeans1.jpg", "/featured/jeans2.jpg", "/featured/jeans3.jpg"],
    },
    {
      title: "Shoes",
      images: ["/featured/shoes1.jpg", "/featured/shoes2.jpg", "/featured/shoes3.jpg"],
    },
    {
      title: "Ethnic",
      images: ["/featured/ethnic1.jpg", "/featured/ethnic2.jpg", "/featured/ethnic3.jpg"],
    },
    {
      title: "Innerwear",
      images: ["/featured/innerwear1.jpg", "/featured/innerwear2.jpg", "/featured/innerwear3.jpg"],
    },
    {
      title: "Casual",
      images: ["/featured/casual1.jpg", "/featured/casual2.jpg", "/featured/casual3.jpg"],
    },
  ];
  const allCollections = [...Categories, ...featuredCollections]; // Combine both sections
  const [imageIndex, setImageIndex] = useState(allCollections.map(() => 0));

  // Slider settings
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 1500, // Slow transition (increase for even slower effect)
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000, // Time before changing slides
    fade: true, // Enables smooth fading transition
    cssEase: "ease-in-out", // Smooth easing
  };



  // Fade-in animation variants
  const fadeInVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeInOut" } },
  };


  useEffect(() => {
    const interval = setInterval(() => {
      setImageIndex((prevIndexes) =>
        prevIndexes.map((currentIndex, i) =>
          (currentIndex + 1) % allCollections[i].images.length
        )
      );
    }, 3000);

    return () => clearInterval(interval);
  }, [allCollections]);

  const handleCardClick = (title) => {
    toast.info(`Go to ${title} section from your categories.`, {
      position: "top-center",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      theme: "light",
      transition: Bounce,
    });

    // Scroll to the section
    const section = document.querySelector(".categories");
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  }

  return (
    <div className={`min-h-screen flex flex-col ${theme === "dark" ? "bg-gray-900 text-white" : "bg-gray-50 text-black"}`}>
      <ToastContainer
        position="top-center"
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Bounce}
      />
      <Head>
        <title>CampusCart</title>
      </Head>
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.5 }}
        variants={fadeInVariants}
        className="flex flex-col items-center text-gray-600 dark:text-gray-300 justify-center pb-24 pt-24 px-8"
      >
<div className="w-full max-w-4xl mx-auto">
  <section className="hero-section relative bg-gradient-to-r from-indigo-500 to-blue-500 rounded-lg shadow-lg overflow-hidden">
    <div className="hero-banner flex items-center justify-center min-h-[250px] sm:min-h-[300px] md:min-h-[350px] lg:min-h-[400px]">
      <div className="hero-content text-center text-white px-6 sm:px-10">
        <h1 className="hero-title text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
          Student Exclusive
        </h1>
        <p className="hero-text text-lg sm:text-xl mb-6">
          Get <span className="font-bold">20% off</span> on your first order with code <span className="bg-white text-pink-500 font-semibold px-2 py-1 rounded">STUDENT20</span>
        </p>
      </div>
    </div>
  </section>
</div>

        <h1 className="text-4xl text-gray-900 dark:text-gray-300 md:text-5xl font-bold mt-10 mb-6 text-center">
          Welcome to CampusCart!
        </h1>
        <p className="text-lg md:text-xl text-gray-900 dark:text-gray-300 text-center max-w-2xl mb-8 leading-relaxed">
          Discover amazing products at unbeatable prices. Your one-stop online shop for everything you need.
        </p>
        <button
          aria-label="Shop Now"
          className="bg-[#fffdfd]  text-pink-600 font-semibold py-3 px-8 rounded-full shadow-lg hover:bg-pink-100 hover:scale-105 transition-transform"
          onClick={() => {
            const section = document.querySelector(".categories");
            if (section) {
              section.scrollIntoView({ behavior: "smooth" });
            }
          }}
        >
          Shop Now
        </button>
      </motion.div>

      <div className="bg-[#aba4a4] h-0.5 w-full rounded-full"></div>

      <section className="categories text-gray-600 body-font">
        <div className="container px-5 py-24 mx-auto">

          <div className="flex flex-wrap w-full mb-20 flex-col items-center text-center">
            <h1 className="sm:text-3xl text-2xl font-medium title-font mb-2 text-gray-900 dark:text-gray-300">
              Shop Near You
            </h1>
          </div>


          <div className="flex flex-wrap -m-4 categories">
            {Categories.map((item, index) => (
              <Link key={index} href={item.url} passHref className="sm:w-1/2 md:w-[20em] p-4 w-[11em] m-auto">
                <div
                  className="sm:w-1/2 md:w-[20em] p-4 w-[11em] m-auto cursor-pointer"
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                >
                  <div className="border border-gray-200 p-2 rounded-lg relative group h-full transition-transform duration-500 ease-in-out hover:scale-105">
                    <div className="relative w-full overflow-hidden" style={{ paddingBottom: "150%" }}>
                      <div className="absolute inset-0 w-full h-full">
                        {item.images.map((img, imgIdx) => (
                          <Image
                            key={imgIdx}
                            src={img}
                            alt={item.title}
                            layout="fill"
                            objectFit="cover"
                            className={`absolute inset-0 rounded-lg transition-all duration-1000 ease-in-out ${imgIdx === imageIndex[index]
                              ? "opacity-100 scale-100 z-10"
                              : "opacity-0 scale-105 z-0"
                              } ${hoveredIndex === index ? "scale-110 opacity-90" : ""}`}
                          />
                        ))}
                      </div>
                    </div>
                    <h3 className="text-center text-lg text-gray-900 dark:text-gray-300 font-medium title-font p-3 mb-2 mt-4">
                      {item.title}
                    </h3>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section >
    </div>
  );
}
