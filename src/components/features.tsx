import { motion } from "framer-motion";
import { Zap, Layers, Sparkles, Command } from "lucide-react";

const features = [
  {
    title: "Visual Organization",
    description: "Break free from linear lists. Organize your thoughts in a spatial canvas that breathes.",
    icon: Layers,
    colSpan: "col-span-1 md:col-span-2",
    delay: 0.1
  },
  {
    title: "Instant Capture",
    description: "Save anything from the web with a single keystroke.",
    icon: Zap,
    colSpan: "col-span-1",
    delay: 0.2
  },
  {
    title: "Universal Search",
    description: "Find anything, anywhere, instantly.",
    icon: Command,
    colSpan: "col-span-1",
    delay: 0.3
  },
  {
    title: "AI Synthesis",
    description: "Let our intelligence engine connect the dots between your saved items.",
    icon: Sparkles,
    colSpan: "col-span-1 md:col-span-2",
    delay: 0.4
  },
];

export function Features() {
  return (
    <section className="py-32 px-4 relative z-10">
      <div className="container mx-auto max-w-6xl">
        <div className="mb-24">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-bold text-white mb-6 tracking-tight"
          >
            Designed for <br />
            <span className="text-white/40">the speed of thought.</span>
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: feature.delay }}
              whileHover={{ scale: 1.02 }}
              className={`${feature.colSpan} group relative p-8 rounded-3xl bg-white/[0.03] border border-white/10 hover:bg-white/[0.05] transition-colors overflow-hidden`}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-white/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div className="relative z-10 h-full flex flex-col justify-between min-h-[240px]">
                <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center mb-8 border border-white/5 group-hover:scale-110 transition-transform duration-500">
                  <feature.icon className="w-6 h-6 text-white/80" />
                </div>
                
                <div>
                  <h3 className="text-xl font-semibold text-white mb-3">{feature.title}</h3>
                  <p className="text-white/40 leading-relaxed">{feature.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}