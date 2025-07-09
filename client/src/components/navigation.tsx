import { useState } from "react";
import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setIsMenuOpen(false);
  };

  return (
    <header className="flex items-center justify-between p-4 bg-zinc-900 shadow-md sticky top-0 z-50 backdrop-blur-sm">
      <div className="flex items-center gap-2">
        <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-yellow-400 rounded-lg flex items-center justify-center">
          <i className="fas fa-cube text-black text-xl"></i>
        </div>
        <span className="text-xl font-bold text-orange-400">NovaNexus 3D Prints</span>
      </div>
      
      <nav className="hidden md:flex gap-6">
        <button 
          onClick={() => scrollToSection("services")} 
          className="hover:text-orange-400 transition-colors duration-300"
        >
          Services
        </button>
        <button 
          onClick={() => scrollToSection("gallery")} 
          className="hover:text-orange-400 transition-colors duration-300"
        >
          Gallery
        </button>
        <button 
          onClick={() => scrollToSection("process")} 
          className="hover:text-orange-400 transition-colors duration-300"
        >
          Process
        </button>
        <Link href="/custom-design">
          <button className="hover:text-orange-400 transition-colors duration-300">
            Custom Design
          </button>
        </Link>
        <button 
          onClick={() => scrollToSection("contact")} 
          className="hover:text-orange-400 transition-colors duration-300"
        >
          Contact
        </button>
      </nav>

      <Button
        variant="ghost"
        size="icon"
        className="md:hidden text-orange-400"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
      >
        {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
      </Button>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="absolute top-full left-0 right-0 bg-zinc-900 border-t border-zinc-700 md:hidden"
        >
          <nav className="flex flex-col p-4 space-y-4">
            <button 
              onClick={() => scrollToSection("services")} 
              className="text-left hover:text-orange-400 transition-colors duration-300"
            >
              Services
            </button>
            <button 
              onClick={() => scrollToSection("gallery")} 
              className="text-left hover:text-orange-400 transition-colors duration-300"
            >
              Gallery
            </button>
            <button 
              onClick={() => scrollToSection("process")} 
              className="text-left hover:text-orange-400 transition-colors duration-300"
            >
              Process
            </button>
            <Link href="/custom-design">
              <button 
                onClick={() => setIsMenuOpen(false)}
                className="text-left hover:text-orange-400 transition-colors duration-300"
              >
                Custom Design
              </button>
            </Link>
            <button 
              onClick={() => scrollToSection("contact")} 
              className="text-left hover:text-orange-400 transition-colors duration-300"
            >
              Contact
            </button>
          </nav>
        </motion.div>
      )}
    </header>
  );
}
