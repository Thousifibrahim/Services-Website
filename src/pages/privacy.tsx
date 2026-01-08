import { motion } from "framer-motion";
import { Shield, Eye, Cookie, Database, UserCheck } from "lucide-react";

export default function Privacy() {
  return (
    <div className="min-h-screen bg-background pt-32 pb-20 px-4">
      <div className="container max-w-4xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <div className="w-16 h-16 bg-blue-500/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <Shield className="w-8 h-8 text-blue-400" />
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-4 tracking-tight">Privacy Policy</h1>
          <p className="text-xl text-white/40">How we collect, use, and protect your information</p>
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
                <Eye className="w-6 h-6 text-blue-400" />
                <h2 className="text-2xl font-bold text-white">Information We Collect</h2>
              </div>
              <div className="text-white/70 space-y-4">
                <p>We collect information to provide better services to our users. This includes:</p>
                <ul className="space-y-2 ml-6">
                  <li>• <strong>Personal Information:</strong> Name, email address, phone number, and company details when you fill out our contact forms</li>
                  <li>• <strong>Technical Data:</strong> IP address, browser type, device information, and operating system</li>
                  <li>• <strong>Usage Analytics:</strong> Pages visited, time spent on site, click patterns, and user interactions</li>
                  <li>• <strong>Communication Data:</strong> Messages sent through our contact forms and support channels</li>
                </ul>
              </div>
            </section>

            <section>
              <div className="flex items-center gap-3 mb-4">
                <Cookie className="w-6 h-6 text-orange-400" />
                <h2 className="text-2xl font-bold text-white">Cookies and Tracking</h2>
              </div>
              <div className="text-white/70 space-y-4">
                <p>We use cookies and similar technologies to enhance your browsing experience:</p>
                <ul className="space-y-2 ml-6">
                  <li>• <strong>Essential Cookies:</strong> Required for basic website functionality</li>
                  <li>• <strong>Analytics Cookies:</strong> Help us understand how you interact with our website</li>
                  <li>• <strong>Preference Cookies:</strong> Remember your choices and settings</li>
                </ul>
                <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-4 mt-6">
                  <p className="text-blue-200 text-sm">
                    <strong>Cookie Control:</strong> You can manage your cookie preferences at any time. 
                    Essential cookies cannot be disabled as they are necessary for the website to function properly.
                  </p>
                </div>
              </div>
            </section>

            <section>
              <div className="flex items-center gap-3 mb-4">
                <Database className="w-6 h-6 text-green-400" />
                <h2 className="text-2xl font-bold text-white">How We Use Your Information</h2>
              </div>
              <div className="text-white/70 space-y-4">
                <p>We use the collected information for the following purposes:</p>
                <ul className="space-y-2 ml-6">
                  <li>• To respond to your inquiries and provide customer support</li>
                  <li>• To improve our website performance and user experience</li>
                  <li>• To analyze user behavior and optimize our services</li>
                  <li>• To send you updates about our services (with your consent)</li>
                  <li>• To comply with legal obligations and protect our rights</li>
                </ul>
              </div>
            </section>

            <section>
              <div className="flex items-center gap-3 mb-4">
                <UserCheck className="w-6 h-6 text-purple-400" />
                <h2 className="text-2xl font-bold text-white">Your Rights and Choices</h2>
              </div>
              <div className="text-white/70 space-y-4">
                <p>You have the following rights regarding your personal information:</p>
                <ul className="space-y-2 ml-6">
                  <li>• <strong>Access:</strong> Request a copy of your personal data we hold</li>
                  <li>• <strong>Correction:</strong> Update or correct your personal information</li>
                  <li>• <strong>Deletion:</strong> Request deletion of your personal data</li>
                  <li>• <strong>Objection:</strong> Object to processing of your personal data</li>
                  <li>• <strong>Portability:</strong> Receive your data in a machine-readable format</li>
                </ul>
                <p className="mt-4">To exercise these rights, please contact us at <a href="mailto:privacy@bca.agency" className="text-blue-400 hover:text-blue-300">privacy@bca.agency</a></p>
              </div>
            </section>

            <section>
              <h3 className="text-xl font-bold text-white mb-4">Third-Party Services</h3>
              <div className="text-white/70 space-y-4">
                <p>We use the following third-party services that may collect information:</p>
                <ul className="space-y-2 ml-6">
                  <li>• <strong>Formspree:</strong> For handling contact form submissions</li>
                  <li>• <strong>Analytics Services:</strong> For website performance monitoring</li>
                  <li>• <strong>Content Delivery Networks:</strong> For faster website loading</li>
                </ul>
              </div>
            </section>

            <section>
              <h3 className="text-xl font-bold text-white mb-4">Data Security</h3>
              <div className="text-white/70 space-y-4">
                <p>We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.</p>
              </div>
            </section>

            <section>
              <h3 className="text-xl font-bold text-white mb-4">Contact Information</h3>
              <div className="text-white/70 space-y-4">
                <p>If you have any questions about this Privacy Policy, please contact us:</p>
                <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                  <p>Email: <a href="mailto:privacy@bca.agency" className="text-blue-400 hover:text-blue-300">privacy@bca.agency</a></p>
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