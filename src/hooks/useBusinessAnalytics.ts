import { useEffect } from 'react';
import { analytics } from '../utils/analytics';

export function useBusinessAnalytics() {
  useEffect(() => {
    // Track page view when component mounts
    analytics.trackPageView();
  }, []);

  const trackConsultationClick = () => {
    analytics.trackConsultationClick();
    // Also track as conversion
    analytics.trackConversion('consultation');
  };

  const trackCallUsClick = () => {
    analytics.trackCallUsClick();
    // Also track as conversion
    analytics.trackConversion('phone_call');
  };

  const trackOurWorkClick = () => {
    analytics.trackOurWorkClick();
  };

  const trackFormSubmission = (formType: 'client' | 'support' | 'career', success: boolean = true) => {
    analytics.trackFormSubmission(formType, success);
    if (success) {
      // Track as conversion
      analytics.trackConversion('contact_form');
    }
  };

  const trackServiceInterest = (service: string) => {
    analytics.trackServiceInterest(service);
  };

  const trackWorkPortfolioView = (project?: string) => {
    analytics.trackWorkPortfolioView(project);
  };

  return {
    trackConsultationClick,
    trackCallUsClick,
    trackOurWorkClick,
    trackFormSubmission,
    trackServiceInterest,
    trackWorkPortfolioView,
  };
}