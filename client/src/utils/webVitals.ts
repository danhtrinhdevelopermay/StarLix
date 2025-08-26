export function reportWebVitals(onPerfEntry?: (metric: any) => void) {
  if (onPerfEntry && onPerfEntry instanceof Function) {
    // Core Web Vitals monitoring - simplified without external dependencies
    if ('web-vitals' in window) {
      // If web-vitals library is available, use it
      return;
    }
    
    // Basic performance monitoring using PerformanceObserver
    try {
      // Monitor LCP (Largest Contentful Paint)
      const lcpObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        const lastEntry = entries[entries.length - 1];
        onPerfEntry({
          name: 'LCP',
          value: lastEntry.startTime,
          delta: lastEntry.startTime,
        });
      });
      lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });

      // Monitor FID (First Input Delay)
      const fidObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        entries.forEach((entry: any) => {
          onPerfEntry({
            name: 'FID',
            value: entry.processingStart - entry.startTime,
            delta: entry.processingStart - entry.startTime,
          });
        });
      });
      fidObserver.observe({ entryTypes: ['first-input'] });

      // Monitor CLS (Cumulative Layout Shift)
      let clsValue = 0;
      const clsObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        entries.forEach((entry: any) => {
          if (!entry.hadRecentInput) {
            clsValue += entry.value;
            onPerfEntry({
              name: 'CLS',
              value: clsValue,
              delta: entry.value,
            });
          }
        });
      });
      clsObserver.observe({ entryTypes: ['layout-shift'] });
    } catch (e) {
      console.warn('Performance monitoring not supported in this browser');
    }
  }
}

export function optimizeForWebVitals() {
  // Optimize images loading
  if ('loading' in HTMLImageElement.prototype) {
    const images = document.querySelectorAll('img[data-lazy]');
    images.forEach((img) => {
      (img as HTMLImageElement).src = img.getAttribute('data-lazy') || '';
      img.removeAttribute('data-lazy');
    });
  }

  // Add resource hints for performance
  const resourceHints = [
    { rel: 'dns-prefetch', href: '//fonts.googleapis.com' },
    { rel: 'dns-prefetch', href: '//fonts.gstatic.com' },
    { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
    { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossOrigin: 'anonymous' },
  ];

  resourceHints.forEach(({ rel, href, crossOrigin }) => {
    if (!document.querySelector(`link[href="${href}"]`)) {
      const link = document.createElement('link');
      link.rel = rel;
      link.href = href;
      if (crossOrigin) link.crossOrigin = crossOrigin;
      document.head.appendChild(link);
    }
  });

  // Optimize viewport for mobile performance
  const viewport = document.querySelector('meta[name="viewport"]');
  if (viewport) {
    viewport.setAttribute('content', 'width=device-width, initial-scale=1.0, maximum-scale=5.0, user-scalable=yes');
  }
}