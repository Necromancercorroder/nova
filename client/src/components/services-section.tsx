import { motion } from "framer-motion";

export default function ServicesSection() {
  const services = [
    {
      icon: "fas fa-drafting-compass",
      title: "Custom Design",
      description: "Professional CAD modeling and design optimization for 3D printing",
      features: ["3D Modeling & CAD Design", "Design Optimization", "File Preparation"]
    },
    {
      icon: "fas fa-cube",
      title: "FDM Printing",
      description: "High-quality Fused Deposition Modeling for durable parts",
      features: ["PLA, ABS, PETG Materials", "Large Format Printing", "Multi-Color Printing"]
    },
    {
      icon: "fas fa-microscope",
      title: "Resin Printing",
      description: "Ultra-precise SLA/DLP printing for detailed miniatures and jewelry",
      features: ["High Resolution Details", "Smooth Surface Finish", "Specialty Resins"]
    },
    {
      icon: "fas fa-industry",
      title: "Prototyping",
      description: "Rapid prototyping services for product development and testing",
      features: ["Functional Prototypes", "Iterative Design", "Fast Turnaround"]
    },
    {
      icon: "fas fa-paint-brush",
      title: "Post-Processing",
      description: "Professional finishing services for production-ready parts",
      features: ["Sanding & Smoothing", "Painting & Coating", "Assembly Services"]
    },
    {
      icon: "fas fa-shipping-fast",
      title: "Express Service",
      description: "Rush orders and emergency printing with guaranteed delivery",
      features: ["24/7 Production", "Same-Day Delivery", "Priority Queue"]
    }
  ];

  return (
    <section id="services" className="py-20 px-4 bg-zinc-900">
      <div className="max-w-6xl mx-auto">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 nova-gradient">
            Our Services
          </h2>
          <p className="text-zinc-400 text-lg max-w-2xl mx-auto">
            From concept to creation, we offer comprehensive 3D printing solutions for all your needs
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              className="bg-black p-8 rounded-2xl border border-zinc-700 hover:border-orange-500 transition-all duration-300 group"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <div className="bg-gradient-to-r from-orange-500 to-yellow-400 w-16 h-16 rounded-lg flex items-center justify-center mb-6">
                <i className={`${service.icon} text-black text-2xl`}></i>
              </div>
              <h3 className="text-2xl font-bold mb-4 group-hover:text-orange-400 transition-colors">
                {service.title}
              </h3>
              <p className="text-zinc-400 mb-6">{service.description}</p>
              <ul className="space-y-2 text-sm text-zinc-300">
                {service.features.map((feature, featureIndex) => (
                  <li key={featureIndex}>
                    <i className="fas fa-check text-orange-400 mr-2"></i>
                    {feature}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
