import { motion, AnimatePresence } from "framer-motion";
import { useState, useRef, useLayoutEffect, useMemo } from "react";
import { ArrowUpRight, X, ExternalLink, Trophy, Globe, ArrowRight } from "lucide-react";
import { useBusinessAnalytics } from "../hooks/useBusinessAnalytics";
import { FadeIn, TextReveal } from "@/components/ui/scroll-animation";
import { Link } from "wouter";

// --- DATA ---
const projects = [
  {
    id: 1,
    title: "Nebula Finance",
    category: "Fintech",
    image: "https://images.unsplash.com/photo-1642543492481-44e81e3914a7?q=80&w=2560&auto=format&fit=crop",
    description: "A decentralized trading platform handling $50M+ daily volume.",
    fullDescription: "Nebula Finance is a next-generation decentralized trading platform that combines cutting-edge blockchain technology with intuitive user experience. We designed and developed a complete trading ecosystem featuring real-time market data, advanced charting tools, and seamless wallet integration.",
    technologies: ["React", "Node.js", "Solidity", "Web3.js"],
    duration: "8 months",
    team: "12 specialists",
    results: ["300% User Growth", "99.99% Uptime", "ISO 27001 Certified"]
  },
  {
    id: 2,
    title: "Orbit Health",
    category: "Healthcare",
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=2560&auto=format&fit=crop",
    description: "AI diagnostic tools reducing patient wait times by 40%.",
    fullDescription: "Orbit Health revolutionizes medical diagnostics through AI-powered image analysis and predictive modeling. Our system helps healthcare professionals make faster, more accurate diagnoses while reducing workload and improving patient outcomes.",
    technologies: ["Python", "TensorFlow", "React", "FHIR"],
    duration: "14 months",
    team: "8 specialists",
    results: ["50+ Hospitals", "95% Accuracy", "HIPAA Compliant"]
  },
  {
    id: 3,
    title: "Stellar Fashion",
    category: "E-commerce",
    image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=2560&auto=format&fit=crop",
    description: "Immersive 3D shopping experience with virtual try-on.",
    fullDescription: "We created an immersive virtual shopping experience for Stellar Fashion, a luxury retailer. Using WebGL and 3D modeling, customers can view products from every angle, try virtual fittings, and experience the brand's story in an interactive environment.",
    technologies: ["Three.js", "Next.js", "Shopify", "AWS"],
    duration: "6 months",
    team: "6 specialists",
    results: ["180% Conversion", "4.5m Avg Session", "Vogue Featured"]
  },
  {
    id: 4,
    title: "Quantum Labs",
    category: "SaaS",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2560&auto=format&fit=crop",
    description: "Multi-tenant analytics platform processing 1B+ events.",
    fullDescription: "Quantum Labs is a comprehensive analytics platform built for enterprise scale. We designed a multi-tenant architecture that ensures data isolation while providing powerful cross-platform insights and automated reporting.",
    technologies: ["Kubernetes", "Go", "React", "Elasticsearch"],
    duration: "18 months",
    team: "15 specialists",
    results: ["500+ Enterprise Clients", "SOC 2 Type II", "Real-time Processing"]
  }
];

const filters = ["All", "Fintech", "Healthcare", "E-commerce", "SaaS"];

// --- COMPONENTS ---

// 1. PROJECT ROW COMPONENT
function ProjectRow({ project, index, onClick }: { project: any, index: number, onClick: () => void }) {
  const isEven = index % 2 === 0;

  return (
    <FadeIn delay={0.1}>
      <div
        onClick={onClick}
        className={`group flex flex-col md:flex-row items-center gap-8 md:gap-20 py-12 md:py-20 border-b border-white/5 cursor-pointer ${isEven ? "" : "md:flex-row-reverse"}`}
      >
        {/* Image Side */}
        <div className="w-full md:w-3/5 overflow-hidden rounded-3xl relative aspect-video">
          <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors z-10 duration-500" />
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
        </div>

        {/* Content Side */}
        <div className="w-full md:w-2/5 flex flex-col items-start text-left">
          <span className="text-blue-500 font-mono text-xs uppercase tracking-widest mb-4 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-blue-500" />
            {project.category}
          </span>
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-white/50 transition-all">
            {project.title}
          </h2>
          <p className="text-lg md:text-xl text-white/50 mb-8 leading-relaxed">
            {project.description}
          </p>

          <button className="flex items-center gap-2 text-white border-b border-white/20 pb-1 group-hover:border-white transition-colors">
            View Case Study
            <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
          </button>
        </div>
      </div>
    </FadeIn>
  );
}

// 2. STATS SECTION
function StatsBar() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-12 md:py-20 border-y border-white/10 my-20 bg-white/5 rounded-3xl px-8">
      {[
        { label: "Projects Delivered", value: "150+" },
        { label: "Client Retention", value: "98%" },
        { label: "Global Awards", value: "12" },
        { label: "Years Experience", value: "8+" }
      ].map((stat, i) => (
        <div key={i} className="text-center">
          <div className="text-3xl md:text-5xl font-bold text-white mb-2">{stat.value}</div>
          <div className="text-xs uppercase tracking-widest text-white/40">{stat.label}</div>
        </div>
      ))}
    </div>
  )
}

export default function Work() {
  const [selectedProject, setSelectedProject] = useState<typeof projects[0] | null>(null);
  const [activeFilter, setActiveFilter] = useState("All");
  const containerRef = useRef(null);
  useBusinessAnalytics();

  // Scroll Safety Check
  useLayoutEffect(() => {
    document.body.style.overflow = "auto";
    return () => { document.body.style.overflow = "auto" };
  }, []);

  const filteredProjects = useMemo(() => {
    if (activeFilter === "All") return projects;
    return projects.filter(p => p.category === activeFilter);
  }, [activeFilter]);

  return (
    <div ref={containerRef} className="min-h-screen bg-black pt-32 pb-20 px-4 md:px-12 selection:bg-blue-500/30">

      {/* Background Ambience */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-10%] right-[-10%] w-[800px] h-[800px] bg-blue-900/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] bg-purple-900/10 rounded-full blur-[120px]" />
      </div>

      <div className="container mx-auto max-w-7xl relative z-10">
        {/* Header */}
        <div className="mb-24 md:mb-32">
          <FadeIn>
            <h1 className="text-6xl md:text-[10rem] font-bold text-white tracking-tighter leading-[0.9] mb-8">
              SELECTED <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white/40 to-white/10">WORKS.</span>
            </h1>
          </FadeIn>
          <FadeIn delay={0.2}>
            <div className="flex flex-col md:flex-row gap-8 items-start md:items-center justify-between border-t border-white/10 pt-8">
              <p className="text-lg md:text-xl text-white/50 max-w-2xl leading-relaxed">
                We partner with forward-thinking enterprises to build software that defies expectations.
              </p>
              <div className="flex flex-wrap gap-2 md:gap-4">
                {filters.map(tag => (
                  <button
                    key={tag}
                    onClick={() => setActiveFilter(tag)}
                    className={`px-4 py-2 rounded-full border text-sm transition-all ${activeFilter === tag
                        ? "bg-white text-black border-white"
                        : "border-white/10 text-white/60 hover:bg-white hover:text-black"
                      }`}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          </FadeIn>
        </div>

        {/* Projects List - Alternating Layout */}
        <div className="flex flex-col min-h-[50vh]">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
              >
                <ProjectRow
                  project={project}
                  index={index}
                  onClick={() => setSelectedProject(project)}
                />
              </motion.div>
            ))}
          </AnimatePresence>

          {filteredProjects.length === 0 && (
            <div className="py-20 text-center text-white/40">
              No projects found for this category yet.
            </div>
          )}
        </div>

        {/* Stats */}
        <StatsBar />

        {/* CTA */}
        <div className="py-24 text-center">
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-8">Have a vision?</h2>
          <Link href="/contact">
            <button className="px-10 py-5 bg-white text-black rounded-full font-bold text-lg hover:scale-105 transition-transform shadow-[0_0_30px_rgba(255,255,255,0.2)]">
              Let's Build It
            </button>
          </Link>
        </div>

      </div>

      {/* Project Detail Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedProject(null)}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/95 backdrop-blur-xl"
            style={{ overflowY: "auto" }} // Ensure wrapper scrolls if needed
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-[#0f0f0f] border border-white/10 rounded-3xl max-w-6xl w-full max-h-[90vh] flex flex-col overflow-hidden shadow-2xl relative"
            >
              {/* Scrollable Container */}
              <div className="overflow-y-auto flex-1 custom-scrollbar">
                {/* Image Header */}
                <div className="relative h-[40vh] md:h-[50vh]">
                  <img
                    src={selectedProject.image}
                    alt={selectedProject.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0f0f0f] to-transparent" />
                  <button
                    onClick={() => setSelectedProject(null)}
                    className="absolute top-6 right-6 p-2 rounded-full bg-black/50 hover:bg-white text-white hover:text-black transition-all border border-white/10"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>

                {/* Content */}
                <div className="p-8 md:p-16">
                  <div className="flex flex-col md:flex-row gap-12">
                    <div className="flex-1">
                      <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">{selectedProject.title}</h2>
                      <p className="text-lg text-white/60 leading-relaxed mb-8">{selectedProject.fullDescription}</p>

                      <div className="grid grid-cols-2 gap-6 mb-8">
                        <div className="p-4 bg-white/5 rounded-xl border border-white/5">
                          <Trophy className="w-6 h-6 text-yellow-500 mb-2" />
                          <div className="text-2xl font-bold text-white mb-1">{selectedProject.results[0]}</div>
                          <div className="text-xs text-white/40 uppercase">Key Result</div>
                        </div>
                        <div className="p-4 bg-white/5 rounded-xl border border-white/5">
                          <Globe className="w-6 h-6 text-blue-500 mb-2" />
                          <div className="text-2xl font-bold text-white mb-1">{selectedProject.team}</div>
                          <div className="text-xs text-white/40 uppercase">Expert Team</div>
                        </div>
                      </div>
                    </div>

                    <div className="w-full md:w-80 shrink-0 space-y-8">
                      <div>
                        <h3 className="text-xs font-bold text-white/40 uppercase tracking-widest mb-4">Tech Stack</h3>
                        <div className="flex flex-wrap gap-2">
                          {selectedProject.technologies.map(tech => (
                            <span key={tech} className="px-3 py-1 rounded-md bg-white/10 text-white/80 text-sm">{tech}</span>
                          ))}
                        </div>
                      </div>
                      <button className="w-full py-4 bg-white text-black font-bold rounded-xl hover:bg-gray-200 transition-colors">
                        Visit Live Site
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}