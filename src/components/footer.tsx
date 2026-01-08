import { Link } from "wouter";

export function Footer() {
    return (
        <footer className="py-16 border-t border-white/5 bg-black/40 backdrop-blur-sm">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
                    <div className="col-span-1 md:col-span-2">
                        <div className="flex items-center gap-2 mb-6">
                            <div className="w-5 h-5 rounded-full bg-white shadow-[0_0_15px_rgba(255,255,255,0.5)]" />
                            <h3 className="text-2xl font-bold text-white">BCA</h3>
                        </div>
                        <p className="text-white/40 max-w-md leading-relaxed">
                            A digital design and development agency crafting the future of the web.
                            We build immersive experiences for forward-thinking brands.
                        </p>
                    </div>
                    <div>
                        <h4 className="text-white font-bold mb-6">Explore</h4>
                        <ul className="space-y-3 text-sm text-white/40">
                            <li><Link href="/services"><span className="hover:text-white transition-colors cursor-pointer">Services</span></Link></li>
                            <li><Link href="/work"><span className="hover:text-white transition-colors cursor-pointer">Work</span></Link></li>
                            <li><Link href="/contact"><span className="hover:text-white transition-colors cursor-pointer">Contact</span></Link></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="text-white font-bold mb-6">Connect</h4>
                        <ul className="space-y-3 text-sm text-white/40">
                            <li><span className="hover:text-white transition-colors cursor-pointer">Twitter</span></li>
                            <li><span className="hover:text-white transition-colors cursor-pointer">LinkedIn</span></li>
                            <li><span className="hover:text-white transition-colors cursor-pointer">Instagram</span></li>
                        </ul>
                    </div>
                </div>
                <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-white/20">
                    <p>© 2024 BCA Inc. All rights reserved.</p>
                    <div className="flex gap-6">
                        <Link href="/privacy"><span className="hover:text-white/40 transition-colors cursor-pointer">Privacy Policy</span></Link>
                        <Link href="/terms"><span className="hover:text-white/40 transition-colors cursor-pointer">Terms of Service</span></Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
