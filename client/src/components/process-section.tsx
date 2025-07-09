import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

export default function ProcessSection() {
  const processSteps = [
    {
      number: 1,
      title: "Consultation",
      description: "Discuss your project requirements and provide expert recommendations"
    },
    {
      number: 2,
      title: "Design & Quote",
      description: "Create or optimize your 3D model and provide detailed pricing"
    },
    {
      number: 3,
      title: "Production",
      description: "Print your project using the most suitable technology and materials"
    },
    {
      number: 4,
      title: "Delivery",
      description: "Quality check, post-processing, and secure delivery to your location"
    }
  ];

  return (
    <section id="process" className="py-20 px-4 bg-zinc-900">
      <div className="max-w-6xl mx-auto">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 nova-gradient">
            Our Process
          </h2>
          <p className="text-zinc-400 text-lg max-w-2xl mx-auto">
            From concept to delivery, we follow a proven process to ensure exceptional results
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {processSteps.map((step, index) => (
            <motion.div
              key={index}
              className="text-center"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
            >
              <div className="bg-gradient-to-r from-orange-500 to-yellow-400 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-black text-2xl font-bold">{step.number}</span>
              </div>
              <h3 className="text-xl font-bold mb-4">{step.title}</h3>
              <p className="text-zinc-400">{step.description}</p>
            </motion.div>
          ))}
        </div>

        <motion.div 
          className="bg-black rounded-2xl p-8 mt-16 text-center border border-zinc-700"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h3 className="text-3xl font-bold mb-4">Ready to Start Your Project?</h3>
          <p className="text-zinc-400 mb-8 max-w-2xl mx-auto">
            Get a free quote for your 3D printing project. Upload your files or describe your idea, and we'll provide expert guidance and competitive pricing.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button className="nova-button px-8 py-3 rounded-xl">
              Get Free Quote
            </Button>
            <Button variant="outline" className="nova-button-outline px-8 py-3 rounded-xl">
              Upload Files
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
