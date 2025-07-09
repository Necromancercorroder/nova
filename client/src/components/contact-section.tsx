import { motion } from "framer-motion";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    toast({
      title: "Message sent successfully!",
      description: "We'll get back to you within 24 hours.",
    });
    
    setFormData({ name: "", email: "", subject: "", message: "" });
    setIsSubmitting(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const contactInfo = [
    { icon: "fas fa-map-marker-alt", label: "Address", value: "123 Innovation Drive, Tech City, TC 12345" },
    { icon: "fas fa-phone", label: "Phone", value: "+1 (555) 123-4567" },
    { icon: "fas fa-envelope", label: "Email", value: "info@novanexus3d.com" },
    { icon: "fas fa-clock", label: "Hours", value: "Mon-Fri: 9AM-6PM, Sat: 10AM-4PM" }
  ];

  const whyChooseUs = [
    { icon: "fas fa-check-circle", title: "Expert Design Team", description: "Professional engineers and designers" },
    { icon: "fas fa-check-circle", title: "State-of-the-Art Equipment", description: "Latest 3D printing technologies" },
    { icon: "fas fa-check-circle", title: "Fast Turnaround", description: "Most orders completed within 48 hours" },
    { icon: "fas fa-check-circle", title: "Quality Guarantee", description: "100% satisfaction or money back" }
  ];

  return (
    <section id="contact" className="py-20 px-4 bg-black">
      <div className="max-w-6xl mx-auto">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 nova-gradient">
            Get In Touch
          </h2>
          <p className="text-zinc-400 text-lg max-w-2xl mx-auto">
            Ready to bring your ideas to life? Contact us for a consultation or quote
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <motion.div 
            className="bg-zinc-900 rounded-2xl p-8 border border-zinc-700"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-bold mb-6">Send Us a Message</h3>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your Name"
                    className="bg-black border-zinc-600 text-white placeholder-zinc-400 focus:border-orange-400"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="your.email@example.com"
                    className="bg-black border-zinc-600 text-white placeholder-zinc-400 focus:border-orange-400"
                    required
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="subject">Subject</Label>
                <Input
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="Project Inquiry"
                  className="bg-black border-zinc-600 text-white placeholder-zinc-400 focus:border-orange-400"
                  required
                />
              </div>
              <div>
                <Label htmlFor="message">Message</Label>
                <Textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={5}
                  placeholder="Tell us about your project..."
                  className="bg-black border-zinc-600 text-white placeholder-zinc-400 focus:border-orange-400 resize-none"
                  required
                />
              </div>
              <div>
                <Label>Project Files (Optional)</Label>
                <div className="border-2 border-dashed border-zinc-600 rounded-lg p-8 text-center hover:border-orange-400 transition-colors cursor-pointer">
                  <i className="fas fa-cloud-upload-alt text-3xl text-zinc-400 mb-4"></i>
                  <p className="text-zinc-400">Drop files here or click to browse</p>
                  <p className="text-sm text-zinc-500 mt-2">STL, OBJ, 3MF files supported</p>
                </div>
              </div>
              <Button 
                type="submit" 
                className="w-full nova-button py-3 rounded-xl"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Sending..." : "Send Message"}
              </Button>
            </form>
          </motion.div>

          {/* Contact Information */}
          <div className="space-y-8">
            <motion.div 
              className="bg-zinc-900 rounded-2xl p-8 border border-zinc-700"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h3 className="text-2xl font-bold mb-6">Contact Information</h3>
              <div className="space-y-4">
                {contactInfo.map((info, index) => (
                  <div key={index} className="flex items-center">
                    <i className={`${info.icon} text-orange-400 text-xl w-8`}></i>
                    <div>
                      <p className="font-medium">{info.label}</p>
                      <p className="text-zinc-400">{info.value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div 
              className="bg-zinc-900 rounded-2xl p-8 border border-zinc-700"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <h3 className="text-2xl font-bold mb-6">Why Choose Us?</h3>
              <div className="space-y-4">
                {whyChooseUs.map((item, index) => (
                  <div key={index} className="flex items-start">
                    <i className={`${item.icon} text-orange-400 text-xl mt-1 mr-3`}></i>
                    <div>
                      <p className="font-medium">{item.title}</p>
                      <p className="text-zinc-400 text-sm">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
