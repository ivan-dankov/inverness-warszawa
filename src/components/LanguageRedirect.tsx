import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { detectPreferredLanguage } from '@/lib/language-routes';

/**
 * Component that automatically redirects to user's preferred language
 * Used on the root path to detect and redirect to /pl/, /uk/, /ru/, or /en/
 */
export const LanguageRedirect = () => {
  const navigate = useNavigate();
  
  useEffect(() => {
    const preferredLang = detectPreferredLanguage();
    navigate(`/${preferredLang}`, { replace: true });
  }, [navigate]);
  
  // Show minimal loading state during redirect
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="animate-pulse text-muted-foreground">
        Loading...
      </div>
    </div>
  );
};
