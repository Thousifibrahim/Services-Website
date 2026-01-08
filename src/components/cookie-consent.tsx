import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Cookie, X, Settings, Check } from "lucide-react";
import { Link } from "wouter";
import { analytics } from "../utils/analytics";



interface CookiePreferences {
  necessary: boolean;
  analytics: boolean;
  marketing: boolean;
  preferences: boolean;
}

const COOKIE_CONSENT_KEY = "bca-cookie-consent";
const COOKIE_PREFERENCES_KEY = "bca-cookie-preferences";

export function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [preferences, setPreferences] = useState<CookiePreferences>({
    necessary: true,
    analytics: false,
    marketing: false,
    preferences: false,
  });

  useEffect(() => {
    const consent = localStorage.getItem(COOKIE_CONSENT_KEY);
    if (!consent) {
      setIsVisible(true);
    }
  }, []);

  const handleAcceptAll = () => {
    const allAccepted = {
      necessary: true,
      analytics: true,
      marketing: true,
      preferences: true,
    };
    
    localStorage.setItem(COOKIE_CONSENT_KEY, "accepted");
    localStorage.setItem(COOKIE_PREFERENCES_KEY, JSON.stringify(allAccepted));
    setIsVisible(false);
    
    // Enable Google Analytics
    analytics.enableTracking();
    
    // Track user location and analytics
    trackUserAnalytics(allAccepted);
  };

  const handleRejectAll = () => {
    const onlyNecessary = {
      necessary: true,
      analytics: false,
      marketing: false,
      preferences: false,
    };
    
    localStorage.setItem(COOKIE_CONSENT_KEY, "rejected");
    localStorage.setItem(COOKIE_PREFERENCES_KEY, JSON.stringify(onlyNecessary));
    setIsVisible(false);
    
    // Disable Google Analytics
    analytics.disableTracking();
  };

  const handleAcceptSelected = () => {
    localStorage.setItem(COOKIE_CONSENT_KEY, "customized");
    localStorage.setItem(COOKIE_PREFERENCES_KEY, JSON.stringify(preferences));
    setIsVisible(false);
    
    if (preferences.analytics) {
      // Enable Google Analytics
      analytics.enableTracking();
      trackUserAnalytics(preferences);
    } else {
      // Disable Google Analytics
      analytics.disableTracking();
    }
  };

  const trackUserAnalytics = async (prefs: CookiePreferences) => {
    if (!prefs.analytics) return;
    
    try {
      // Track user location via Google Analytics and email
      await analytics.trackUserLocation();
      
      // Track initial page view
      analytics.trackPageView();
      
      console.log('Google Analytics enabled and tracking started');
    } catch (error) {
      console.error('Failed to track analytics:', error);
    }
  };

  const togglePreference = (key: keyof CookiePreferences) => {
    if (key === 'necessary') return; // Can't disable necessary cookies
    
    setPreferences(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  if (!isVisible) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 100, opacity: 0 }}
        className="fixed inset-x-0 bottom-0 z-50 p-2 sm:p-4 md:p-6 max-h-[90vh] overflow-y-auto"
      >
        <div className="max-w-4xl mx-auto">
          <div className="bg-black/95 backdrop-blur-md border border-white/10 rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 shadow-2xl">
            <div className="flex flex-col sm:flex-row items-start gap-3 sm:gap-4">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-orange-500/10 rounded-lg sm:rounded-xl flex items-center justify-center shrink-0">
                <Cookie className="w-5 h-5 sm:w-6 sm:h-6 text-orange-400" />
              </div>
              
              <div className="flex-1 w-full">
                <div className="flex items-start justify-between mb-3 sm:mb-4">
                  <h3 className="text-lg sm:text-xl font-bold text-white pr-2">Cookie Preferences</h3>
                  <button
                    onClick={() => setIsVisible(false)}
                    className="text-white/40 hover:text-white transition-colors shrink-0 p-1"
                  >
                    <X className="w-4 h-4 sm:w-5 sm:h-5" />
                  </button>
                </div>
                
                <p className="text-sm sm:text-base text-white/70 mb-4 sm:mb-6 leading-relaxed">
                  We use cookies to enhance your browsing experience, analyze our traffic, and provide personalized content. 
                  By clicking "Accept All", you consent to our use of cookies.{" "}
                  <Link href="/privacy">
                    <span className="text-blue-400 hover:text-blue-300 underline cursor-pointer">
                      Learn more in our Privacy Policy
                    </span>
                  </Link>
                </p>
                
                <AnimatePresence>
                  {showDetails && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="mb-4 sm:mb-6 space-y-3 sm:space-y-4 overflow-hidden"
                    >
                      <div className="grid gap-3 sm:gap-4">
                        {[
                          {
                            key: 'necessary' as keyof CookiePreferences,
                            title: 'Necessary Cookies',
                            description: 'Required for basic website functionality. These cannot be disabled.',
                            required: true
                          },
                          {
                            key: 'analytics' as keyof CookiePreferences,
                            title: 'Analytics Cookies',
                            description: 'Help us understand how visitors interact with our website.',
                            required: false
                          },
                          {
                            key: 'marketing' as keyof CookiePreferences,
                            title: 'Marketing Cookies',
                            description: 'Used to track visitors across websites for advertising purposes.',
                            required: false
                          },
                          {
                            key: 'preferences' as keyof CookiePreferences,
                            title: 'Preference Cookies',
                            description: 'Remember your settings and preferences for a better experience.',
                            required: false
                          }
                        ].map((cookie) => (
                          <div key={cookie.key} className="flex items-start sm:items-center justify-between p-3 sm:p-4 bg-white/5 rounded-lg sm:rounded-xl gap-3">
                            <div className="flex-1 min-w-0">
                              <div className="flex flex-wrap items-center gap-2 mb-1">
                                <h4 className="font-medium text-white text-sm sm:text-base">{cookie.title}</h4>
                                {cookie.required && (
                                  <span className="text-xs bg-blue-500/20 text-blue-300 px-2 py-1 rounded whitespace-nowrap">Required</span>
                                )}
                              </div>
                              <p className="text-xs sm:text-sm text-white/60 leading-relaxed">{cookie.description}</p>
                            </div>
                            <button
                              onClick={() => togglePreference(cookie.key)}
                              disabled={cookie.required}
                              className={`w-10 h-5 sm:w-12 sm:h-6 rounded-full transition-colors shrink-0 ${
                                preferences[cookie.key] || cookie.required
                                  ? 'bg-blue-500'
                                  : 'bg-white/20'
                              } ${cookie.required ? 'cursor-not-allowed' : 'cursor-pointer'}`}
                            >
                              <div
                                className={`w-4 h-4 sm:w-5 sm:h-5 bg-white rounded-full transition-transform ${
                                  preferences[cookie.key] || cookie.required ? 'translate-x-5 sm:translate-x-6' : 'translate-x-0.5'
                                }`}
                              />
                            </button>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
                
                <div className="flex flex-col gap-2 sm:gap-3">
                  {/* Primary Actions Row */}
                  <div className="flex flex-col xs:flex-row gap-2 sm:gap-3">
                    <button
                      onClick={handleAcceptAll}
                      className="flex-1 bg-white text-black font-medium py-2.5 sm:py-3 px-4 sm:px-6 rounded-lg sm:rounded-xl hover:bg-white/90 transition-colors text-sm sm:text-base"
                    >
                      Accept All
                    </button>
                    
                    <button
                      onClick={handleRejectAll}
                      className="flex-1 bg-white/5 border border-white/10 text-white font-medium py-2.5 sm:py-3 px-4 sm:px-6 rounded-lg sm:rounded-xl hover:bg-white/10 transition-colors text-sm sm:text-base"
                    >
                      Reject All
                    </button>
                  </div>
                  
                  {/* Secondary Actions Row */}
                  <div className="flex flex-col xs:flex-row gap-2 sm:gap-3">
                    <button
                      onClick={() => setShowDetails(!showDetails)}
                      className="flex-1 flex items-center justify-center gap-2 bg-white/5 border border-white/10 text-white font-medium py-2.5 sm:py-3 px-3 sm:px-4 rounded-lg sm:rounded-xl hover:bg-white/10 transition-colors text-sm sm:text-base"
                    >
                      <Settings className="w-3 h-3 sm:w-4 sm:h-4" />
                      {showDetails ? 'Hide Options' : 'Customize'}
                    </button>
                    
                    {showDetails && (
                      <button
                        onClick={handleAcceptSelected}
                        className="flex-1 flex items-center justify-center gap-2 bg-blue-500 text-white font-medium py-2.5 sm:py-3 px-3 sm:px-4 rounded-lg sm:rounded-xl hover:bg-blue-600 transition-colors text-sm sm:text-base"
                      >
                        <Check className="w-3 h-3 sm:w-4 sm:h-4" />
                        Save Preferences
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}