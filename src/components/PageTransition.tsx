import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export default function PageTransition() {
  const location = useLocation();

  useEffect(() => {
    // Trigger view transition on route change
    if (document.startViewTransition) {
      document.startViewTransition(() => {
        // React will update the DOM here
      });
    }
  }, [location.pathname]);

  return null;
}
