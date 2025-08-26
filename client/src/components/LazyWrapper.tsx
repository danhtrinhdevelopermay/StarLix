import { Suspense, ComponentType } from "react";
import { MD3LoadingIndicator } from "@/components/md3-loading-indicator";

interface LazyWrapperProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
  className?: string;
}

export function LazyWrapper({ children, fallback, className }: LazyWrapperProps) {
  return (
    <div className={className}>
      <Suspense 
        fallback={
          fallback || (
            <div className="flex items-center justify-center min-h-[200px]">
              <MD3LoadingIndicator size="medium" />
            </div>
          )
        }
      >
        {children}
      </Suspense>
    </div>
  );
}

export function withLazyWrapper<T extends object>(
  Component: ComponentType<T>,
  fallback?: React.ReactNode
) {
  return function WrappedComponent(props: T) {
    return (
      <LazyWrapper fallback={fallback}>
        <Component {...props} />
      </LazyWrapper>
    );
  };
}