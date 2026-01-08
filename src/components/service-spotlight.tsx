import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from "framer-motion";
import { BarChart3, Globe, Server, Users, Bot, Layout, Code, PieChart, Palette, ArrowRight, ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

const services = [
    {
        id: "data",
        title: "Data Analytics",
        category: "Intelligence",
        description: "Turn chaos into clarity. We transform raw data streams into actionable strategic insights using advanced pipeline architecture.",
        stats: ["99% Accuracy", "Real-time Processing"],
        icon: BarChart3,
        color: "from-blue-500 to-cyan-500",
        bg: "bg-blue-950/20"
    },
    {
        id: "viz",
        title: "Visualization",
        category: "Design",
        description: "Stories told in pixels. Interactive, immersive dashboards that make complex datasets instantly understandable and beautiful.",
        stats: ["Interactive 3D", "Custom Shaders"],
        icon: PieChart,
        color: "from-purple-500 to-pink-500",
        bg: "bg-purple-950/20"
    },
    {
        id: "dev",
        title: "Enterprise Dev",
        category: "Engineering",
        description: "Built for scale. Robust, secure, and fault-tolerant web architectures designed for Fortune 500 requirements.",
        stats: ["99.99% Uptime", "Microservices"],
        icon: Globe,
        color: "from-emerald-500 to-green-500",
        bg: "bg-emerald-950/20"
    },
    {
        id: "cloud",
        title: "Cloud Arch",
        category: "Infrastructure",
        description: "Cloud without limits. Native Azure architectures that optimize for cost, security, and infinite scalability.",
        stats: ["Serverless", "Auto-scaling"],
        icon: Server,
        color: "from-blue-600 to-indigo-600",
        bg: "bg-indigo-950/20"
    },
    {
        id: "ai",
        title: "AI Automation",
        category: "Future Tech",
        description: "Intelligence at work. Deploy autonomous agents and ML models to handle repetitive complex workflows.",
        stats: ["LLM Integration", "Autonomous Agents"],
        icon: Bot,
        color: "from-violet-500 to-fuchsia-500",
        bg: "bg-violet-950/20"
    }
];

export function ServiceSpotlight() {
    const containerRef = useRef<HTMLDivElement>(null);
    const [activeService, setActiveService] = useState(0);

    // Background color transition based on active service
    const activeColor = services[activeService].color.split(" ")[1].replace("to-", "bg-");

    return (
        <div className="relative min-h-screen bg-black text-white selection:bg-white/20">

            {/* Ambient Background */}
            <div className="fixed inset-0 z-0 transition-colors duration-1000 ease-in-out">
                <div className={cn("absolute inset-0 opacity-20 blur-[120px] transition-colors duration-1000", services[activeService].bg)} />
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150 mix-blend-overlay" />
            </div>

            <div className="relative z-10 flex flex-col md:flex-row">

                {/* Left Column - Scrollable Content */}
                <div className="w-full md:w-1/2 px-6 md:px-20 py-20 md:py-32 flex flex-col gap-32 md:gap-[40vh]">

                    {/* Intro */}
                    <div className="min-h-[50vh] flex flex-col justify-center">
                        <span className="font-mono text-sm text-white/40 uppercase tracking-widest mb-4">Our Expertise</span>
                        <h1 className="text-6xl md:text-8xl font-bold tracking-tighter mb-8 leading-[0.9]">
                            We Build <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-white/40">The Future.</span>
                        </h1>
                        <p className="text-xl text-white/50 max-w-md leading-relaxed">
                            Navigating the intersection of design, data, and engineering to deliver digital masterpieces.
                        </p>
                    </div>

                    {/* Service Items */}
                    {services.map((service, index) => (
                        <ServiceItem
                            key={service.id}
                            service={service}
                            index={index}
                            setActiveService={setActiveService}
                        />
                    ))}

                    {/* Outro */}
                    <div className="min-h-[30vh] flex flex-col justify-center">
                        <h2 className="text-4xl font-bold mb-6">Ready to start?</h2>
                        <button className="group relative w-fit flex items-center gap-4 px-8 py-4 bg-white text-black rounded-full font-bold text-lg hover:bg-white/90 transition-all">
                            Start a Project
                            <ArrowUpRight className="w-5 h-5 transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" />
                        </button>
                    </div>
                </div>

                {/* Right Column - Sticky Visuals */}
                <div className="hidden md:flex w-1/2 h-screen sticky top-0 items-center justify-center p-12 lg:p-24">
                    <div className="relative w-full aspect-square max-w-[600px] bg-white/5 rounded-[40px] border border-white/10 overflow-hidden backdrop-blur-md shadow-2xl">
                        <AnimatePresence mode="popLayout">
                            <motion.div
                                key={services[activeService].id}
                                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 1.1, filter: "blur(10px)" }}
                                transition={{ duration: 0.5, ease: "easeOut" }}
                                className="absolute inset-0 flex flex-col items-center justify-center p-12"
                            >
                                {/* Dynamic Icon Background */}
                                <div className={cn(
                                    "absolute top-0 right-0 w-[500px] h-[500px] rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2 opacity-40 bg-gradient-to-br",
                                    services[activeService].color
                                )} />

                                {/* Icon */}
                                <div className={cn(
                                    "relative w-32 h-32 rounded-3xl mb-12 flex items-center justify-center bg-gradient-to-br shadow-2xl skew-y-3",
                                    services[activeService].color
                                )}>
                                    {(() => {
                                        const Icon = services[activeService].icon;
                                        return <Icon className="w-16 h-16 text-white" />
                                    })()}
                                    <div className="absolute inset-0 border-white/20 border rounded-3xl" />
                                </div>

                                {/* Visual Stats Grid */}
                                <div className="grid grid-cols-2 gap-4 w-full relative z-10">
                                    {services[activeService].stats.map((stat, i) => (
                                        <div key={i} className="bg-white/5 border border-white/10 p-6 rounded-2xl backdrop-blur-sm">
                                            <div className="w-2 h-2 rounded-full bg-white mb-4" />
                                            <span className="font-mono text-sm text-white/80">{stat}</span>
                                        </div>
                                    ))}
                                </div>
                            </motion.div>
                        </AnimatePresence>

                        {/* Glass Overlay/Reflection for realism */}
                        <div className="absolute inset-0 bg-gradient-to-tr from-white/5 to-transparent pointer-events-none" />
                    </div>
                </div>
            </div>
        </div>
    );
}

function ServiceItem({ service, index, setActiveService }: { service: any, index: number, setActiveService: (i: number) => void }) {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start center", "end center"]
    });

    // When this item is in the center of the viewport, set it as active
    useEffect(() => {
        const unsubscribe = scrollYProgress.onChange(v => {
            if (v > 0 && v < 1) {
                setActiveService(index);
            }
        });
        return () => unsubscribe();
    }, [scrollYProgress, index, setActiveService]);

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0.2 }}
            whileInView={{ opacity: 1 }}
            viewport={{ margin: "-20% 0px -20% 0px" }}
            className="flex flex-col justify-center min-h-[50vh] max-w-lg"
        >
            <div className="flex items-center gap-4 mb-6">
                <span className="font-mono text-xs text-white/40 px-3 py-1 rounded-full border border-white/10">0{index + 1}</span>
                <span className={cn("font-mono text-xs tracking-widest uppercase bg-gradient-to-r bg-clip-text text-transparent", service.color)}>
                    {service.category}
                </span>
            </div>
            <h3 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight">{service.title}</h3>
            <p className="text-lg text-white/60 leading-relaxed font-light">{service.description}</p>

            <div className="mt-8 flex items-center gap-2 text-white/40 group-hover:text-white transition-colors cursor-pointer w-fit">
                <span className="text-sm border-b border-transparent group-hover:border-white transition-all">Explore Service</span>
                <ArrowRight className="w-4 h-4" />
            </div>
        </motion.div>
    );
}
