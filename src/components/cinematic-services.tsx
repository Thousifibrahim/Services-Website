import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, useSpring, MotionValue, AnimatePresence } from "framer-motion";
import { ArrowUpRight, X, Clock, CheckCircle2, Zap, Shield, Users, Target } from "lucide-react";

// --- DATA ---
const services = [
    {
        id: "ai-auto",
        title: "AI Automation",
        category: "AI & ML",
        img: "https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=1965&auto=format&fit=crop",
        description: "Deploy autonomous agents that handle complex workflows while you sleep.",
        timeline: [
            { step: "01", title: "Requirement Gathering", desc: "Analyzing workflows to identify manual bottlenecks." },
            { step: "02", title: "Agent Training", desc: "Customizing LLMs on your specific proprietary data." },
            { step: "03", title: "System Integration", desc: "Connecting agents to your CRM and ERP systems." }
        ]
    },
    {
        id: "data-analytics",
        title: "Data Analytics",
        category: "Intelligence",
        img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2000&auto=format&fit=crop",
        description: "Transforming raw data lakes into clear, actionable strategic signals.",
        timeline: [
            { step: "01", title: "Data Discovery", desc: "Auditing data sources and quality assurance." },
            { step: "02", title: "Pipeline Architecture", desc: "Building robust ETL processes for real-time ingestion." },
            { step: "03", title: "Dashboard Creation", desc: "Visualizing key performance indicators." }
        ]
    },
    {
        id: "digital-marketing",
        title: "Digital Marketing",
        category: "Growth",
        img: "https://images.unsplash.com/photo-1533750516457-a7f992034fec?q=80&w=2000&auto=format&fit=crop",
        description: "Data-driven campaigns that target, capture, and convert.",
        timeline: [
            { step: "01", title: "Market Audit", desc: "Competitor analysis and audience persona building." },
            { step: "02", title: "Campaign Strategy", desc: "Multi-channel planning and ad creative design." },
            { step: "03", title: "Performance Scaling", desc: "A/B testing and budget optimization." }
        ]
    },
    {
        id: "enterprise-dev",
        title: "Enterprise Web Dev",
        category: "Engineering",
        img: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=2000&auto=format&fit=crop",
        description: "Scalable, secure, and fault-tolerant architectures for global scale.",
        timeline: [
            { step: "01", title: "System Design", desc: "High-level architectural planning and selecting the tech stack." },
            { step: "02", title: "Agile Development", desc: "Iterative sprints with continuous integration." },
            { step: "03", title: "Deployment", desc: "Production rollout with load testing and monitoring." }
        ]
    },
    {
        id: "wordpress",
        title: "WordPress Design",
        category: "CMS",
        img: "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?q=80&w=2000&auto=format&fit=crop",
        description: "Custom themes and plugins that push WordPress beyond its limits.",
        timeline: [
            { step: "01", title: "Wireframing", desc: "Designing the user journey and layout structure." },
            { step: "02", title: "Theme Development", desc: "Coding pixel-perfect, lightweight custom themes." },
            { step: "03", title: "Content Migration", desc: "Transferring assets and training the content team." }
        ]
    },
    {
        id: "azure",
        title: "Azure Architecting",
        category: "Cloud",
        img: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2000&auto=format&fit=crop",
        description: "Native cloud environments optimized for cost and performance.",
        timeline: [
            { step: "01", title: "Infrastructure Audit", desc: "Assessing current on-prem or cloud resources." },
            { step: "02", title: "Migration Strategy", desc: "Planning 'Lift & Shift' or 'Re-platforming' paths." },
            { step: "03", title: "Optimization", desc: "Implementing auto-scaling and cost governance." }
        ]
    },
    {
        id: "lead-gen",
        title: "Lead Generation",
        category: "Surveys",
        img: "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2000&auto=format&fit=crop",
        description: "Targeted survey funnels that pre-qualify high-value prospects.",
        timeline: [
            { step: "01", title: "Audience Profiling", desc: "Identifying the ideal customer profile (ICP)." },
            { step: "02", title: "Funnel Design", desc: "Creating logic-branching surveys for qualification." },
            { step: "03", title: "CRM Integration", desc: "Automating lead delivery to your sales team." }
        ]
    },
    {
        id: "agentic",
        title: "Agentic Solutions",
        category: "Multi-tenant",
        img: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?q=80&w=2000&auto=format&fit=crop",
        description: "Next-gen SaaS platforms with isolated environments and AI agents.",
        timeline: [
            { step: "01", title: "Tenant Architecture", desc: "Designing secure database isolation strategies." },
            { step: "02", title: "Agent Development", desc: "Building context-aware AI assistants for tenants." },
            { step: "03", title: "Platform Launch", desc: "Scaling infrastructure for multi-user load." }
        ]
    },
    {
        id: "graphic",
        title: "Graphic Designing",
        category: "Creative",
        img: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=2000&auto=format&fit=crop",
        description: "Visual storytelling that defines brand identity and captivates.",
        timeline: [
            { step: "01", title: "Discovery Phase", desc: "Understanding brand values and visual direction." },
            { step: "02", title: "Concept Creation", desc: "Iterative design rounds and feedback loops." },
            { step: "03", title: "Final Polish", desc: "Delivering production-ready assets and guidelines." }
        ]
    }
];

const principles = [
    { title: "User-Centric", icon: Users, desc: "Every pixel serves a user need." },
    { title: "Performance First", icon: Zap, desc: "Speed is a feature, not an afterthought." },
    { title: "Bulletproof Security", icon: Shield, desc: "Zero-trust architecture by default." },
    { title: "Data Driven", icon: Target, desc: "Decisions backed by analytics, not guesses." }
];

// --- COMPONENTS ---

// 1. HERO SECTION
function Hero() {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
    const smoothY = useSpring(scrollYProgress, { stiffness: 200, damping: 30 });
    const y = useTransform(smoothY, [0, 1], ["0%", "50%"]);
    const opacity = useTransform(smoothY, [0, 0.8], [1, 0]);

    return (
        <section ref={ref} className="h-screen flex flex-col items-center justify-center relative overflow-hidden will-change-transform pt-20">
            <motion.div style={{ y, opacity }} className="relative z-10 text-center px-4 max-w-5xl mx-auto">
                {["IMPACT", "THROUGH", "CODE."].map((text, i) => (
                    <div key={i} className="overflow-hidden">
                        <motion.h1
                            initial={{ y: "100%" }}
                            animate={{ y: 0 }}
                            transition={{ duration: 0.8, delay: i * 0.15, ease: [0.33, 1, 0.68, 1] }}
                            className={`text-6xl md:text-8xl font-black tracking-tighter leading-tight ${i === 1 ? "text-transparent bg-clip-text bg-gradient-to-b from-white to-white/40" : "text-white"
                                }`}
                        >
                            {text}
                        </motion.h1>
                    </div>
                ))}
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1, duration: 1 }}
                    className="text-white/50 bg-black/50 backdrop-blur-sm px-4 py-2 mt-8 rounded-full text-sm font-mono uppercase tracking-widest inline-block border border-white/10"
                >
                    Scroll to Explore Services
                </motion.p>
            </motion.div>

            {/* Optimized Background */}
            <div className="absolute inset-0 z-0 select-none">
                <div className="absolute inset-0 bg-black/60 z-10" />
                <img
                    src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2000&auto=format&fit=crop"
                    alt="Hero Background"
                    className="w-full h-full object-cover opacity-50"
                    loading="eager"
                />
            </div>
        </section>
    );
}

// 2. TIMELINE & PRINCIPLES MODAL
function CaseStudyModal({ service, onClose }: { service: typeof services[0], onClose: () => void }) {
    // Lock body scroll
    useEffect(() => {
        document.body.style.overflow = "hidden";
        return () => { document.body.style.overflow = "unset" };
    }, []);

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-end justify-center"
        >
            <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose} />

            <motion.div
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                exit={{ y: "100%" }}
                transition={{ type: "spring", damping: 25, stiffness: 200 }}
                className="relative w-full h-[85vh] bg-[#0a0a0a] rounded-t-[40px] overflow-hidden border-t border-white/10 shadow-2xl flex flex-col"
            >
                {/* Header */}
                <div className="flex items-start justify-between p-8 border-b border-white/5 bg-[#0a0a0a]/90 backdrop-blur-md sticky top-0 z-30 shrink-0">
                    <div>
                        <div className="text-sm font-mono text-white/40 uppercase tracking-widest mb-2">Process Overview</div>
                        <h2 className="text-3xl md:text-4xl font-bold text-white">{service.title}</h2>
                    </div>
                    <button onClick={onClose} className="p-3 rounded-full bg-white/5 hover:bg-white/10 transition-colors border border-white/5">
                        <X className="w-5 h-5 text-white" />
                    </button>
                </div>

                {/* Scrollable Content */}
                <div className="flex-1 overflow-y-auto p-8 md:p-12 space-y-20 overscroll-contain">

                    {/* Timeline Section */}
                    <div>
                        <h3 className="text-2xl font-bold text-white mb-10 flex items-center gap-3">
                            <Clock className="w-6 h-6 text-blue-500" />
                            Development Process
                        </h3>

                        <div className="relative border-l border-white/10 ml-3 space-y-12 pb-8">
                            {service.timeline.map((item, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    transition={{ delay: i * 0.2 }}
                                    viewport={{ once: true }}
                                    className="relative pl-12"
                                >
                                    <div className="absolute -left-[5px] top-2 w-2.5 h-2.5 rounded-full bg-blue-500 shadow-[0_0_10px_#3b82f6]" />
                                    <div className="font-mono text-blue-400 text-sm mb-2 opacity-80">{item.step}</div>
                                    <h4 className="text-xl font-bold text-white mb-2">{item.title}</h4>
                                    <p className="text-white/50 leading-relaxed max-w-lg">{item.desc}</p>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    {/* Principles Section */}
                    <div className="pb-12">
                        <h3 className="text-2xl font-bold text-white mb-10 flex items-center gap-3">
                            <CheckCircle2 className="w-6 h-6 text-emerald-500" />
                            Core Principles
                        </h3>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {principles.map((principle, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ delay: i * 0.1 }}
                                    viewport={{ once: true }}
                                    className="p-6 rounded-2xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors"
                                >
                                    <principle.icon className="w-8 h-8 text-white/80 mb-4" />
                                    <h4 className="text-lg font-bold text-white mb-2">{principle.title}</h4>
                                    <p className="text-white/50 text-sm">{principle.desc}</p>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
}

// 3. PARALLAX CARD
function ProjectCard({ project, index, range, targetScale, openModal }: { project: any, index: number, range: MotionValue<number>, targetScale: number, openModal: (p: any) => void }) {
    const container = useRef(null);
    const { scrollYProgress } = useScroll({
        target: container,
        offset: ['start end', 'start start']
    });

    const smoothParallax = useSpring(scrollYProgress, { stiffness: 300, damping: 30 });
    const imageScale = useTransform(smoothParallax, [0, 1], [1.5, 1]);
    const scale = useTransform(range, [0, 1], [1, targetScale]);

    return (
        <div ref={container} className="h-screen flex items-center justify-center sticky top-0 perspective-1000">
            <motion.div
                style={{ scale, top: `calc(-5vh + ${index * 25}px)` }}
                className="flex flex-col relative bg-[#111] border border-white/10 rounded-[3rem] w-[90vw] md:w-[70vw] h-[65vh] md:h-[75vh] origin-top overflow-hidden shadow-2xl will-change-transform"
            >
                {/* Content Layout */}
                <div className="flex h-full flex-col md:flex-row">
                    {/* Text Side */}
                    <div className="w-full md:w-[40%] p-8 md:p-10 lg:p-12 flex flex-col justify-between z-20 bg-[#111] relative border-r border-white/5">
                        <div>
                            <span className="inline-block px-3 py-1 rounded-full border border-white/10 text-xs font-mono mb-6 uppercase tracking-widest text-white/60">
                                {project.category}
                            </span>
                            <h2 className="text-3xl md:text-5xl font-bold text-white mb-4 leading-tight">{project.title}</h2>
                            <p className="text-base md:text-lg text-white/50 leading-relaxed font-light">{project.description}</p>
                        </div>

                        <button
                            onClick={() => openModal(project)}
                            className="group flex items-center gap-3 text-white border-b border-white/20 pb-1 w-fit hover:border-white transition-colors mt-8 md:mt-0"
                        >
                            <span className="uppercase tracking-widest text-sm font-medium">More</span>
                            <ArrowUpRight className="w-4 h-4 transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" />
                        </button>
                    </div>

                    {/* Image Side */}
                    <div className="w-full md:w-[60%] h-full relative overflow-hidden bg-white/5">
                        <motion.div style={{ scale: imageScale }} className="w-full h-full will-change-transform">
                            <img
                                src={project.img}
                                alt={project.title}
                                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                                loading="lazy"
                            />
                            <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-500" />
                        </motion.div>
                    </div>
                </div>
            </motion.div>
        </div>
    )
}

// 4. MAIN COMPONENT
export function CinematicServices() {
    const container = useRef(null);
    const [activeProject, setActiveProject] = useState(null);

    const { scrollYProgress } = useScroll({
        target: container,
        offset: ['start start', 'end end']
    });

    const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 20, mass: 0.5 });

    return (
        <main ref={container} className="bg-black relative text-white">
            <Hero />

            <div className="mt-[20vh] mb-[20vh]">
                {services.map((project, i) => {
                    const targetScale = 1 - ((services.length - i) * 0.05);
                    return (
                        <ProjectCard
                            key={i}
                            index={i}
                            project={project}
                            range={smoothProgress}
                            targetScale={targetScale}
                            openModal={setActiveProject}
                        />
                    );
                })}
            </div>

            <footer className="h-[50vh] flex items-center justify-center bg-[#050505] relative overflow-hidden">
                <h1 className="text-[15vw] font-bold text-[#111] select-none absolute bottom-0 leading-[0.75] tracking-tighter">ANTIGRAVITY</h1>
                <div className="relative z-10 text-center">
                    <p className="text-xl text-white/50 mb-8 font-light">Ready to disrupt reality?</p>
                    <button className="px-10 py-4 bg-white text-black rounded-full font-bold text-lg hover:scale-105 transition-transform shadow-[0_0_20px_rgba(255,255,255,0.3)]">
                        Start Project
                    </button>
                </div>
            </footer>

            <AnimatePresence>
                {activeProject && (
                    <CaseStudyModal service={activeProject} onClose={() => setActiveProject(null)} />
                )}
            </AnimatePresence>
        </main>
    );
}
