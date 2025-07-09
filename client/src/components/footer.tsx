export default function Footer() {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer className="bg-zinc-900 py-12 px-4 border-t border-zinc-700">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-yellow-400 rounded-lg flex items-center justify-center">
                <i className="fas fa-cube text-black text-xl"></i>
              </div>
              <span className="text-xl font-bold text-orange-400">NovaNexus 3D Prints</span>
            </div>
            <p className="text-zinc-400 mb-6 max-w-md">
              Transforming ideas into reality through precision 3D printing technology. Your trusted partner for prototyping, manufacturing, and custom solutions.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-zinc-400 hover:text-orange-400 transition-colors">
                <i className="fab fa-facebook text-xl"></i>
              </a>
              <a href="#" className="text-zinc-400 hover:text-orange-400 transition-colors">
                <i className="fab fa-twitter text-xl"></i>
              </a>
              <a href="#" className="text-zinc-400 hover:text-orange-400 transition-colors">
                <i className="fab fa-instagram text-xl"></i>
              </a>
              <a href="#" className="text-zinc-400 hover:text-orange-400 transition-colors">
                <i className="fab fa-linkedin text-xl"></i>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <button 
                  onClick={() => scrollToSection("services")}
                  className="text-zinc-400 hover:text-orange-400 transition-colors"
                >
                  Services
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection("gallery")}
                  className="text-zinc-400 hover:text-orange-400 transition-colors"
                >
                  Gallery
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection("process")}
                  className="text-zinc-400 hover:text-orange-400 transition-colors"
                >
                  Process
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection("contact")}
                  className="text-zinc-400 hover:text-orange-400 transition-colors"
                >
                  Contact
                </button>
              </li>
              <li>
                <a href="#" className="text-zinc-400 hover:text-orange-400 transition-colors">About Us</a>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Services</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-zinc-400 hover:text-orange-400 transition-colors">FDM Printing</a></li>
              <li><a href="#" className="text-zinc-400 hover:text-orange-400 transition-colors">Resin Printing</a></li>
              <li><a href="#" className="text-zinc-400 hover:text-orange-400 transition-colors">Prototyping</a></li>
              <li><a href="#" className="text-zinc-400 hover:text-orange-400 transition-colors">Custom Design</a></li>
              <li><a href="#" className="text-zinc-400 hover:text-orange-400 transition-colors">Post-Processing</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-zinc-700 mt-8 pt-8 text-center">
          <p className="text-zinc-400">
            © 2024 NovaNexus 3D Prints. All rights reserved. | 
            <a href="#" className="hover:text-orange-400 transition-colors"> Privacy Policy</a> | 
            <a href="#" className="hover:text-orange-400 transition-colors"> Terms of Service</a>
          </p>
        </div>
      </div>
    </footer>
  );
}
