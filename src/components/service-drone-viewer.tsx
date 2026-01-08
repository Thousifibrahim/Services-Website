import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, useSpring, useMotionTemplate } from "framer-motion";
import { BarChart3, Globe, Server, Users, Bot, Layout, Code, PieChart, Palette, Target, Scan, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

// Define the services data structure
const services = [
    {
        id: "data-analytics",
        title: "Data Analytics",
        tagline: "Turn chaos into clarity",
        description: "Transform raw data into actionable insights with our advanced analytics pipeline.",
        icon: BarChart3,
        color: "from-blue-500 to-cyan-500",
        x: 20, y: 20
    },
    {
        id: "visualization",
        title: "Visualization",
        tagline: "Stories told in pixels",
        description: "See the story behind your numbers with stunning, interactive data visualizations.",
        icon: PieChart,
        color: "from-purple-500 to-pink-500",
        x: 50, y: 20
    },
    {
        id: "enterprise-dev",
        title: "Enterprise Dev",
        tagline: "Built for scale",
        description: "Scalable, secure, and high-performance web solutions for large-scale organizations.",
        icon: Globe,
        color: "from-green-500 to-emerald-500",
        x: 80, y: 20
    },
    {
        id: "wordpress-design",
        title: "WordPress",
        tagline: "Beyond templates",
        description: "Custom WordPress themes and plugins that stand out from the crowd.",
        icon: Layout,
        color: "from-orange-500 to-amber-500",
        x: 80, y: 50
    },
    {
        id: "azure-architecting",
        title: "Azure Cloud",
        tagline: "Cloud without limits",
        description: "Cloud-native infrastructure designed for reliability and cost-efficiency on Azure.",
        icon: Server,
        color: "from-blue-600 to-indigo-600",
        x: 50, y: 50
    },
    {
        id: "lead-generation",
        title: "Lead Gen",
        tagline: "Quality over quantity",
        description: "Data-driven strategies to attract and convert high-quality leads for your business.",
        icon: Users,
        color: "from-red-500 to-rose-500",
        x: 20, y: 50
    },
    {
        id: "ai-automation",
        title: "AI Automation",
        tagline: "Intelligence at work",
        description: "Streamline operations and reduce costs with intelligent process automation.",
        icon: Bot,
        color: "from-violet-500 to-fuchsia-500",
        x: 20, y: 80
    },
    {
        id: "multi-tenant",
        title: "SaaS Platforms",
        tagline: "Next-gen Infrastructure",
        description: "Scalable multi-tenant architecture with autonomous agents.",
        icon: Code,
        color: "from-cyan-500 to-teal-500",
        x: 50, y: 80
    },
    {
        id: "graphic-designing",
        title: "Graphic Design",
        tagline: "Visual identity",
        description: "Visual storytelling that defines your brand identity and captivates your audience.",
        icon: Palette,
        color: "from-pink-500 to-rose-500",
        x: 80, y: 80
    }
];

export function ServiceDroneViewer() {
    const containerRef = useRef<HTMLDivElement>(null);
    const [activeService, setActiveService] = useState<number>(-1);

    // Total scroll height needs to be substantial to allow meaningful navigation
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    // Spring physics for smoother movement
    const smoothProgress = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    // Calculate Map Transforms
    // We want to center the viewport on the current target
    // Viewport Center = 50vw, 50vh
    // Map size = 300vw, 300vh (to accommodate our 0-100% logic comfortably)
    // If target is at 20% x, we need to shift map so 20% aligns with 50vw.
    // Equation: TranslateX = ViewportCenter - (TargetPercent * MapWidth)

    // Create interpolation arrays
    // 0% scroll = "High Altitude View" (Center of map, zoomed out)
    // 10% scroll = Target 1
    // 20% scroll = Target 2
    // ...

    const checkpoints = [0, ...services.map((_, i) => (i + 1) / services.length)];

    // X Coordinates: Start at center (50), then visit each service
    const xInput = [50, ...services.map(s => s.x)];
    const yInput = [50, ...services.map(s => s.y)];
    const scaleInput = [0.6, ...services.map(() => 2.5)]; // Start zoomed out, then zoom in to targets

    // We need to transform these "Percentage coordinates" into "CSS Translate percentages"
    // Assuming Map is 100% x 100% of its own container, which is 3x viewport.
    // Actually simpler: Let's assume Map is 100vw * 3, 100vh * 3.
    // If we want 20% (coordinate on map) to be in center of viewport:
    // Map moves so that point is at 50vw, 50vh.

    const mapX = useTransform(smoothProgress, checkpoints, xInput.map(x => `${50 - x}%`));
    const mapY = useTransform(smoothProgress, checkpoints, yInput.map(y => `${50 - y}%`));
    const mapScale = useTransform(smoothProgress, checkpoints, scaleInput);

    const bgOpacity = useTransform(smoothProgress, [0, 0.1], [0, 1]);
    const blurValue = useTransform(smoothProgress, checkpoints, scaleInput.map(s => s < 1 ? "4px" : "0px"));

    // Track active service based on progress
    useEffect(() => {
        const unsubscribe = smoothProgress.onChange(v => {
            // Determine which sector we are in
            // 0-0.1 is transition to 1.
            // We want to snap to the closest index.
            const index = Math.round(v * services.length) - 1;
            setActiveService(index);
        });
        return () => unsubscribe();
    }, [smoothProgress]);

    return (
        <div ref={containerRef} className="relative h-[800vh] bg-black">

            {/* Sticky Viewport "Cockpit" */}
            <div className="sticky top-0 h-screen w-full overflow-hidden perspective-1000">

                {/* The World Map */}
                <motion.div
                    className="absolute inset-0 w-full h-full origin-center will-change-transform"
                    style={{
                        x: mapX,
                        y: mapY,
                        scale: mapScale,
                        filter: useMotionTemplate`blur(${blurValue})`
                    }}
                >
                    {/* Grid Background - significantly larger than viewport */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300vw] h-[300vh] bg-[#050505]">
                        {/* Major Grid Lines */}
                        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:10%_10%]" />
                        {/* Minor Grid Lines */}
                        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:2%_2%]" />

                        {/* Service Nodes */}
                        {services.map((service, index) => (
                            <div
                                key={service.id}
                                className="absolute flex flex-col items-center justify-center -translate-x-1/2 -translate-y-1/2 transition-all duration-500"
                                style={{
                                    left: `${service.x}%`,
                                    top: `${service.y}%`,
                                    width: '20vw',
                                    height: '20vh'
                                }}
                            >
                                {/* Ping Effect */}
                                <div className={cn(
                                    "absolute inset-0 rounded-full border border-white/10 animate-ping opacity-20",
                                    activeService === index ? "border-green-500/50" : "hidden"
                                )} />

                                {/* Node Icon */}
                                <div className={cn(
                                    "relative w-24 h-24 rounded-full flex items-center justify-center transition-all duration-500 border border-white/10 bg-black/80 backdrop-blur-md",
                                    activeService === index ? `scale-125 border-${service.color.split('-')[1]}-500 shadow-[0_0_30px_rgba(255,255,255,0.1)]` : "opacity-50 scale-75 grayscale"
                                )}>
                                    <div className={cn("absolute inset-0 rounded-full bg-gradient-to-br opacity-20", service.color)} />
                                    <service.icon className={cn("w-10 h-10 text-white transition-all duration-300", activeService === index ? "scale-110" : "scale-100")} />
                                </div>

                                {/* Label (visible when zoomed out/nearby) */}
                                <div className={cn(
                                    "mt-6 text-center transition-all duration-300",
                                    activeService === index ? "opacity-0" : "opacity-100"
                                )}>
                                    <div className="text-4xl font-bold text-white/20 whitespace-nowrap">{service.title}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </motion.div>

                {/* HUD Overlay - The "Drone" Interface */}
                <div className="absolute inset-0 pointer-events-none z-50">
                    {/* Vignette */}
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_50%,rgba(0,0,0,0.8)_100%)]" />
                    {/* Scanlines */}
                    <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] z-[100] bg-[size:100%_2px,3px_100%] pointer-events-none opacity-20" />

                    {/* Crosshair */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 border border-white/10 rounded-full flex items-center justify-center opacity-40">
                        <div className="w-60 h-60 border border-white/5 rounded-full animate-[spin_10s_linear_infinite]" />
                        <Target className="w-8 h-8 text-green-400/80 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-80" />

                        {/* Targeting Brackets */}
                        <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-green-500/50" />
                        <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-green-500/50" />
                        <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-green-500/50" />
                        <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-green-500/50" />
                    </div>

                    {/* Info Panels */}
                    <motion.div
                        className="absolute bottom-12 left-12 w-96 bg-black/80 backdrop-blur-xl border border-white/10 p-6 border-l-4 border-l-green-500"
                        initial={{ opacity: 0, x: -50 }}
                        animate={activeService >= 0 ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
                    >
                        {activeService >= 0 && services[activeService] && (
                            <>
                                <div className="flex items-center gap-2 mb-2 text-green-400 text-xs font-mono uppercase tracking-widest">
                                    <Scan className="w-4 h-4" />
                                    Target Locked: SEC-{services[activeService].id.toUpperCase()}
                                </div>
                                <h2 className="text-3xl font-bold text-white mb-2">{services[activeService].title}</h2>
                                <p className="text-white/60 mb-4">{services[activeService].description}</p>

                                <div className="flex gap-4 text-xs font-mono text-white/30 border-t border-white/10 pt-4">
                                    <span>COORDS: {services[activeService].x}, {services[activeService].y}</span>
                                    <span>STATUS: ACTIVE</span>
                                </div>
                            </>
                        )}
                    </motion.div>

                    {/* Scroll Status */}
                    <div className="absolute right-12 bottom-12 text-right font-mono">
                        <div className="text-4xl font-bold text-white/80">
                            0{Math.max(activeService + 1, 0)}<span className="text-white/20">/0{services.length}</span>
                        </div>
                        <div className="text-green-500 text-xs mt-1">SYSTEM ONLINE</div>
                    </div>
                </div>
            </div>
        </div>
    );
}
