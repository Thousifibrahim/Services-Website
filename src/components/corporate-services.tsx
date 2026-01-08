import { useRef, useState } from "react";
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from "framer-motion";
import { ArrowRight, BarChart3, Globe, Cloud, Bot, Code, Layers, Zap, Shield, ChevronRight, LayoutGrid, Cpu, Database } from "lucide-react";
import { cn } from "@/lib/utils";

// --- DATA ---
const categories = [
    { id: "all", label: "All Services" },
    { id: "engineering", label: "Engineering" },
    { id: "intelligence", label: "Data & AI" },
    { id: "design", label: "Product Design" },
];

const services = [
    {
        id: 1,
        title: "Enterprise Architecture",
        category: "engineering",
        description: "Future-proof scalable systems designed for high-availability and security.",
        icon: Globe,
        cols: "md:col-span-2",
        gradient: "from-blue-500/20 to-cyan-500/20"
    },
    {
        id: 2,
        title: "AI & ML Solutions",
        category: "intelligence",
        description: "Custom neural networks and predictive models that drive automation.",
        icon: Bot,
        cols: "md:col-span-1",
        gradient: "from-violet-500/20 to-purple-500/20"
    },
    {
        id: 3,
        title: "Cloud Infrastructure",
        category: "engineering",
        description: "Native cloud environments optimized for cost and performance.",
        icon: Cloud,
        cols: "md:col-span-1",
        gradient: "from-emerald-500/20 to-teal-500/20"
    },
    {
        id: 4,
        title: "Data Analytics",
        category: "intelligence",
        description: "Turning raw data lakes into actionable strategic intelligence.",
        icon: BarChart3,
        cols: "md:col-span-2",
        gradient: "from-orange-500/20 to-red-500/20"
    },
    {
        id: 5,
        title: "UI/UX Design",
        category: "design",
        description: "Human-centered design systems that scale across platforms.",
        icon: LayoutGrid,
        cols: "md:col-span-1",
        gradient: "from-pink-500/20 to-rose-500/20"
    },
    {
        id: 6,
        title: "Cybersecurity",
        category: "engineering",
        description: "Zero-trust architectures to protect your most valuable assets.",
        icon: Shield,
        cols: "md:col-span-1",
        gradient: "from-indigo-500/20 to-blue-500/20"
    }
];

// --- COMPONENTS ---

function Hero() {
    return (
        <section className="relative h-[80vh] flex flex-col justify-center px-6 md:px-20 overflow-hidden border-b border-white/10">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-900/20 via-black to-black" />

            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="relative z-10 max-w-4xl"
            >
                <div className="flex items-center gap-2 mb-6">
                    <div className="w-2 h-2 rounded-full bg-blue-500" />
                    <span className="text-blue-500 font-mono text-sm uppercase tracking-widest">Global Services</span>
                </div>
                <h1 className="text-6xl md:text-8xl font-bold tracking-tighter text-white mb-8 leading-[0.95]">
                    Engineering the <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-white/40">Unimagined.</span>
                </h1>
                <p className="text-xl text-white/50 max-w-xl leading-relaxed">
                    We partner with global leaders to build software, data, and design solutions that define industries.
                </p>
            </motion.div>

            {/* Abstract Decorative Grid */}
            <div className="absolute right-0 bottom-0 w-[40vw] h-[40vh] opacity-20 pointer-events-none">
                <div className="absolute inset-0 border-l border-t border-white/10" />
                <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.05)_50%,transparent_75%,transparent_100%)] bg-[size:20px_20px]" />
            </div>
        </section>
    );
}

function ServiceGrid() {
    const [activeCategory, setActiveCategory] = useState("all");

    // Filter services
    const filteredServices = activeCategory === "all"
        ? services
        : services.filter(s => s.category === activeCategory);

    return (
        <section className="py-24 px-6 md:px-20 bg-black min-h-screen">
            {/* Category Filter */}
            <div className="flex flex-wrap gap-4 mb-16 border-b border-white/10 pb-8">
                {categories.map((cat) => (
                    <button
                        key={cat.id}
                        onClick={() => setActiveCategory(cat.id)}
                        className={cn(
                            "px-6 py-2 rounded-full text-sm font-medium transition-all duration-300",
                            activeCategory === cat.id
                                ? "bg-white text-black"
                                : "bg-white/5 text-white/60 hover:bg-white/10 hover:text-white"
                        )}
                    >
                        {cat.label}
                    </button>
                ))}
            </div>

            {/* Bento Grid */}
            <motion.div
                layout
                className="grid grid-cols-1 md:grid-cols-3 gap-6"
            >
                <AnimatePresence mode="popLayout">
                    {filteredServices.map((service) => (
                        <motion.div
                            layout
                            key={service.id}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            transition={{ duration: 0.3 }}
                            className={cn(
                                "group relative min-h-[320px] p-8 rounded-3xl bg-[#0a0a0a] border border-white/10 overflow-hidden hover:border-white/20 transition-colors",
                                service.cols
                            )}
                        >
                            {/* Hover Gradient */}
                            <div className={cn(
                                "absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br",
                                service.gradient
                            )} />

                            <div className="relative z-10 flex flex-col h-full justify-between">
                                <div>
                                    <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center mb-6 border border-white/5 group-hover:scale-110 transition-transform duration-500">
                                        <service.icon className="w-6 h-6 text-white/80" />
                                    </div>
                                    <h3 className="text-2xl font-bold text-white mb-2">{service.title}</h3>
                                    <p className="text-white/50 leading-relaxed max-w-md">{service.description}</p>
                                </div>

                                <div className="flex items-center gap-2 text-sm font-medium text-white/40 group-hover:text-white transition-colors">
                                    <span>Explore</span>
                                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </motion.div>
        </section>
    );
}

function ImpactMetrics() {
    return (
        <section className="py-24 border-y border-white/5 bg-[#050505]">
            <div className="container mx-auto px-6 md:px-20">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-12">
                    <div className="text-center md:text-left">
                        <div className="text-4xl md:text-6xl font-bold text-white mb-2">98%</div>
                        <div className="text-white/40 text-sm uppercase tracking-widest">Client Retention</div>
                    </div>
                    <div className="text-center md:text-left">
                        <div className="text-4xl md:text-6xl font-bold text-white mb-2">50+</div>
                        <div className="text-white/40 text-sm uppercase tracking-widest">Enterprise Launches</div>
                    </div>
                    <div className="text-center md:text-left">
                        <div className="text-4xl md:text-6xl font-bold text-white mb-2">24/7</div>
                        <div className="text-white/40 text-sm uppercase tracking-widest">Global Support</div>
                    </div>
                    <div className="text-center md:text-left">
                        <div className="text-4xl md:text-6xl font-bold text-white mb-2">3.5x</div>
                        <div className="text-white/40 text-sm uppercase tracking-widest">ROI Average</div>
                    </div>
                </div>
            </div>
        </section>
    );
}

function CTA() {
    return (
        <section className="py-32 px-6 md:px-20 bg-black flex flex-col items-center text-center">
            <h2 className="text-4xl md:text-6xl font-bold text-white mb-8 max-w-3xl tracking-tight">
                Ready to transform your digital infrastructure?
            </h2>
            <div className="flex flex-col md:flex-row gap-4">
                <button className="px-8 py-4 bg-white text-black rounded-full font-bold hover:bg-white/90 transition-colors">
                    Start a Conversation
                </button>
                <button className="px-8 py-4 bg-transparent border border-white/20 text-white rounded-full font-bold hover:bg-white/5 transition-colors">
                    View Case Studies
                </button>
            </div>
        </section>
    );
}

export function CorporateServices() {
    return (
        <div className="bg-black text-white min-h-screen font-sans selection:bg-white/20">
            <Hero />
            <ServiceGrid />
            <ImpactMetrics />
            <CTA />
        </div>
    );
}
