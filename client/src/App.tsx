import { Switch, Route } from "wouter";
import { Suspense, lazy, memo } from "react";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { useAuth } from "@/hooks/useAuth";
import Home from "@/pages/home";
import Login from "@/pages/login";
import Register from "@/pages/register";
import NotFound from "@/pages/not-found";
import Terms from "@/pages/terms";
import Privacy from "@/pages/privacy";
import GradientBackground from "@/components/GradientBackground";
import { MD3FullPageLoading } from "@/components/md3-loading-indicator";

// Lazy load heavy pages for better performance with prefetch hints
const Admin = lazy(() => 
  import("@/pages/admin").then(module => {
    // Prefetch related components when loaded
    import("@/pages/get-credit");
    return module;
  })
);
const GetCredit = lazy(() => import("@/pages/get-credit"));
const PhotoAITools = lazy(() => import("@/pages/photai-tools"));
const Landing = lazy(() => 
  import("@/pages/landing").then(module => {
    // Prefetch login/register for likely next navigation
    import("@/pages/login");
    import("@/pages/register");
    return module;
  })
);
const Blog = lazy(() => import("@/pages/blog"));
const BlogDetail = lazy(() => import("@/pages/blog-detail"));

const Router = memo(function Router() {
  const { isAuthenticated, isLoading } = useAuth();

  // Show loading spinner while checking authentication
  if (isLoading) {
    return (
      <MD3FullPageLoading 
        label="Đang tải" 
        data-testid="loading-authentication"
      />
    );
  }

  return (
    <div className="min-h-screen relative z-10">
      <Suspense fallback={<MD3FullPageLoading label="Đang tải trang" data-testid="loading-page" />}>
        <Switch>
          {isAuthenticated ? (
            // Authenticated routes
            <>
              <Route path="/" component={Home} />
              <Route path="/admin" component={Admin} />
              <Route path="/get-credit" component={GetCredit} />
              <Route path="/photai-tools" component={PhotoAITools} />
              {/* Redirect to home if trying to access login/register while authenticated */}
              <Route path="/login" component={Home} />
              <Route path="/register" component={Home} />
            </>
          ) : (
            // Non-authenticated routes
            <>
              <Route path="/" component={Landing} />
              <Route path="/blog" component={Blog} />
              <Route path="/blog/:id" component={BlogDetail} />
              <Route path="/login" component={Login} />
              <Route path="/register" component={Register} />
              <Route path="/terms" component={Terms} />
              <Route path="/privacy" component={Privacy} />
              {/* Redirect authenticated routes to landing when not authenticated */}
              <Route path="/admin" component={Landing} />
              <Route path="/home" component={Landing} />
              <Route path="/get-credit" component={Landing} />
              <Route path="/photai-tools" component={Landing} />
            </>
          )}
        </Switch>
      </Suspense>
    </div>
  );
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <div className="relative min-h-screen bg-[var(--fluent-neutral-background-canvas)] text-[var(--fluent-neutral-foreground-1)]">
          <GradientBackground />
          <Toaster />
          <Router />
        </div>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
