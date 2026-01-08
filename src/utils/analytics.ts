// Global gtag function declaration
declare function gtag(...args: any[]): void;

interface AnalyticsEvent {
  event: string;
  page?: string;
  section?: string;
  action?: string;
  label?: string;
  value?: number;
  custom_parameters?: Record<string, any>;
}

interface UserLocation {
  ip: string;
  country_name: string;
  city: string;
  region: string;
}

class AnalyticsService {
  private isEnabled: boolean = false;
  private measurementId: string = import.meta.env.VITE_GA_MEASUREMENT_ID || 'G-ZN8TFPGQ9H';
  private isInitialized: boolean = false;

  // Initialize the analytics service (call this early in app lifecycle)
  init() {
    console.log(`🔍 Analytics Service initialized for ${import.meta.env.VITE_ENVIRONMENT || 'development'} environment`);
    console.log(`📊 Google Analytics ID: ${this.measurementId}`);
    // Google Analytics will be loaded when user accepts cookies
  }

  // Initialize Google Analytics
  private initializeGoogleAnalytics() {
    if (this.isInitialized || typeof window === 'undefined') return;

    // Load Google Analytics script
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${this.measurementId}`;
    document.head.appendChild(script);

    // Initialize dataLayer and gtag function
    (window as any).dataLayer = (window as any).dataLayer || [];
    (window as any).gtag = function() {
      (window as any).dataLayer.push(arguments);
    };

    // Configure gtag
    const gtag = (window as any).gtag;
    gtag('js', new Date());

    // Set default consent (denied until user accepts)
    gtag('consent', 'default', {
      'analytics_storage': 'denied',
      'ad_storage': 'denied',
      'personalization_storage': 'denied',
      'functionality_storage': 'granted',
      'security_storage': 'granted'
    });

    // Configure Google Analytics
    gtag('config', this.measurementId, {
      'anonymize_ip': true,
      'cookie_domain': window.location.hostname,
      'custom_map': { 
        'environment': import.meta.env.VITE_ENVIRONMENT || 'development'
      }
    });

    this.isInitialized = true;
  }

  // Enable analytics tracking (called when user accepts cookies)
  enableTracking() {
    // Initialize Google Analytics if not already done
    this.initializeGoogleAnalytics();
    
    this.isEnabled = true;
    
    // Log environment info for debugging
    console.log('Analytics enabled for environment:', import.meta.env.VITE_ENVIRONMENT, 'with ID:', this.measurementId);
    
    // Wait for gtag to be available, then update consent
    const updateConsent = () => {
      if (typeof (window as any).gtag !== 'undefined') {
        const gtag = (window as any).gtag;
        
        gtag('consent', 'update', {
          'analytics_storage': 'granted'
        });
        
        (window as any).gtag_consent_given = true;
        
        // Track the consent acceptance
        this.trackEvent({
          event: 'consent_granted',
          custom_parameters: {
            consent_type: 'analytics'
          }
        });
      } else {
        // Retry after a short delay if gtag isn't ready yet
        setTimeout(updateConsent, 100);
      }
    };
    
    updateConsent();
  }

  // Disable analytics tracking (called when user rejects cookies)
  disableTracking() {
    this.isEnabled = false;
    
    if (typeof gtag !== 'undefined') {
      gtag('consent', 'update', {
        'analytics_storage': 'denied'
      });
      
      window.gtag_consent_given = false;
    }
  }

  // Track custom events
  trackEvent(eventData: AnalyticsEvent) {
    if (!this.isEnabled || typeof gtag === 'undefined') return;

    try {
      gtag('event', eventData.event, {
        'event_category': eventData.section || 'General',
        'event_label': eventData.label,
        'value': eventData.value,
        'page_title': document.title,
        'page_location': window.location.href,
        ...eventData.custom_parameters
      });

      console.log('Analytics event tracked:', eventData);
    } catch (error) {
      console.error('Failed to track analytics event:', error);
    }
  }

  // Track page views
  trackPageView(page?: string) {
    if (!this.isEnabled || typeof gtag === 'undefined') return;

    const currentPage = page || window.location.pathname;
    
    gtag('config', this.measurementId, {
      page_title: document.title,
      page_location: window.location.href,
      page_path: currentPage
    });

    console.log('Page view tracked:', currentPage);
  }

  // Business-specific tracking methods
  trackConsultationClick() {
    this.trackEvent({
      event: 'consultation_click',
      section: 'CTA',
      action: 'click',
      label: 'Google Meet Consultation',
      custom_parameters: {
        button_location: 'hero_section',
        conversion_event: true
      }
    });
  }

  trackCallUsClick() {
    this.trackEvent({
      event: 'call_us_click',
      section: 'Navigation',
      action: 'click',
      label: 'Phone Call CTA',
      custom_parameters: {
        button_location: 'navbar',
        contact_method: 'phone'
      }
    });
  }

  trackOurWorkClick() {
    this.trackEvent({
      event: 'our_work_click',
      section: 'CTA',
      action: 'click',
      label: 'Portfolio Navigation',
      custom_parameters: {
        button_location: 'hero_section',
        destination_page: '/work'
      }
    });
  }

  trackFormSubmission(formType: 'client' | 'support' | 'career', success: boolean = true) {
    this.trackEvent({
      event: success ? 'form_submit_success' : 'form_submit_error',
      section: 'Contact',
      action: 'submit',
      label: `${formType} form`,
      value: success ? 1 : 0,
      custom_parameters: {
        form_type: formType,
        conversion_event: success,
        submission_method: 'formspree'
      }
    });
  }

  trackServiceInterest(service: string) {
    this.trackEvent({
      event: 'service_interest',
      section: 'Services',
      action: 'view',
      label: service,
      custom_parameters: {
        service_name: service,
        interest_level: 'page_visit'
      }
    });
  }

  trackWorkPortfolioView(project?: string) {
    this.trackEvent({
      event: 'portfolio_view',
      section: 'Work',
      action: 'view',
      label: project || 'portfolio_page',
      custom_parameters: {
        project_name: project,
        portfolio_engagement: true
      }
    });
  }

  // Enhanced analytics with location data
  async trackUserLocation() {
    if (!this.isEnabled) return;

    try {
      const response = await fetch('https://ipapi.co/json/');
      const locationData: UserLocation = await response.json();

      this.trackEvent({
        event: 'user_location_tracked',
        section: 'Analytics',
        action: 'location',
        custom_parameters: {
          user_country: locationData.country_name,
          user_city: locationData.city,
          user_region: locationData.region,
          user_ip: locationData.ip
        }
      });

      // Also send to your email via Formspree for business insights
      await this.sendLocationToEmail(locationData);

    } catch (error) {
      console.error('Failed to track user location:', error);
    }
  }

  // Send important data to business email
  private async sendLocationToEmail(locationData: UserLocation) {
    try {
      await fetch('https://formspree.io/f/mgvgywqg', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          _subject: `New Visitor from ${locationData.city}, ${locationData.country_name}`,
          type: 'visitor_analytics',
          country: locationData.country_name,
          city: locationData.city,
          region: locationData.region,
          ip: locationData.ip,
          timestamp: new Date().toISOString(),
          page: window.location.pathname,
          userAgent: navigator.userAgent,
          referrer: document.referrer || 'Direct'
        })
      });
    } catch (error) {
      console.error('Failed to send location data to email:', error);
    }
  }

  // Track business conversion events
  trackConversion(type: 'consultation' | 'contact_form' | 'phone_call', value?: number) {
    this.trackEvent({
      event: 'conversion',
      section: 'Business',
      action: 'convert',
      label: type,
      value: value || 1,
      custom_parameters: {
        conversion_type: type,
        business_value: true,
        timestamp: new Date().toISOString()
      }
    });
  }
}

// Create a global analytics instance
export const analytics = new AnalyticsService();

// Make it available globally for debugging
if (typeof window !== 'undefined') {
  (window as any).analytics = analytics;
}

// TypeScript declarations for gtag
declare global {
  interface Window {
    gtag: (...args: any[]) => void;
    gtag_consent_given: boolean;
    dataLayer: any[];
  }
}