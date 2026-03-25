import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { SpeedInsights } from '@vercel/speed-insights/react';
import { Analytics } from '@vercel/analytics/react';
import * as Sentry from '@sentry/react';
import { initSentry } from './lib/sentry';
import { trackWebVitals } from './lib/analytics';
import { AppErrorFallback } from './components/ErrorBoundary';
import './i18n';
import App from './App';
import ScrollToTop from './components/ScrollToTop';
import './styles/animations.css';

initSentry();
trackWebVitals();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Sentry.ErrorBoundary fallback={<AppErrorFallback />}>
      <HelmetProvider>
        <BrowserRouter>
          <ScrollToTop />
          <App />
          <SpeedInsights />
          <Analytics />
        </BrowserRouter>
      </HelmetProvider>
    </Sentry.ErrorBoundary>
  </StrictMode>,
);
