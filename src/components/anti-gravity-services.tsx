import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, useSpring, useMotionValue, useMotionTemplate } from "framer-motion";
import { ArrowRight, BarChart3, Globe, Cloud, Bot, Cpu, Layers, Database, Lock, Code } from "lucide-react";
import { cn } from "@/lib/utils";

// --- HOOKS & UTILS ---
function useParallax(value: any, distance: number) {
    return useTransform(value, [0, 1], [-distance, distance]);
}

// --- COMPONENTS ---

// 1. DATA ANALYTICS SECTION
function DataAnalyticsSection() {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });

    // Transform particles into chart lines
    const lineProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });
    const pathLength = useTransform(lineProgress, [0.3, 0.6], [0, 1]);
    const opacity = useTransform(lineProgress, [0.2, 0.4], [0, 1]);
    const particleDispersion = useTransform(lineProgress, [0, 0.5], ["100%", "0%"]);

    return (
        <section ref={ref} className="min-h-screen relative flex items-center justify-center overflow-hidden py-24">
            <div className="absolute inset-0 bg-[#050505]">
                <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-blue-900/20 rounded-full blur-[120px]" />
            </div>

            <div className="container relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center px-6">
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                >
                    <h2 className="text-5xl md:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-cyan-300 mb-6">
                        Turn Raw Data<br />into Decisions
                    </h2>
                    <p className="text-xl text-white/60 max-w-lg mb-8 leading-relaxed">
                        From ingestion to insights — dashboards that drive action. We transform chaotic data streams into clear, strategic intelligence.
                    </p>

                    <div className="flex gap-4">
                        {["ETL", "BI", "Real-Time"].map((tag, i) => (
                            <div key={tag} className="px-4 py-2 rounded-full border border-blue-500/30 bg-blue-500/5 text-blue-300 text-sm font-mono backdrop-blur-sm">
                                {tag}
                            </div>
                        ))}
                    </div>
                </motion.div>

                {/* Interactive Chart/Particle Visualization */}
                <div className="relative h-[400px] w-full bg-white/5 border border-white/10 rounded-3xl backdrop-blur-md overflow-hidden group hover:bg-white/10 transition-colors duration-500">
                    <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:40px_40px]" />

                    {/* Floating Data Particles */}
                    <div className="absolute inset-0">
                        {Array.from({ length: 20 }).map((_, i) => (
                            <motion.div
                                key={i}
                                className="absolute w-1 h-1 bg-cyan-400 rounded-full"
                                style={{
                                    left: `${Math.random() * 100}%`,
                                    top: `${Math.random() * 100}%`,
                                    x: useTransform(scrollYProgress, [0, 1], [Math.random() * 100, 0]),
                                    y: useTransform(scrollYProgress, [0, 1], [Math.random() * 100, 0]),
                                    opacity: useTransform(scrollYProgress, [0.5, 0.6], [1, 0]) // Hide when chart forms
                                }}
                            />
                        ))}
                    </div>

                    {/* Chart Forming */}
                    <motion.svg className="absolute inset-0 w-full h-full p-8" style={{ opacity }}>
                        <motion.path
                            d="M 50 300 C 150 300, 150 100, 250 150 C 350 200, 350 50, 450 100 C 550 150, 550 250, 650 200"
                            stroke="url(#gradient-line)"
                            strokeWidth="4"
                            fill="none"
                            style={{ pathLength }}
                        />
                        <defs>
                            <linearGradient id="gradient-line" x1="0%" y1="0%" x2="100%" y2="0%">
                                <stop offset="0%" stopColor="#3b82f6" />
                                <stop offset="100%" stopColor="#06b6d4" />
                            </linearGradient>
                        </defs>

                        {/* Area under curve */}
                        <motion.path
                            d="M 50 300 C 150 300, 150 100, 250 150 C 350 200, 350 50, 450 100 C 550 150, 550 250, 650 200 V 400 H 50 Z"
                            fill="url(#gradient-area)"
                            style={{ opacity: useTransform(pathLength, [0.9, 1], [0, 0.2]) }}
                        />
                        <defs>
                            <linearGradient id="gradient-area" x1="0%" y1="0%" x2="0%" y2="100%">
                                <stop offset="0%" stopColor="#06b6d4" />
                                <stop offset="100%" stopColor="transparent" />
                            </linearGradient>
                        </defs>
                    </motion.svg>

                    {/* Hover Tooltip */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                        <div className="bg-black/80 backdrop-blur-xl border border-white/20 px-6 py-3 rounded-xl shadow-2xl transform translate-y-4 group-hover:translate-y-0 transition-transform">
                            <span className="text-cyan-400 font-bold text-lg">+245%</span>
                            <span className="text-white/60 text-xs ml-2">Efficiency Gain</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

// 2. ENTERPRISE APPS SECTION
function EnterpriseSection() {
    return (
        <section className="min-h-screen relative flex items-center justify-center py-24 bg-[#080808]">
            {/* Background Grid */}
            <div className="absolute inset-0 bg-[linear-gradient(#1a1a1a_1px,transparent_1px),linear-gradient(90deg,#1a1a1a_1px,transparent_1px)] bg-[size:100px_100px] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,black,transparent)]" />

            <div className="container relative z-10">
                <div className="text-center mb-20">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        className="text-5xl md:text-7xl font-bold text-white mb-6"
                    >
                        Built for Scale. <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-green-300">Designed for Impact.</span>
                    </motion.h2>
                    <p className="text-xl text-white/50 max-w-2xl mx-auto">Secure, resilient, and future-ready applications that grow with your ambition.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {[
                        { title: "Scalability", icon: Layers, desc: "Modular architecture that expands effortlessly." },
                        { title: "Security", icon: Lock, desc: "Bank-grade encryption and compliance standards." },
                        { title: "Performance", icon: Database, desc: "Optimized queries and caching strategies." }
                    ].map((item, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                            className="group relative p-8 rounded-3xl bg-white/[0.02] border border-white/5 hover:border-emerald-500/30 transition-all duration-300 hover:-translate-y-2 h-[300px] flex flex-col justify-between"
                        >
                            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-emerald-900/10 opacity-0 group-hover:opacity-100 transition-opacity rounded-3xl" />

                            <div className="relative z-10">
                                <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 border border-white/5 group-hover:border-emerald-500/30">
                                    <item.icon className="w-7 h-7 text-emerald-400" />
                                </div>
                                <h3 className="text-2xl font-bold text-white mb-3">{item.title}</h3>
                                <p className="text-white/50 leading-relaxed">{item.desc}</p>
                            </div>

                            {/* Tech lines decoration */}
                            <div className="w-full h-1 bg-white/5 mt-auto rounded-full overflow-hidden">
                                <div className="w-1/3 h-full bg-emerald-500/50 rounded-full group-hover:w-full transition-all duration-700 ease-in-out" />
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}

// 3. CLOUD INFRASTRUCTURE SECTION
function CloudSection() {
    const { scrollYProgress } = useScroll();
    const y1 = useTransform(scrollYProgress, [0, 1], [0, -100]);
    const y2 = useTransform(scrollYProgress, [0, 1], [0, -200]);
    const y3 = useTransform(scrollYProgress, [0, 1], [0, -50]);

    return (
        <section className="min-h-screen relative flex items-center justify-center overflow-hidden py-24 bg-[#050505]">
            <div className="container relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center px-6">
                {/* Floating Parallax Cloud Visuals */}
                <div className="relative h-[500px] w-full order-2 lg:order-1 perspective-1000">
                    <motion.div style={{ y: y1 }} className="absolute top-10 left-10 p-8 rounded-3xl bg-indigo-900/20 backdrop-blur-xl border border-indigo-500/30 z-20">
                        <Cloud className="w-16 h-16 text-indigo-400" />
                        <div className="mt-4 font-mono text-indigo-200 text-sm">REGION: US-EAST</div>
                    </motion.div>

                    <motion.div style={{ y: y2 }} className="absolute top-[40%] right-10 p-10 rounded-3xl bg-purple-900/20 backdrop-blur-xl border border-purple-500/30 z-10">
                        <Database className="w-20 h-20 text-purple-400" />
                        <div className="mt-4 font-mono text-purple-200 text-sm">DB: REPLICA-READ</div>
                    </motion.div>

                    <motion.div style={{ y: y3 }} className="absolute bottom-10 left-[20%] p-6 rounded-2xl bg-blue-900/10 backdrop-blur-xl border border-blue-500/20 z-0 opacity-60">
                        <div className="flex gap-2 mb-2">
                            <div className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
                            <div className="w-2 h-2 rounded-full bg-blue-400 animate-pulse delay-75" />
                            <div className="w-2 h-2 rounded-full bg-blue-400 animate-pulse delay-150" />
                        </div>
                        <div className="font-mono text-blue-200 text-xs">LATENCY: 12ms</div>
                    </motion.div>

                    {/* Connecting Lines (svg) */}
                    <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-20">
                        <path d="M 100 100 L 400 250 L 150 400" stroke="white" strokeWidth="1" strokeDasharray="5,5" fill="none" />
                    </svg>
                </div>

                <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    className="order-1 lg:order-2"
                >
                    <h2 className="text-5xl md:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-300 mb-6">
                        Cloud That<br />Scales With You
                    </h2>
                    <p className="text-xl text-white/60 max-w-lg mb-8 leading-relaxed">
                        Design, migration, and optimization — without friction. We build serverless architectures that auto-scale to meet demand instantly.
                    </p>
                    <button className="group relative px-6 py-3 bg-white/10 rounded-full overflow-hidden transition-all hover:bg-white/20">
                        <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-indigo-500/0 via-indigo-500/20 to-indigo-500/0 translate-x-[-100%] group-hover:animate-shimmer" />
                        <span className="text-white font-medium">Explore Infrastructure</span>
                    </button>
                </motion.div>
            </div>
        </section>
    );
}

// 4. AI AUTOMATION SECTION
function AISection() {
    return (
        <section className="min-h-screen relative flex items-center justify-center py-24 bg-[#0a0a0a] overflow-hidden">
            {/* Neural Background */}
            <div className="absolute inset-0 opacity-20">
                <div className="absolute w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(139,92,246,0.1),transparent_70%)]" />
            </div>

            <div className="container relative z-10 flex flex-col items-center text-center">
                <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.8 }}
                    className="mb-12 relative"
                >
                    {/* AI Brain Visual */}
                    <div className="w-64 h-64 md:w-96 md:h-96 rounded-full border border-violet-500/30 flex items-center justify-center relative animate-pulse-slow bg-violet-900/5 backdrop-blur-3xl">
                        <Bot className="w-32 h-32 text-violet-400/80" />

                        {/* Orbiting Nodes */}
                        {[0, 60, 120, 180, 240, 300].map((deg, i) => (
                            <motion.div
                                key={i}
                                className="absolute w-4 h-4 bg-violet-400 rounded-full shadow-[0_0_15px_rgba(139,92,246,0.8)]"
                                animate={{ rotate: 360 }}
                                transition={{ duration: 10 + i, repeat: Infinity, ease: "linear" }}
                                style={{
                                    top: '50%',
                                    left: '50%',
                                    translateX: '-50%',
                                    translateY: '-50%',
                                    transformOrigin: `${150 + (i * 10)}px` // Spiral orbit
                                }}
                            />
                        ))}
                    </div>
                </motion.div>

                <h2 className="text-6xl md:text-8xl font-bold text-white mb-6">
                    Automate <span className="text-violet-400">Intelligence</span>
                </h2>
                <p className="text-xl text-white/50 max-w-2xl mx-auto mb-12">
                    AI workflows that work while you sleep. From chatbots to predictive maintenance, we deploy agents that evolve.
                </p>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full max-w-4xl">
                    {["Natural Language", "Computer Vision", "Predictive Models", "Autonomous Agents"].map((tech, i) => (
                        <div key={i} className="px-6 py-4 rounded-xl border border-white/10 bg-white/5 hover:bg-violet-900/20 hover:border-violet-500/40 transition-all text-sm md:text-base text-white/80 text-center">
                            {tech}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

// 5. CTA SECTION
function FinalCTASection() {
    return (
        <section className="min-h-[80vh] relative flex flex-col items-center justify-center bg-black overflow-hidden">
            {/* Particles drifting away */}
            <div className="absolute inset-0 w-full h-full overflow-hidden">
                {Array.from({ length: 50 }).map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute bg-white/20 rounded-full"
                        style={{
                            width: Math.random() * 4 + 1,
                            height: Math.random() * 4 + 1,
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                        }}
                        animate={{
                            y: [0, -1000],
                            opacity: [0, 1, 0]
                        }}
                        transition={{
                            duration: Math.random() * 10 + 10,
                            repeat: Infinity,
                            ease: "linear"
                        }}
                    />
                ))}
            </div>

            <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 1 }}
                className="relative z-10 text-center px-4"
            >
                <h2 className="text-5xl md:text-8xl font-bold text-white tracking-tighter mb-12">
                    Let’s Build What Others <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-white/20">Think Is Impossible.</span>
                </h2>

                <button className="group relative px-10 py-5 bg-white text-black rounded-full font-bold text-xl transition-all hover:scale-105 hover:shadow-[0_0_40px_rgba(255,255,255,0.3)]">
                    Start Your Project
                    <span className="absolute inset-0 rounded-full ring-2 ring-white/50 animate-ping opacity-20 group-hover:opacity-40" />
                </button>
            </motion.div>
        </section>
    );
}

export function AntiGravityServices() {
    const containerRef = useRef(null);
    useScroll(); // Initialize scroll listener

    return (
        <div ref={containerRef} className="bg-black min-h-screen text-white selection:bg-cyan-500/30 selection:text-cyan-200">
            {/* Smooth Scroll Content */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1 }}
            >
                {/* Hero Spacer */}
                <div className="h-[40vh] flex items-center justify-center relative overflow-hidden">
                    <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay" />
                    <motion.h1
                        initial={{ y: 50, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 1, ease: "easeOut" }}
                        className="text-sm font-mono uppercase tracking-[0.5em] text-white/40"
                    >
                        Services • Systems • Scale
                    </motion.h1>
                </div>

                <DataAnalyticsSection />
                <EnterpriseSection />
                <CloudSection />
                <AISection />
                <FinalCTASection />
            </motion.div>
        </div>
    );
}
