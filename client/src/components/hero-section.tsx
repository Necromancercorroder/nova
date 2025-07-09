import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

export default function HeroSection() {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="flex flex-col items-center justify-center text-center py-24 px-4 min-h-screen bg-gradient-to-b from-black via-zinc-900 to-black">
      <motion.h1
        className="text-5xl md:text-6xl font-extrabold nova-gradient mb-6"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        Bring Your Ideas to Life in 3D
      </motion.h1>
      
      <motion.p
        className="text-lg text-zinc-400 max-w-xl mb-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        NovaNexus 3D Prints specializes in custom prints, prototypes, and designs that turn your digital dreams into tangible creations.
      </motion.p>
      
      <motion.div
        className="flex flex-col sm:flex-row gap-4 mb-16"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.6 }}
      >
        <Button 
          className="nova-button text-lg px-8 py-3 rounded-xl"
          onClick={() => scrollToSection("services")}
        >
          Explore Our Services
        </Button>
        <Button 
          variant="outline" 
          className="nova-button-outline text-lg px-8 py-3 rounded-xl"
          onClick={() => scrollToSection("gallery")}
        >
          View Gallery
        </Button>
      </motion.div>
      
      <motion.div 
        className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
      >
        <div className="nova-card p-6">
          <i className="fas fa-rocket text-orange-400 text-3xl mb-4"></i>
          <h3 className="text-xl font-bold mb-2">Rapid Prototyping</h3>
          <p className="text-zinc-400">Fast iteration and testing of your designs</p>
        </div>
        <div className="nova-card p-6">
          <i className="fas fa-cogs text-orange-400 text-3xl mb-4"></i>
          <h3 className="text-xl font-bold mb-2">Custom Manufacturing</h3>
          <p className="text-zinc-400">Tailored solutions for your specific needs</p>
        </div>
        <div className="nova-card p-6">
          <i className="fas fa-gem text-orange-400 text-3xl mb-4"></i>
          <h3 className="text-xl font-bold mb-2">Premium Materials</h3>
          <p className="text-zinc-400">Industry-grade filaments and resins</p>
        </div>
      </motion.div>
    </section>
  );
}
