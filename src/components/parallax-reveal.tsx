import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { cn } from "@/lib/utils";

interface ParallaxSectionProps {
    image: string;
    title: string;
    description: string;
    className?: string;
}

export function ParallaxReveal({ image, title, description, className }: ParallaxSectionProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"],
    });

    const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1.2, 1, 1.2]);
    const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
    const y = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);

    const textY = useTransform(scrollYProgress, [0.2, 0.5], ["50px", "0px"]);
    const textOpacity = useTransform(scrollYProgress, [0.2, 0.4], [0, 1]);

    return (
        <div ref={containerRef} className={cn("relative h-[120vh] flex items-center justify-center overflow-hidden my-20", className)}>
            <motion.div
                style={{ scale, opacity }}
                className="absolute inset-0 w-full h-full z-0"
            >
                <motion.div style={{ y }} className="w-full h-full">
                    <img
                        src={image}
                        alt={title}
                        className="w-full h-full object-cover filter brightness-[0.4]"
                    />
                </motion.div>
                <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background" />
                <div className="absolute inset-0 bg-gradient-to-r from-background via-transparent to-background" />
            </motion.div>

            <motion.div
                style={{ y: textY, opacity: textOpacity }}
                className="relative z-10 container mx-auto px-4 text-center"
            >
                <h2 className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight drop-shadow-2xl">
                    {title}
                </h2>
                <p className="text-xl md:text-2xl text-white/80 max-w-2xl mx-auto font-light leading-relaxed drop-shadow-lg">
                    {description}
                </p>
            </motion.div>
        </div>
    );
}

interface StickyImageScrollProps {
    items: {
        title: string;
        description: string;
        image: string;
    }[]
}

export function StickyImageScroll({ items }: StickyImageScrollProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    return (
        <section ref={containerRef} className="relative">
            {items.map((item, index) => (
                <StickyItem key={index} item={item} index={index} total={items.length} />
            ))}
        </section>
    );
}

function StickyItem({ item, index, total }: { item: any, index: number, total: number }) {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "start start"]
    });

    // As the item comes into view, it covers the previous one
    // We want a parallax effect where the image stays steady but gets covered

    return (
        <div ref={ref} className="sticky top-0 h-screen flex items-center justify-center overflow-hidden bg-background">
            <div className="absolute inset-0 w-full h-full">
                <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover opacity-40"
                />
                <div className="absolute inset-0 bg-black/60" />
            </div>

            <div className="relative z-10 container mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                <div className="md:col-span-1">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                    >
                        <h3 className="text-sm text-white/40 uppercase tracking-[0.2em] mb-4">
                            0{index + 1} / 0{total}
                        </h3>
                        <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
                            {item.title}
                        </h2>
                        <div className="h-1 w-20 bg-white/20 mb-8" />
                        <p className="text-lg text-white/60 leading-relaxed">
                            {item.description}
                        </p>
                    </motion.div>
                </div>
                <div className="hidden md:block" /> {/** Spacer */}
            </div>
        </div>
    )
}
