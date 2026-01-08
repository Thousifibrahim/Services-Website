import { useRef, useState, useMemo } from "react";
import { motion, useScroll, useTransform, useSpring, useMotionTemplate, MotionValue } from "framer-motion";
import { BarChart3, Globe, Server, Users, Bot, Layout, Code, PieChart, Palette, ArrowRight, Scan, Target } from "lucide-react";
import { cn } from "@/lib/utils";

const services = [
    {
        id: "data-analytics",
        title: "Data Analytics",
        description: "Transform raw data into actionable insights with our advanced analytics pipeline.",
        icon: BarChart3,
        color: "from-cyan-500 to-blue-500",
    },
    {
        id: "visualization",
        title: "Visualization",
        description: "Stories told in pixels. See the story behind your numbers.",
        icon: PieChart,
        color: "from-purple-500 to-pink-500",
    },
    {
        id: "enterprise-dev",
        title: "Enterprise Dev",
        description: "Scalable, secure, and high-performance web solutions for large scale.",
        icon: Globe,
        color: "from-emerald-500 to-green-500",
    },
    {
        id: "wordpress-design",
        title: "WordPress",
        description: "Custom themes and plugins that stand out from the crowd.",
        icon: Layout,
        color: "from-orange-500 to-amber-500",
    },
    {
        id: "azure-architecting",
        title: "Cloud Arch",
        description: "Cloud-native infrastructure designed for reliability on Azure.",
        icon: Server,
        color: "from-blue-600 to-indigo-600",
    },
    {
        id: "lead-generation",
        title: "Growth",
        description: "Data-driven strategies to attract and convert high-quality leads.",
        icon: Users,
        color: "from-red-500 to-rose-500",
    },
    {
        id: "ai-automation",
        title: "AI & Bot",
        description: "Streamline operations with intelligent process automation.",
        icon: Bot,
        color: "from-violet-500 to-fuchsia-500",
    },
    {
        id: "multi-tenant",
        title: "SaaS Core",
        description: "Next-gen SaaS platforms with isolated environments.",
        icon: Code,
        color: "from-teal-400 to-cyan-400",
    },
    {
        id: "graphic-designing",
        title: "Creative",
        description: "Visual storytelling that defines your brand identity.",
        icon: Palette,
        color: "from-pink-500 to-rose-500",
    }
];

// 3D Card Component
function ServiceCard({ service, index, zPosition, activeIndex }: { service: typeof services[0], index: number, zPosition: MotionValue<number>, activeIndex: number }) {
    // Calculate relative distance for opacity and scale
    // We want the card to be visible when it is within a certain range of the camera (Z=0)
    // The card's world Z is index * -1000.
    // The camera's world Z is zPosition.
    // Relative Z = CardFreeZ + CameraZ

    const SPACING = 1500;
    const initialZ = index * -SPACING;

    // Transform the global scroll progress (z position) into this card's local z relative to viewport
    const z = useTransform(zPosition, (latest) => {
        return initialZ + latest;
    });

    const opacity = useTransform(z, [-2000, -500, 0, 500], [0, 1, 1, 0]);
    const scale = useTransform(z, [-2000, 0], [0.5, 1.2]);
    const rotateX = useTransform(z, [-2000, -1000, 0], [45, 20, 0]);
    const liftY = useTransform(z, [-2000, 0], [-200, 0]); // Fly up from bottom

    // Combine centering (-50%) with the lift animation
    const compositeY = useTransform(liftY, (latest) => `calc(-50% + ${latest}px)`);

    const isLocked = activeIndex === index;

    return (
        <motion.div
            style={{
                z,
                opacity,
                scale,
                rotateX,
                y: compositeY,
                x: "-50%", // Center horizontally
                position: 'absolute',
                top: '50%',
                left: '50%',
            }}
            className={cn(
                "w-[80vw] max-w-[600px] h-[60vh] max-h-[500px] p-[2px] rounded-3xl overflow-hidden backface-hidden will-change-transform",
                "bg-gradient-to-br from-white/10 to-white/0 backdrop-blur-md border border-white/10",
                isLocked ? "shadow-[0_0_100px_rgba(0,255,100,0.2)] border-green-500/30" : "shadow-none"
            )}
        >
            <div className="relative w-full h-full bg-black/80 rounded-[22px] overflow-hidden flex flex-col items-center justify-center p-8 text-center group">

                {/* Holographic Grid Background inside card */}
                <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:40px_40px] opacity-50" />

                {/* Glowing Core */}
                <div className={cn(
                    "relative w-32 h-32 rounded-full mb-8 flex items-center justify-center transition-all duration-700",
                    "bg-gradient-to-br opacity-80 blur-xl",
                    service.color
                )} />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-32 w-32 h-32 flex items-center justify-center z-10">
                    <service.icon className="w-16 h-16 text-white drop-shadow-[0_0_10px_rgba(0,0,0,0.5)]" />
                </div>

                <h3 className="text-4xl font-bold text-white mb-4 relative z-10 tracking-tight">{service.title}</h3>
                <p className="text-lg text-white/60 mb-8 max-w-sm relative z-10 leading-relaxed">{service.description}</p>

                {/* Tech Decor */}
                <div className="absolute top-6 left-6 w-2 h-2 bg-white/20 rounded-full" />
                <div className="absolute top-6 right-6 w-2 h-2 bg-white/20 rounded-full" />
                <div className="absolute bottom-6 left-6 text-[10px] font-mono text-white/20">ID: {service.id.toUpperCase()}</div>
                <div className="absolute bottom-6 right-6 text-[10px] font-mono text-white/20">SYS.VER.2.0</div>

                {/* Animated Borders */}
                {isLocked && (
                    <>
                        <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-green-500 to-transparent animate-scan-fast" />
                        <div className="absolute bottom-0 right-0 w-full h-[1px] bg-gradient-to-r from-transparent via-green-500 to-transparent animate-scan-fast delay-75" />
                    </>
                )}
            </div>
        </motion.div>
    );
}

// Background Tunnel Particles (Placeholder for future expansion)
function ParticleTunnel({ speed }: { speed: MotionValue<number> }) {
    return null;
}

export function ServiceCorridor() {
    const containerRef = useRef<HTMLDivElement>(null);
    const scrollRef = useRef<HTMLDivElement>(null);
    const [activeIndex, setActiveIndex] = useState(0);

    // Scroll Progress
    const { scrollY } = useScroll({
        target: scrollRef,
        offset: ["start start", "end end"]
    });

    // Smooth scroll data
    const smoothY = useSpring(scrollY, {
        stiffness: 60,
        damping: 20,
        mass: 0.5
    });

    // Map scroll pixels to Z-depth
    // 1 pixel scroll = 2 pixels depth
    const depthZ = useTransform(smoothY, res => res * 2.5);

    // Determine active card
    const SPACING = 1500;
    // Listen to depth changes to update active index for HUD
    depthZ.onChange((latest) => {
        const index = Math.round(latest / SPACING);
        if (index >= 0 && index < services.length && index !== activeIndex) {
            setActiveIndex(index);
        }
    });

    return (
        <div className="relative bg-[#030303]" ref={scrollRef} style={{ height: `${services.length * 800 + 2000}px` }}> {/* Added extra height for cleaner exit */}

            {/* Fixed Viewport */}
            <div className="sticky top-0 h-screen w-full overflow-hidden perspective-1000">

                {/* Dynamic Background */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,#111_0%,black_100%)] z-0" />

                {/* Speed Lines / Starfield */}
                <div className="absolute inset-0 overflow-hidden z-0 opacity-30">
                    <div className="absolute top-1/2 left-1/2 w-[200vw] h-[200vh] -translate-x-1/2 -translate-y-1/2 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay animate-spin-slow" />
                </div>

                {/* 3D Scene Container */}
                <div
                    className="relative w-full h-full preserve-3d"
                    style={{
                        perspective: '1000px',
                        transformStyle: 'preserve-3d'
                    }}
                >
                    {services.map((service, index) => (
                        <ServiceCard
                            key={service.id}
                            service={service}
                            index={index}
                            zPosition={depthZ}
                            activeIndex={activeIndex}
                        />
                    ))}
                </div>

                {/* HUD - Foreground UI */}
                <div className="absolute inset-0 pointer-events-none z-50 flex flex-col justify-between p-8 md:p-12">
                    {/* Top Bar */}
                    <div className="flex justify-between items-start">
                        <div className="flex flex-col gap-1">
                            <div className="flex items-center gap-2 text-green-500/80">
                                <Scan className="w-5 h-5 animate-pulse" />
                                <span className="font-mono text-xs tracking-[0.2em] uppercase">System Armed</span>
                            </div>
                            <div className="h-0.5 w-32 bg-green-500/30" />
                        </div>

                        <div className="text-right">
                            <div className="font-mono text-4xl font-bold text-white mb-1 tracking-tighter">
                                0{activeIndex + 1}<span className="text-white/20 text-2xl">/0{services.length}</span>
                            </div>
                            <div className="text-white/40 font-mono text-xs">SECTOR: {services[activeIndex]?.id.toUpperCase()}</div>
                        </div>
                    </div>

                    {/* Center Crosshair */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] border border-white/5 rounded-[60px] flex items-center justify-center opacity-30 pointer-events-none scale-90 md:scale-100">
                        <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-white/20 rounded-tl-3xl" />
                        <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-white/20 rounded-tr-3xl" />
                        <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-white/20 rounded-bl-3xl" />
                        <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-white/20 rounded-br-3xl" />

                        {/* Reticle */}
                        <div className="w-12 h-12 border border-green-500/30 rounded-full flex items-center justify-center">
                            <div className="w-1 h-1 bg-green-500 rounded-full animate-ping" />
                        </div>
                    </div>

                    {/* Bottom Bar */}
                    <div className="flex justify-between items-end">
                        <div className="font-mono text-white/30 text-xs max-w-xs leading-relaxed hidden md:block">
                            Navigational logs initialized.<br />
                            Tracking {services.length} service vectors.<br />
                            Scroll to engage warp drive.
                        </div>

                        <div className="flex items-center gap-4">
                            {/* Scroll Indicator */}
                            <div className="flex flex-col items-center gap-2">
                                <div className="w-[1px] h-12 bg-gradient-to-b from-transparent via-white/50 to-transparent" />
                                <span className="text-[10px] uppercase tracking-widest text-white/40">Scroll</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Global Vignette & Noise */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.8)_100%)] pointer-events-none z-40" />
            </div>
        </div>
    );
}
