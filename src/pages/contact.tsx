import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { useBusinessAnalytics } from "../hooks/useBusinessAnalytics";
import { FadeIn, TextReveal } from "@/components/ui/scroll-animation";

const customerFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  company: z.string().optional(),
  phone: z.string().optional(),
  budget: z.string().optional(),
  timeline: z.string().optional(),
  service: z.string().optional(),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

const supportFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

const careersFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

const TABS = [
  { id: "customer", label: "Start a Project" },
  { id: "support", label: "Get Support" },
  { id: "careers", label: "Join the Team" },
];

export default function Contact() {
  const [activeTab, setActiveTab] = useState("customer");
  const [showSuccess, setShowSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const { trackFormSubmission } = useBusinessAnalytics();

  const customerForm = useForm<z.infer<typeof customerFormSchema>>({
    resolver: zodResolver(customerFormSchema),
    defaultValues: {
      name: "",
      email: "",
      company: "",
      phone: "",
      budget: "",
      timeline: "",
      service: "",
      message: "",
    },
  });

  const supportForm = useForm<z.infer<typeof supportFormSchema>>({
    resolver: zodResolver(supportFormSchema),
    defaultValues: { name: "", email: "", message: "" },
  });

  const careersForm = useForm<z.infer<typeof careersFormSchema>>({
    resolver: zodResolver(careersFormSchema),
    defaultValues: { name: "", email: "", message: "" },
  });

  const submitForm = async (values: any) => {
    setIsSubmitting(true);
    try {
      const formData = new FormData();
      Object.keys(values).forEach(key => formData.append(key, values[key]));
      formData.append('submissionType', activeTab);

      const response = await fetch('https://formspree.io/f/mgvgywqg', {
        method: 'POST',
        body: formData,
        headers: {
          'Accept': 'application/json'
        }
      });

      if (response.ok) {
        trackFormSubmission(activeTab as 'client' | 'support' | 'career', true);

        setShowSuccess(true);
        setTimeout(() => setShowSuccess(false), 5000);

        toast({
          title: "Message sent successfully!",
          description: "We'll get back to you shortly.",
        });
        customerForm.reset();
        supportForm.reset();
        careersForm.reset();
      } else {
        trackFormSubmission(activeTab as 'client' | 'support' | 'career', false);
        throw new Error('Failed to submit form');
      }
    } catch {
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background pt-32 pb-20 px-4 relative overflow-hidden">
      {/* Background */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-1/3 left-1/4 w-[600px] h-[600px] bg-blue-500/5 rounded-full blur-[200px]" />
        <div className="absolute bottom-1/3 right-1/4 w-[600px] h-[600px] bg-purple-500/5 rounded-full blur-[200px]" />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150 mix-blend-overlay"></div>
      </div>

      <div className="container max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <FadeIn>
            <span className="text-sm text-white/40 uppercase tracking-widest border border-white/10 px-4 py-2 rounded-full backdrop-blur-sm">Contact Us</span>
          </FadeIn>
          <div className="mt-8">
            <h1 className="text-5xl md:text-8xl font-bold text-white tracking-tighter">
              <TextReveal text="Let's Talk." />
            </h1>
          </div>
          <FadeIn delay={0.4}>
            <p className="text-xl text-white/40 mt-6 max-w-2xl mx-auto leading-relaxed">
              Ready to start your next project? We'd love to hear from you.
            </p>
          </FadeIn>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact Info */}
          <FadeIn delay={0.5} className="space-y-6 h-full">
            <div className="bg-[#0a0a0a]/50 backdrop-blur-md border border-white/10 rounded-3xl p-8 h-full flex flex-col justify-between">
              <div>
                <h3 className="text-2xl font-bold text-white mb-6">Get in Touch</h3>
                <div className="space-y-8">
                  {[
                    { icon: MapPin, label: "Office", value: "123 Innovation Drive, Tech City, TC 12345" },
                    { icon: Phone, label: "Phone", value: "+1 (555) 123-4567" },
                    { icon: Mail, label: "Email", value: "hello@bca.agency" },
                    { icon: Clock, label: "Business Hours", value: "Mon - Fri: 9AM - 6PM EST" }
                  ].map((item, index) => (
                    <div key={index} className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center flex-shrink-0 border border-white/5">
                        <item.icon className="w-5 h-5 text-white/60" />
                      </div>
                      <div>
                        <p className="text-white font-medium mb-1">{item.label}</p>
                        <p className="text-white/40 text-sm leading-relaxed">{item.value}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-12 pt-8 border-t border-white/5">
                <p className="text-white/30 text-sm">Follow us on social media</p>
                <div className="flex gap-4 mt-4">
                  {['Twitter', 'LinkedIn', 'Instagram'].map(social => (
                    <span key={social} className="text-white/60 hover:text-white cursor-pointer transition-colors text-sm">{social}</span>
                  ))}
                </div>
              </div>
            </div>
          </FadeIn>

          {/* Form Section */}
          <FadeIn delay={0.6} className="lg:col-span-2">
            <div className="bg-[#0a0a0a]/80 backdrop-blur-xl border border-white/10 rounded-3xl overflow-hidden shadow-2xl">
              {/* Tab Switcher */}
              <div className="flex p-2 bg-black/40 border-b border-white/5">
                {TABS.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className="flex-1 relative py-4 text-sm font-medium transition-colors z-10"
                  >
                    {activeTab === tab.id && (
                      <motion.div
                        layoutId="activeTab"
                        className="absolute inset-0 bg-white/10 rounded-xl"
                        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                      />
                    )}
                    <span className={`relative z-20 ${activeTab === tab.id ? "text-white" : "text-white/40 hover:text-white/70"}`}>
                      {tab.label}
                    </span>
                  </button>
                ))}
              </div>

              <div className="p-8 md:p-12">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeTab}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    {activeTab === "customer" && (
                      <div className="space-y-6">
                        <div className="mb-8">
                          <h3 className="text-2xl font-bold text-white mb-2">Start a Project</h3>
                          <p className="text-white/40">Tell us about your vision and requirements.</p>
                        </div>
                        <Form {...customerForm}>
                          <form onSubmit={customerForm.handleSubmit(submitForm)} className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                              <FormField
                                control={customerForm.control}
                                name="name"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel className="text-white/60">Full Name *</FormLabel>
                                    <FormControl>
                                      <Input placeholder="John Doe" {...field} className="bg-white/5 border-white/10 text-white h-12 rounded-xl focus:border-white/20 transition-colors" />
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                              <FormField
                                control={customerForm.control}
                                name="email"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel className="text-white/60">Email Address *</FormLabel>
                                    <FormControl>
                                      <Input placeholder="john@company.com" {...field} className="bg-white/5 border-white/10 text-white h-12 rounded-xl focus:border-white/20 transition-colors" />
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                              <FormField
                                control={customerForm.control}
                                name="company"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel className="text-white/60">Company Name</FormLabel>
                                    <FormControl>
                                      <Input placeholder="Acme Inc." {...field} className="bg-white/5 border-white/10 text-white h-12 rounded-xl focus:border-white/20 transition-colors" />
                                    </FormControl>
                                  </FormItem>
                                )}
                              />
                              <FormField
                                control={customerForm.control}
                                name="phone"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel className="text-white/60">Phone Number</FormLabel>
                                    <FormControl>
                                      <Input placeholder="+1 (555) 000-0000" {...field} className="bg-white/5 border-white/10 text-white h-12 rounded-xl focus:border-white/20 transition-colors" />
                                    </FormControl>
                                  </FormItem>
                                )}
                              />
                              <FormField
                                control={customerForm.control}
                                name="service"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel className="text-white/60">Service Interested In</FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                      <FormControl>
                                        <SelectTrigger className="bg-white/5 border-white/10 text-white h-12 rounded-xl focus:border-white/20 transition-colors">
                                          <SelectValue placeholder="Select a service" />
                                        </SelectTrigger>
                                      </FormControl>
                                      <SelectContent className="bg-[#1a1a1a] border-white/10 text-white">
                                        <SelectItem value="data-analytics">Data Analytics</SelectItem>
                                        <SelectItem value="visualization">Visualization</SelectItem>
                                        <SelectItem value="enterprise-dev">Enterprise Web Development</SelectItem>
                                        <SelectItem value="wordpress">WordPress Design</SelectItem>
                                        <SelectItem value="azure">Azure Solution Architecting</SelectItem>
                                        <SelectItem value="lead-gen">Lead Generation</SelectItem>
                                        <SelectItem value="ai-automation">AI Automation</SelectItem>
                                        <SelectItem value="multi-tenant">Multi-tenant Agentic Solution</SelectItem>
                                        <SelectItem value="graphic-design">Graphic Designing</SelectItem>
                                      </SelectContent>
                                    </Select>
                                  </FormItem>
                                )}
                              />
                              <FormField
                                control={customerForm.control}
                                name="budget"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel className="text-white/60">Budget Range</FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                      <FormControl>
                                        <SelectTrigger className="bg-white/5 border-white/10 text-white h-12 rounded-xl focus:border-white/20 transition-colors">
                                          <SelectValue placeholder="Select budget" />
                                        </SelectTrigger>
                                      </FormControl>
                                      <SelectContent className="bg-[#1a1a1a] border-white/10 text-white">
                                        <SelectItem value="5k-15k">$5,000 - $15,000</SelectItem>
                                        <SelectItem value="15k-50k">$15,000 - $50,000</SelectItem>
                                        <SelectItem value="50k-100k">$50,000 - $100,000</SelectItem>
                                        <SelectItem value="100k+">$100,000+</SelectItem>
                                      </SelectContent>
                                    </Select>
                                  </FormItem>
                                )}
                              />
                              <FormField
                                control={customerForm.control}
                                name="timeline"
                                render={({ field }) => (
                                  <FormItem className="md:col-span-2">
                                    <FormLabel className="text-white/60">Project Timeline</FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                      <FormControl>
                                        <SelectTrigger className="bg-white/5 border-white/10 text-white h-12 rounded-xl focus:border-white/20 transition-colors">
                                          <SelectValue placeholder="When do you need this?" />
                                        </SelectTrigger>
                                      </FormControl>
                                      <SelectContent className="bg-[#1a1a1a] border-white/10 text-white">
                                        <SelectItem value="asap">ASAP</SelectItem>
                                        <SelectItem value="1-3months">1-3 months</SelectItem>
                                        <SelectItem value="3-6months">3-6 months</SelectItem>
                                        <SelectItem value="6months+">6+ months</SelectItem>
                                        <SelectItem value="flexible">Flexible</SelectItem>
                                      </SelectContent>
                                    </Select>
                                  </FormItem>
                                )}
                              />
                            </div>
                            <FormField
                              control={customerForm.control}
                              name="message"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel className="text-white/60">Project Details *</FormLabel>
                                  <FormControl>
                                    <Textarea
                                      placeholder="Tell us about your project, goals, and any specific requirements..."
                                      {...field}
                                      className="bg-white/5 border-white/10 text-white min-h-[150px] rounded-xl resize-none focus:border-white/20 transition-colors"
                                    />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            <Button
                              type="submit"
                              disabled={isSubmitting}
                              className="w-full h-14 rounded-xl bg-white text-black hover:bg-white/90 font-medium text-lg transition-all"
                            >
                              {isSubmitting ? "Sending..." : "Submit Enquiry"}
                            </Button>
                          </form>
                        </Form>
                      </div>
                    )}

                    {activeTab === "support" && (
                      <div className="space-y-6">
                        <div className="mb-8">
                          <h3 className="text-2xl font-bold text-white mb-2">Technical Support</h3>
                          <p className="text-white/40">Having issues? Our team is here to help.</p>
                        </div>
                        <Form {...supportForm}>
                          <form onSubmit={supportForm.handleSubmit(submitForm)} className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                              <FormField
                                control={supportForm.control}
                                name="name"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel className="text-white/60">Name</FormLabel>
                                    <FormControl>
                                      <Input placeholder="John Doe" {...field} className="bg-white/5 border-white/10 text-white h-12 rounded-xl focus:border-white/20 transition-colors" />
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                              <FormField
                                control={supportForm.control}
                                name="email"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel className="text-white/60">Email</FormLabel>
                                    <FormControl>
                                      <Input placeholder="john@example.com" {...field} className="bg-white/5 border-white/10 text-white h-12 rounded-xl focus:border-white/20 transition-colors" />
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                            </div>
                            <FormField
                              control={supportForm.control}
                              name="message"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel className="text-white/60">Describe Your Issue</FormLabel>
                                  <FormControl>
                                    <Textarea placeholder="Please describe the issue you're experiencing..." {...field} className="bg-white/5 border-white/10 text-white min-h-[150px] rounded-xl resize-none focus:border-white/20 transition-colors" />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            <Button type="submit" disabled={isSubmitting} className="w-full h-14 rounded-xl bg-white text-black hover:bg-white/90 font-medium text-lg transition-all">
                              {isSubmitting ? "Sending..." : "Submit Support Request"}
                            </Button>
                          </form>
                        </Form>
                      </div>
                    )}

                    {activeTab === "careers" && (
                      <div className="space-y-6">
                        <div className="mb-8">
                          <h3 className="text-2xl font-bold text-white mb-2">Join Our Team</h3>
                          <p className="text-white/40">Interested in working with us? Tell us about yourself.</p>
                        </div>
                        <Form {...careersForm}>
                          <form onSubmit={careersForm.handleSubmit(submitForm)} className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                              <FormField
                                control={careersForm.control}
                                name="name"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel className="text-white/60">Full Name</FormLabel>
                                    <FormControl>
                                      <Input placeholder="John Doe" {...field} className="bg-white/5 border-white/10 text-white h-12 rounded-xl focus:border-white/20 transition-colors" />
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                              <FormField
                                control={careersForm.control}
                                name="email"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel className="text-white/60">Email</FormLabel>
                                    <FormControl>
                                      <Input placeholder="john@example.com" {...field} className="bg-white/5 border-white/10 text-white h-12 rounded-xl focus:border-white/20 transition-colors" />
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                            </div>
                            <FormField
                              control={careersForm.control}
                              name="message"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel className="text-white/60">Tell Us About Yourself</FormLabel>
                                  <FormControl>
                                    <Textarea placeholder="Share your experience, skills, and what role you're interested in..." {...field} className="bg-white/5 border-white/10 text-white min-h-[150px] rounded-xl resize-none focus:border-white/20 transition-colors" />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            <Button type="submit" disabled={isSubmitting} className="w-full h-14 rounded-xl bg-white text-black hover:bg-white/90 font-medium text-lg transition-all">
                              {isSubmitting ? "Sending..." : "Submit Application"}
                            </Button>
                          </form>
                        </Form>
                      </div>
                    )}
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </div>
  );
}