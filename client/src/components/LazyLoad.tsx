import { useState, useRef, useEffect, ReactNode } from "react";

interface LazyLoadProps {
  children: ReactNode;
  height?: number;
  className?: string;
  threshold?: number;
  rootMargin?: string;
}

export function LazyLoad({
  children,
  height = 200,
  className = "",
  threshold = 0.1,
  rootMargin = "50px",
}: LazyLoadProps) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold,
        rootMargin,
      }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [threshold, rootMargin]);

  return (
    <div 
      ref={ref} 
      className={className}
      style={{ minHeight: height }}
    >
      {isVisible ? (
        children
      ) : (
        <div 
          className="skeleton animate-pulse bg-gray-200 dark:bg-gray-700 rounded"
          style={{ height }}
        />
      )}
    </div>
  );
}