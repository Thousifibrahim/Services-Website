import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { Bot, X, ArrowRight, BarChart3, Globe, Cloud, Cpu, Layers, Scan } from "lucide-react";
import { cn } from "@/lib/utils";

// --- DATA ---
const services = [
    {
        id: "analytics",
        title: "Data Analytics",
        subtitle: "Intelligence Refined",
        description: "We process millions of data points to extract clear, actionable business intelligence.",
        features: ["Real-time Dashboards", "Predictive Modeling", "Big Data Pipelines"],
        icon: BarChart3,
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=1000",
        color: "text-blue-400",
        border: "border-blue-500/50"
    },
    {
        id: "enterprise",
        title: "Enterprise Systems",
        subtitle: "Scale Without Limits",
        description: "Robust, secure, and scalable architectures designed for mission-critical operations.",
        features: ["Microservices", "High Availability", "Bank-grade Security"],
        icon: Globe,
        image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=1000",
        color: "text-emerald-400",
        border: "border-emerald-500/50"
    },
    {
        id: "cloud",
        title: "Cloud Infrastructure",
        subtitle: "Native Performance",
        description: "Next-generation cloud solutions that optimize cost and specific performance metrics.",
        features: ["Serverless", "Multi-region", "Auto-scaling"],
        icon: Cloud,
        image: "https://images.unsplash.com/photo-1544197150-b99a580bb7f8?auto=format&fit=crop&q=80&w=1000",
        color: "text-indigo-400",
        border: "border-indigo-500/50"
    },
    {
        id: "ai",
        title: "AI Automation",
        subtitle: "Autonomous Future",
        description: "Self-learning agents that handle complex workflows independently.",
        features: ["NLP", "Computer Vision", "Autonomous Agents"],
        icon: Cpu,
        image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&q=80&w=1000",
        color: "text-violet-400",
        border: "border-violet-500/50"
    }
];

// --- ROBOT COMPONENT ---
function ScrollRobot({ show }: { show: boolean }) {
    return (
        <AnimatePresence>
            {show && (
                <motion.div
                    initial={{ y: -200, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -500, opacity: 0, scale: 0.5 }}
                    transition={{ duration: 1.5, ease: "circOut" }}
                    className="fixed top-[20%] left-1/2 -translate-x-1/2 z-50 pointer-events-none"
                >
                    <div className="relative">
                        {/* Robot Body */}
                        <div className="w-32 h-32 bg-black/80 backdrop-blur-xl border border-white/20 rounded-full flex items-center justify-center shadow-[0_0_50px_rgba(255,255,255,0.1)] relative">
                            <Bot className="w-16 h-16 text-white" />
                            {/* Scanning Eye */}
                            <motion.div
                                className="absolute top-1/2 left-0 w-full h-[2px] bg-red-500/50 box-shadow-[0_0_10px_red]"
                                animate={{ top: ["30%", "70%", "30%"] }}
                                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                            />
                        </div>

                        {/* Holographic Projection */}
                        <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 200, opacity: 1 }}
                            transition={{ delay: 1, duration: 1 }}
                            className="absolute top-full left-1/2 -translate-x-1/2 w-[1px] bg-gradient-to-b from-white/50 to-transparent"
                        />
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 1.5 }}
                            className="absolute top-[240px] left-1/2 -translate-x-1/2 whitespace-nowrap font-mono text-xs text-white/50 bg-black/50 px-3 py-1 rounded"
                        >
                            INITIALIZING SERVICES...
                        </motion.div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}

// --- MAIN PAGE ---
export function RobotServices() {
    const [introComplete, setIntroComplete] = useState(false);
    const [activeService, setActiveService] = useState<typeof services[0] | null>(null);
    const containerRef = useRef(null);

    // Intro Sequence
    useEffect(() => {
        const timer = setTimeout(() => {
            setIntroComplete(true);
        }, 3000); // 3 seconds total intro (2s robot entry + 1s scan)
        return () => clearTimeout(timer);
    }, []);

    // Scroll Logic for Service Switching
    const { scrollYProgress } = useScroll({ container: containerRef });

    return (
        <div className="fixed inset-0 bg-black text-white overflow-hidden font-sans">
            {/* 1. INTRO ROBOT */}
            <ScrollRobot show={!introComplete} />

            {/* 2. SCROLLABLE CONTAINER (Unlocks after intro) */}
            <motion.div
                ref={containerRef}
                className={cn(
                    "h-full w-full overflow-y-auto snap-y snap-mandatory scroll-smooth",
                    !introComplete ? "overflow-hidden pointer-events-none" : ""
                )}
                initial={{ opacity: 0 }}
                animate={{ opacity: introComplete ? 1 : 0 }}
                transition={{ duration: 1 }}
            >
                {services.map((service) => (
                    <ServiceSection
                        key={service.id}
                        service={service}
                        setActiveService={setActiveService}
                    />
                ))}

                {/* Spacer for final alignment */}
                <div className="h-[50vh]" />
            </motion.div>

            {/* 3. BOTTOM SHEET DETAIL VIEW */}
            <AnimatePresence>
                {activeService && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-end justify-center pointer-events-none" // Overlay container
                    >
                        {/* Backdrop with blur */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setActiveService(null)}
                            className="absolute inset-0 bg-black/60 backdrop-blur-sm pointer-events-auto"
                        />

                        {/* The "Faded Border" Layout Panel */}
                        <motion.div
                            layoutId={`sheet-${activeService.id}`}
                            initial={{ y: "100%" }}
                            animate={{ y: 0 }}
                            exit={{ y: "100%" }}
                            transition={{ type: "spring", damping: 25, stiffness: 200 }}
                            className="relative w-full max-w-5xl h-[85vh] bg-[#0a0a0a] rounded-t-[40px] overflow-hidden pointer-events-auto border-t border-l border-r border-white/10 shadow-2xl"
                        >
                            {/* Faded Border Glow Effect */}
                            <div className={cn("absolute inset-0 pointer-events-none opacity-20 bg-gradient-to-t from-transparent via-transparent to-white/20", activeService.border)} />

                            {/* Close Button */}
                            <button
                                onClick={() => setActiveService(null)}
                                className="absolute top-6 right-6 z-20 w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
                            >
                                <X className="w-5 h-5" />
                            </button>

                            {/* Content Layout */}
                            <div className="flex flex-col md:flex-row h-full">
                                {/* Image Side */}
                                <div className="w-full md:w-1/2 h-[30vh] md:h-full relative overflow-hidden">
                                    <div className="absolute inset-0 bg-gradient-to-b md:bg-gradient-to-r from-transparent to-[#0a0a0a] z-10" />
                                    <img
                                        src={activeService.image}
                                        alt={activeService.title}
                                        className="w-full h-full object-cover"
                                    />
                                </div>

                                {/* Info Side */}
                                <div className="w-full md:w-1/2 p-8 md:p-16 flex flex-col justify-center relative z-20">
                                    <div className={cn("inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/5 w-fit mb-6 text-sm font-mono", activeService.color)}>
                                        <activeService.icon className="w-4 h-4" />
                                        <span>{activeService.subtitle}</span>
                                    </div>

                                    <h2 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">{activeService.title}</h2>
                                    <p className="text-xl text-white/50 mb-10 leading-relaxed font-light">{activeService.description}</p>

                                    <div className="space-y-4 mb-10">
                                        {activeService.features.map((feature, i) => (
                                            <div key={i} className="flex items-center gap-4">
                                                <div className={cn("w-1.5 h-1.5 rounded-full", activeService.color.replace('text-', 'bg-'))} />
                                                <span className="text-lg text-white/80">{feature}</span>
                                            </div>
                                        ))}
                                    </div>

                                    <button className="group flex items-center gap-4 px-8 py-4 bg-white text-black rounded-full text-lg font-bold w-fit hover:bg-gray-200 transition-colors">
                                        Start Project
                                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

// Single Service Scroll Section
function ServiceSection({ service, setActiveService }: { service: typeof services[0], setActiveService: (s: any) => void }) {
    return (
        <section className="h-screen w-full flex items-center justify-center snap-center relative">
            <motion.div
                initial={{ opacity: 0, scale: 0.9, filter: "blur(10px)" }}
                whileInView={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                exit={{ opacity: 0, scale: 0.9, filter: "blur(10px)" }}
                transition={{ duration: 0.8 }}
                className="relative group cursor-pointer"
                onClick={() => setActiveService(service)}
            >
                {/* Central Focus Card */}
                <div className="relative w-[80vw] max-w-[500px] aspect-[4/3] rounded-[30px] border border-white/10 bg-black/40 backdrop-blur-md overflow-hidden transition-all duration-500 hover:border-white/30 hover:shadow-[0_0_50px_rgba(255,255,255,0.1)]">

                    {/* Background Glow */}
                    <div className={cn("absolute inset-0 opacity-20 bg-gradient-to-br transition-opacity duration-500 group-hover:opacity-40", service.color.replace('text-', 'from-').replace('400', '500') + " to-transparent")} />

                    {/* Content */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center">
                        <motion.div
                            layoutId={`icon-${service.id}`}
                            className={cn("w-20 h-20 rounded-2xl bg-white/5 flex items-center justify-center mb-6 border border-white/10 group-hover:scale-110 transition-transform", service.color)}
                        >
                            <service.icon className="w-10 h-10" />
                        </motion.div>

                        <h2 className="text-4xl md:text-6xl font-bold mb-4 tracking-tighter">{service.title}</h2>
                        <p className="text-white/40 font-mono text-sm uppercase tracking-widest group-hover:text-white/70 transition-colors">
                            Click to Expand
                        </p>
                    </div>

                    {/* Scan effect on hover */}
                    <div className="absolute top-0 left-0 w-full h-[2px] bg-white/50 opacity-0 group-hover:opacity-100 group-hover:animate-scan-fast" />
                </div>
            </motion.div>
        </section>
    );
}
