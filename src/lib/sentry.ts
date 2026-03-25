import * as Sentry from '@sentry/react';

export function initSentry() {
  if (import.meta.env.PROD) {
    Sentry.init({
      dsn: import.meta.env.VITE_SENTRY_DSN,
      // Replace with real DSN from sentry.io (free tier)
      // Client creates account at sentry.io → New Project → React

      integrations: [
        Sentry.browserTracingIntegration(),
        Sentry.replayIntegration({
          maskAllText: false,
          blockAllMedia: false,
        }),
      ],

      // Performance Monitoring
      tracesSampleRate: 0.1, // 10% of transactions

      // Session Replay (for debugging UX issues)
      replaysSessionSampleRate: 0.05, // 5% of sessions
      replaysOnErrorSampleRate: 1.0, // 100% of error sessions

      // Ignore common non-errors
      ignoreErrors: [
        'ResizeObserver loop limit exceeded',
        'Non-Error promise rejection',
        /^Script error/,
        /^Network request failed/,
      ],

      beforeSend(event) {
        // Don't send errors from staff portal (PIN might be in URL)
        if (window.location.pathname.startsWith('/iwa-staff')) {
          return null;
        }
        return event;
      },
    });
  }
}

// Add custom context when user makes reservation
export function setSentryUser(name: string, phone?: string) {
  Sentry.setUser({ username: name, id: phone });
}

// Track custom errors
export function captureError(error: Error, context?: Record<string, unknown>) {
  Sentry.captureException(error, { extra: context });
}
