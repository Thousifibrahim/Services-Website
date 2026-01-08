import { Switch, Route } from "wouter";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import Home from "@/pages/home";
import Services from "@/pages/services";
import Work from "@/pages/work";
import Contact from "@/pages/contact";
import Privacy from "@/pages/privacy";
import Terms from "@/pages/terms";
import { Navbar } from "@/components/navbar";
import { CookieConsent } from "@/components/cookie-consent";
import { SmoothScroll } from "@/components/smooth-scroll";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/services" component={Services} />
      <Route path="/work" component={Work} />
      <Route path="/contact" component={Contact} />
      <Route path="/privacy" component={Privacy} />
      <Route path="/terms" component={Terms} />
      <Route component={NotFound} />
    </Switch>
  );
}

import { Footer } from "@/components/footer";

import ScrollToTop from "@/components/scroll-to-top";

function App() {
  return (
    <TooltipProvider>
      <ScrollToTop />
      <SmoothScroll />
      <Toaster />
      <Navbar />
      <Router />
      <Footer />
      <CookieConsent />
    </TooltipProvider>
  );
}

export default App;