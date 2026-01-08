import { motion } from "framer-motion";
import { Scale, FileText, AlertCircle, Users, Shield } from "lucide-react";

export default function Terms() {
  return (
    <div className="min-h-screen bg-background pt-32 pb-20 px-4">
      <div className="container max-w-4xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <div className="w-16 h-16 bg-purple-500/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <Scale className="w-8 h-8 text-purple-400" />
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-4 tracking-tight">Terms of Service</h1>
          <p className="text-xl text-white/40">Our terms and conditions for using our services</p>
          <p className="text-sm text-white/30 mt-4">Last updated: December 1, 2025</p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="prose prose-invert max-w-none"
        >
          <div className="bg-[#0a0a0a] border border-white/10 rounded-3xl p-8 md:p-12 space-y-8">
            
            <section>
              <div className="flex items-center gap-3 mb-4">
                <FileText className="w-6 h-6 text-blue-400" />
                <h2 className="text-2xl font-bold text-white">Acceptance of Terms</h2>
              </div>
              <div className="text-white/70 space-y-4">
                <p>By accessing and using this website, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.</p>
                <p>These Terms of Service ("Terms") govern your use of our website and services operated by BCA Agency ("us", "we", or "our").</p>
              </div>
            </section>

            <section>
              <div className="flex items-center gap-3 mb-4">
                <Users className="w-6 h-6 text-green-400" />
                <h2 className="text-2xl font-bold text-white">Use License</h2>
              </div>
              <div className="text-white/70 space-y-4">
                <p>Permission is granted to temporarily download one copy of the materials on our website for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:</p>
                <ul className="space-y-2 ml-6">
                  <li>• Modify or copy the materials</li>
                  <li>• Use the materials for any commercial purpose or for any public display</li>
                  <li>• Attempt to reverse engineer any software contained on our website</li>
                  <li>• Remove any copyright or other proprietary notations from the materials</li>
                </ul>
                <p>This license shall automatically terminate if you violate any of these restrictions and may be terminated by us at any time.</p>
              </div>
            </section>

            <section>
              <div className="flex items-center gap-3 mb-4">
                <AlertCircle className="w-6 h-6 text-orange-400" />
                <h2 className="text-2xl font-bold text-white">Disclaimer</h2>
              </div>
              <div className="text-white/70 space-y-4">
                <div className="bg-orange-500/10 border border-orange-500/20 rounded-xl p-4">
                  <p className="text-orange-200 text-sm font-medium">
                    The materials on our website are provided on an 'as is' basis. To the fullest extent permitted by law, BCA Agency excludes all representations, warranties, conditions and terms.
                  </p>
                </div>
                <p>We make no warranties, expressed or implied, and hereby disclaim and negate all other warranties including without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.</p>
              </div>
            </section>

            <section>
              <div className="flex items-center gap-3 mb-4">
                <Shield className="w-6 h-6 text-red-400" />
                <h2 className="text-2xl font-bold text-white">Limitations</h2>
              </div>
              <div className="text-white/70 space-y-4">
                <p>In no event shall BCA Agency or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on our website, even if we or our authorized representative has been notified orally or in writing of the possibility of such damage.</p>
                <p>Some jurisdictions do not allow limitations on implied warranties, or limitations of liability for consequential or incidental damages, these limitations may not apply to you.</p>
              </div>
            </section>

            <section>
              <h3 className="text-xl font-bold text-white mb-4">User Accounts</h3>
              <div className="text-white/70 space-y-4">
                <p>When you create an account with us, you must provide information that is accurate, complete, and current at all times. You are responsible for safeguarding the password and for all activities that occur under your account.</p>
                <ul className="space-y-2 ml-6">
                  <li>• You must not use our service for any illegal or unauthorized purpose</li>
                  <li>• You must not transmit any worms, viruses, or destructive code</li>
                  <li>• You must not violate any laws in your jurisdiction</li>
                </ul>
              </div>
            </section>

            <section>
              <h3 className="text-xl font-bold text-white mb-4">Prohibited Uses</h3>
              <div className="text-white/70 space-y-4">
                <p>You may not use our service:</p>
                <ul className="space-y-2 ml-6">
                  <li>• For any unlawful purpose or to solicit others to perform unlawful acts</li>
                  <li>• To violate any international, federal, provincial, or state regulations, rules, laws, or local ordinances</li>
                  <li>• To infringe upon or violate our intellectual property rights or the intellectual property rights of others</li>
                  <li>• To harass, abuse, insult, harm, defame, slander, disparage, intimidate, or discriminate</li>
                  <li>• To submit false or misleading information</li>
                </ul>
              </div>
            </section>

            <section>
              <h3 className="text-xl font-bold text-white mb-4">Service Availability</h3>
              <div className="text-white/70 space-y-4">
                <p>We reserve the right to withdraw or amend our service, and any service or material we provide on our website, in our sole discretion without notice. We will not be liable if for any reason all or any part of our service is unavailable at any time or for any period.</p>
              </div>
            </section>

            <section>
              <h3 className="text-xl font-bold text-white mb-4">Governing Law</h3>
              <div className="text-white/70 space-y-4">
                <p>These terms and conditions are governed by and construed in accordance with the laws of [Your Jurisdiction] and you irrevocably submit to the exclusive jurisdiction of the courts in that state or location.</p>
              </div>
            </section>

            <section>
              <h3 className="text-xl font-bold text-white mb-4">Changes to Terms</h3>
              <div className="text-white/70 space-y-4">
                <p>We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is material, we will try to provide at least 30 days notice prior to any new terms taking effect.</p>
              </div>
            </section>

            <section>
              <h3 className="text-xl font-bold text-white mb-4">Contact Information</h3>
              <div className="text-white/70 space-y-4">
                <p>If you have any questions about these Terms of Service, please contact us:</p>
                <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                  <p>Email: <a href="mailto:legal@bca.agency" className="text-blue-400 hover:text-blue-300">legal@bca.agency</a></p>
                  <p>Address: 123 Innovation Drive, Tech City, TC 12345</p>
                </div>
              </div>
            </section>

          </div>
        </motion.div>
      </div>
    </div>
  );
}