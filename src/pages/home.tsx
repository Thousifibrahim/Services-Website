import { Hero } from "@/components/hero";
import { motion, useScroll, useTransform } from "framer-motion";
import { Link } from "wouter";
import { useRef, useEffect, useState } from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import { ArrowRight, Sparkles, Zap, Target, Rocket, TrendingUp, Users, Award } from "lucide-react";
import { FadeIn, TextReveal } from "@/components/ui/scroll-animation";
import { ParallaxReveal, StickyImageScroll } from "@/components/parallax-reveal";
import { TrustSection } from "@/components/trust-section";

const clients = [
  "Peenya industries", "Nebula", "Vertex", "Horizon", "Ascend", "Quantum", "Stellar", "Pinnacle"
];

const journeySteps = [
  {
    number: "01",
    title: "Discovery",
    description: "We dive deep into your vision, goals, and challenges to understand exactly what success looks like for you.",
    icon: Target
  },
  {
    number: "02",
    title: "Strategy",
    description: "Our team crafts a tailored roadmap with clear milestones and measurable outcomes.",
    icon: Sparkles
  },
  {
    number: "03",
    title: "Creation",
    description: "We bring your vision to life with cutting-edge technology and pixel-perfect design.",
    icon: Zap
  },
  {
    number: "04",
    title: "Launch & Scale",
    description: "We deploy, optimize, and continuously improve to ensure lasting success.",
    icon: Rocket
  },
];

const teamMembers = [
  { name: "Thousif ibrahim", role: "Developer", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face" },
  { name: "Aryan bhartiya", role: "Business analyst", image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop&crop=face" },
  { name: "Marcus Johnson", role: "Lead Developer", image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face" },
  { name: "Emily Zhang", role: "AI Solutions Architect", image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face" },
  { name: "David Park", role: "UX Strategist", image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop&crop=face" },
  { name: "Olivia Brown", role: "Cloud Architect", image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=400&fit=crop&crop=face" },
];

const topProducts = [
  {
    title: "AI Lead Engine",
    description: "Autonomous lead generation powered by advanced AI. Qualify prospects, nurture relationships, and close deals faster.",
    stats: "300% avg increase in qualified leads",
    icon: TrendingUp,
    gradient: "from-blue-500 to-cyan-500"
  },
  {
    title: "Multi-Tenant Agentic Platform",
    description: "Enterprise SaaS infrastructure with autonomous agents handling complex workflows across isolated tenant environments.",
    stats: "Used by Fortune 500 companies",
    icon: Users,
    gradient: "from-purple-500 to-pink-500"
  },
  {
    title: "DataViz Pro Suite",
    description: "Transform raw data into stunning, interactive visualizations that tell compelling stories and drive decisions.",
    stats: "10M+ data points visualized daily",
    icon: Award,
    gradient: "from-orange-500 to-red-500"
  }
];

const featuredWork = [
  {
    title: "Neon Financial",
    description: "Reimagining the future of digital banking with an immersive, AI-driven interface.",
    image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&q=80&w=1920"
  },
  {
    title: "Orbit Aerospace",
    description: "Mission control dashboard for next-generation satellite constellations.",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=1920"
  },
  {
    title: "EcoSphere",
    description: "Global sustainability tracking platform visualizing real-time environmental data.",
    image: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&q=80&w=1920"
  }
];

export default function Home() {
  const containerRef = useRef(null);
  const teamSectionRef = useRef(null);
  const isMobile = useIsMobile();
  const [teamInView, setTeamInView] = useState(false);

  const { scrollYProgress } = useScroll({
    target: teamSectionRef,
    offset: ["start end", "end start"]
  });

  const colorProgress = useTransform(scrollYProgress, [0.2, 0.8], [0, 1]);

  useEffect(() => {
    if (!isMobile) return;

    const unsubscribe = colorProgress.onChange((value) => {
      setTeamInView(value > 0.3);
    });

    return () => unsubscribe();
  }, [colorProgress, isMobile]);

  return (
    <div ref={containerRef} className="min-h-screen bg-background text-foreground selection:bg-white/20 selection:text-white">
      <main>
        <Hero />

        {/* Client Logos Section */}
        <section className="py-16 border-b border-white/5 overflow-hidden">
          <div className="container mx-auto px-4 text-center">
            <FadeIn>
              <p className="text-sm text-white/30 uppercase tracking-widest mb-12">Trusted by industry leaders</p>
            </FadeIn>
            <div className="relative">
              <div className="flex animate-scroll gap-20">
                {[...clients, ...clients].map((client, i) => (
                  <span key={i} className="text-2xl font-bold text-white/20 whitespace-nowrap hover:text-white/40 transition-colors cursor-default">{client}</span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-24 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/[0.02] to-transparent" />
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {[
                { value: "2+", label: "Projects Delivered" },
                { value: "5+", label: "Enterprise Clients" },
                { value: "98%", label: "Client Satisfaction" },
                { value: "24/7", label: "Support Available" },
              ].map((stat, i) => (
                <FadeIn
                  key={i}
                  delay={i * 0.1}
                  className="text-center"
                >
                  <div className="text-4xl md:text-6xl font-bold text-white mb-2">{stat.value}</div>
                  <div className="text-white/40 text-sm">{stat.label}</div>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>

        {/* Featured Work - Parallax Reveal */}
        <ParallaxReveal
          image="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=1920"
          title="Beyond Boundaries"
          description="We push the limits of what's possible on the web. Our designs are not just static pages; they are immersive experiences."
        />

        {/* Sticky Scroll Section for Portfolio */}
        <section className="relative bg-background">
          <div className="container mx-auto px-4 py-20 text-center">
            <FadeIn>
              <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">Selected Works</h2>
              <p className="text-white/40 max-w-2xl mx-auto">A collection of our most impactful projects.</p>
            </FadeIn>
          </div>
          <StickyImageScroll items={featuredWork} />
        </section>

        {/* Trust Section */}
        <TrustSection />

        {/* Journey Section */}
        <section className="py-32 relative overflow-hidden" id="journey">
          <div className="absolute inset-0">
            <div className="absolute top-1/2 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent" />
          </div>
          <div className="container mx-auto px-4">
            <div className="text-center mb-20">
              <FadeIn>
                <span className="text-sm text-white/40 uppercase tracking-widest">How We Work</span>
              </FadeIn>
              <h2 className="text-5xl md:text-7xl font-bold text-white mt-4 tracking-tight">
                <TextReveal text="Your Journey" className="block" />
                <span className="text-white/20 block">
                  <TextReveal text="With Us" delay={0.5} />
                </span>
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {journeySteps.map((step, index) => (
                <FadeIn
                  key={index}
                  delay={index * 0.15}
                  className="group relative"
                >
                  <div className="absolute -top-4 -left-4 text-8xl font-bold text-white/[0.03] select-none">{step.number}</div>
                  <div className="relative bg-white/[0.02] border border-white/10 rounded-3xl p-8 h-full hover:bg-white/[0.04] transition-all duration-500 hover:border-white/20 hover:-translate-y-2">
                    <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500">
                      <step.icon className="w-7 h-7 text-white/80" />
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-3">{step.title}</h3>
                    <p className="text-white/50 leading-relaxed">{step.description}</p>
                  </div>
                  {index < journeySteps.length - 1 && (
                    <div className="hidden lg:block absolute top-1/2 -right-4 w-8 h-[2px] bg-gradient-to-r from-white/20 to-transparent" />
                  )}
                </FadeIn>
              ))}
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section ref={teamSectionRef} className="py-32 relative overflow-hidden" id="team">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.02)_0%,transparent_70%)]" />
          <div className="container mx-auto px-4">
            <div className="text-center mb-20">
              <FadeIn>
                <span className="text-sm text-white/40 uppercase tracking-widest">The People</span>
              </FadeIn>
              <h2 className="text-5xl md:text-7xl font-bold text-white mt-4 tracking-tight">
                <TextReveal text="Meet Our Experts" />
              </h2>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
              {teamMembers.map((member, index) => (
                <FadeIn
                  key={index}
                  delay={index * 0.1}
                  className="group cursor-pointer"
                >
                  <motion.div whileHover={{ y: -10 }} transition={{ type: "spring", stiffness: 300 }}>
                    <div className="relative aspect-square rounded-3xl overflow-hidden mb-4">
                      <img
                        src={member.image}
                        alt={member.name}
                        className={`w-full h-full object-cover transition-all duration-500 group-hover:scale-110 ${isMobile
                          ? (teamInView ? 'grayscale-0' : 'grayscale')
                          : 'grayscale group-hover:grayscale-0'
                          }`}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>
                    <h4 className="text-white font-semibold text-sm">{member.name}</h4>
                    <p className="text-white/40 text-xs">{member.role}</p>
                  </motion.div>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>

        {/* Top Products Section */}
        <section className="py-32 relative overflow-hidden" id="products">
          <div className="container mx-auto px-4">
            <div className="text-center mb-20">
              <FadeIn>
                <span className="text-sm text-white/40 uppercase tracking-widest">Featured Solutions</span>
              </FadeIn>
              <h2 className="text-5xl md:text-7xl font-bold text-white mt-4 tracking-tight">
                <TextReveal text="Top Products" />
              </h2>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {topProducts.map((product, index) => (
                <FadeIn
                  key={index}
                  delay={index * 0.15}
                  className="group relative"
                >
                  <motion.div whileHover={{ y: -5 }} className="h-full">
                    <div className={`absolute inset-0 bg-gradient-to-br ${product.gradient} opacity-0 group-hover:opacity-10 rounded-3xl transition-opacity duration-500 blur-xl`} />
                    <div className="relative bg-[#0a0a0a] border border-white/10 rounded-3xl p-10 h-full hover:border-white/20 transition-all duration-500">
                      <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${product.gradient} flex items-center justify-center mb-8`}>
                        <product.icon className="w-8 h-8 text-white" />
                      </div>
                      <h3 className="text-2xl font-bold text-white mb-4">{product.title}</h3>
                      <p className="text-white/50 leading-relaxed mb-6">{product.description}</p>
                      <div className="flex items-center gap-2 text-sm">
                        <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${product.gradient}`} />
                        <span className="text-white/60">{product.stats}</span>
                      </div>
                    </div>
                  </motion.div>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-32 border-t border-white/5 relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.03)_0%,transparent_70%)]" />
          <div className="container mx-auto px-4 text-center relative z-10">
            <div className="mb-6">
              <h2 className="text-5xl md:text-7xl font-bold text-white tracking-tight flex justify-center">
                <TextReveal text="Ready to transform?" />
              </h2>
            </div>

            <FadeIn delay={0.2}>
              <p className="text-xl text-white/40 mb-12 max-w-2xl mx-auto">
                Let's discuss how we can elevate your business with cutting-edge technology and design.
              </p>
            </FadeIn>

            <FadeIn delay={0.4}>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Link href="/contact">
                  <button className="group px-10 py-5 rounded-full bg-white text-black font-medium hover:bg-white/90 transition-all text-lg flex items-center justify-center gap-3">
                    Enquire Now
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </button>
                </Link>
                <Link href="/work">
                  <button className="px-10 py-5 rounded-full bg-white/5 border border-white/10 text-white font-medium hover:bg-white/10 transition-all text-lg backdrop-blur-sm">
                    View Our Work
                  </button>
                </Link>
              </div>
            </FadeIn>
          </div>
        </section>
      </main>

    </div>
  );
}