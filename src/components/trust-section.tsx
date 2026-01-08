import { Shield, Lock, Server, Fingerprint, Activity, Globe } from "lucide-react";
import { FadeIn } from "./ui/scroll-animation";

const trustFeatures = [
    {
        title: "Enterprise Security",
        description: "Bank-grade encryption and SOC2 compliant infrastructure to keep your data safe.",
        icon: Shield
    },
    {
        title: "99.99% Uptime",
        description: "Redundant global infrastructure ensures your business never stops running.",
        icon: Activity
    },
    {
        title: "Global Compliance",
        description: "Built-in compliance with GDPR, CCPA, and other global regulations.",
        icon: Globe
    },
    {
        title: "Data Sovereignty",
        description: "Complete control over where your data resides and how it's processed.",
        icon: Server
    },
    {
        title: "SSO & Identity",
        description: "Seamless integration with your existing identity providers like Okta and Azure AD.",
        icon: Fingerprint
    },
    {
        title: "Private Cloud",
        description: "Option for dedicated private cloud deployment for improved isolation.",
        icon: Lock
    }
];

export function TrustSection() {
    return (
        <section className="py-32 bg-black/40 relative overflow-hidden">
            {/* Background Grid */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
            <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background" />

            <div className="container mx-auto px-4 relative z-10">
                <div className="text-center mb-20">
                    <FadeIn>
                        <span className="text-sm text-green-400 font-mono tracking-widest uppercase mb-4 inline-block">
                            ● System Operational
                        </span>
                        <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                            Built for Trust & Scale
                        </h2>
                        <p className="text-white/40 max-w-2xl mx-auto">
                            Our platform is architected from the ground up to meet the rigorous demands of modern enterprise.
                            Safe. Reliable. Secure.
                        </p>
                    </FadeIn>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {trustFeatures.map((feature, index) => (
                        <FadeIn key={index} delay={index * 0.1}>
                            <div className="group h-full p-8 rounded-2xl bg-white/[0.03] border border-white/5 hover:border-white/10 hover:bg-white/[0.05] transition-all duration-300">
                                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-white/10 to-transparent flex items-center justify-center mb-6 text-white group-hover:scale-110 transition-transform">
                                    <feature.icon className="w-6 h-6" />
                                </div>
                                <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
                                <p className="text-white/40 text-sm leading-relaxed">
                                    {feature.description}
                                </p>
                            </div>
                        </FadeIn>
                    ))}
                </div>
            </div>
        </section>
    );
}
