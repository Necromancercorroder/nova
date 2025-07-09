import { motion } from "framer-motion";
import { useState } from "react";
import { Button } from "@/components/ui/button";

export default function GallerySection() {
  const [activeCategory, setActiveCategory] = useState("All");

  const categories = ["All", "Prototypes", "Miniatures", "Industrial", "Art"];

  const galleryItems = [
    {
      title: "Mechanical Prototype",
      description: "Complex gear assembly for automotive testing",
      category: "Prototypes",
      image: "https://images.unsplash.com/photo-1581092921461-eab62e97a780?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400"
    },
    {
      title: "Gaming Miniatures",
      description: "High-detail resin prints for tabletop gaming",
      category: "Miniatures",
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400"
    },
    {
      title: "Architectural Model",
      description: "Scale model for urban planning presentation",
      category: "Industrial",
      image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400"
    },
    {
      title: "Custom Jewelry",
      description: "Intricate resin jewelry with metallic finish",
      category: "Art",
      image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400"
    },
    {
      title: "Drone Frame",
      description: "Lightweight carbon fiber composite frame",
      category: "Industrial",
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400"
    },
    {
      title: "Art Sculpture",
      description: "Contemporary art piece with complex geometry",
      category: "Art",
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400"
    }
  ];

  const filteredItems = activeCategory === "All" 
    ? galleryItems 
    : galleryItems.filter(item => item.category === activeCategory);

  return (
    <section id="gallery" className="py-20 px-4 bg-black">
      <div className="max-w-6xl mx-auto">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 nova-gradient">
            Our Work
          </h2>
          <p className="text-zinc-400 text-lg max-w-2xl mx-auto">
            Explore our portfolio of successful 3D printing projects across various industries
          </p>
        </motion.div>

        <div className="flex justify-center mb-12">
          <div className="bg-zinc-900 p-1 rounded-lg">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-6 py-2 rounded-md font-medium transition-all duration-300 ${
                  activeCategory === category
                    ? "bg-orange-400 text-black"
                    : "text-zinc-400 hover:text-white"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item, index) => (
            <motion.div
              key={index}
              className="group cursor-pointer"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <div className="bg-zinc-900 rounded-2xl overflow-hidden border border-zinc-700 hover:border-orange-500 transition-all duration-300">
                <img 
                  src={item.image} 
                  alt={item.title}
                  className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300" 
                />
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2 group-hover:text-orange-400 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-zinc-400 text-sm">{item.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button className="nova-button px-8 py-3 rounded-xl">
            View Full Portfolio
          </Button>
        </div>
      </div>
    </section>
  );
}
