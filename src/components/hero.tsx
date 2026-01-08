import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { useBusinessAnalytics } from "../hooks/useBusinessAnalytics";
import { TextReveal, FadeIn } from "./ui/scroll-animation";

export function Hero() {
  const ref = useRef(null);
  const { trackConsultationClick, trackOurWorkClick } = useBusinessAnalytics();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <section ref={ref} className="relative min-h-[60vh] flex flex-col items-center justify-center overflow-hidden pt-40 pb-20">
      {/* Background Elements */}
      <motion.div
        style={{ y, opacity }}
        className="absolute inset-0 z-0 bg-gradient-to-br from-purple-900/10 via-blue-900/10 to-black"
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white/5 via-transparent to-transparent opacity-50 blur-3xl" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/0 via-black/50 to-background z-10" />
      </motion.div>

      <div className="relative z-10 container mx-auto px-4 text-center">
        <FadeIn delay={0.2} direction="down">
          <span className="inline-block px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs tracking-widest uppercase text-white/60 mb-8 backdrop-blur-sm hover:bg-white/10 transition-colors cursor-default">
            The New Standard
          </span>
        </FadeIn>

        <div className="mb-4">
          <h1 className="text-6xl md:text-8xl lg:text-9xl font-bold tracking-tighter text-white">
            <TextReveal text="A universe" className="block" delay={0.2} />
            <TextReveal text="of ideas." delay={0.8} />
          </h1>
        </div>

        <FadeIn delay={1.2}>
          <p className="text-lg md:text-xl text-white/40 max-w-xl mx-auto mb-8 leading-relaxed">
            Curate your inspiration. <br />
            Transform Ideas into Strategy. Drive Measurable Impact.
          </p>
        </FadeIn>

        <FadeIn delay={1.4}>
          <div className="flex flex-col sm:flex-row gap-8 justify-center items-center mb-8 text-white/60">
            <div className="text-center group">
              <div className="text-3xl font-bold text-white mb-1 group-hover:text-white/80 transition-colors">2+</div>
              <div className="text-sm">Projects Delivered</div>
            </div>
            <div className="hidden sm:block w-px h-8 bg-white/20" />
            <div className="text-center group">
              <div className="text-3xl font-bold text-white mb-1 group-hover:text-white/80 transition-colors">5+</div>
              <div className="text-sm">Enterprise Clients</div>
            </div>
          </div>
        </FadeIn>

        <FadeIn delay={1.6}>
          <div className="flex gap-4 justify-center">
            <a
              href="https://meet.google.com/nnu-zudq-vfq"
              target="_blank"
              rel="noopener noreferrer"
              onClick={trackConsultationClick}
              className="group relative px-8 py-4 rounded-full bg-white text-black font-medium text-lg overflow-hidden transition-all hover:scale-105 inline-block"
            >
              <span className="relative z-10">Consult Us</span>
              <div className="absolute inset-0 bg-gradient-to-r from-gray-100 to-white opacity-0 group-hover:opacity-100 transition-opacity" />
            </a>
            <a
              href="/work"
              onClick={trackOurWorkClick}
              className="px-8 py-4 rounded-full bg-white/5 border border-white/10 text-white font-medium text-lg hover:bg-white/10 transition-all backdrop-blur-sm inline-block hover:scale-105"
            >
              Our Work
            </a>
          </div>
        </FadeIn>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0, height: 0 }}
        animate={{ opacity: 1, height: 64 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 w-[1px] bg-gradient-to-b from-transparent via-white/20 to-transparent"
      />
    </section>
  );
}