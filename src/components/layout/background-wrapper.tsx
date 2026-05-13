import dynamic from "next/dynamic";

// Spotlight is a small client component that handles pointer tracking and
// framer-motion. We lazy-load it on the client so the BackgroundWrapper can
// stay a server component and send static HTML immediately.
const SpotlightEffect = dynamic(() => import("./spotlight-effect").then((m) => m.SpotlightEffect), {
  ssr: false,
  loading: () => null,
});

export function BackgroundWrapper({ children }: { children: React.ReactNode }) {
  const baseDots =
    "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32' opacity='0.4' width='16' height='16' fill='none'%3E%3Ccircle fill='%238183f4' cx='10' cy='10' r='0.8' /%3E%3C/svg%3E\")";

  return (
    <div className="relative w-full min-h-screen group">
      {/* Base dots */}
      <div
        className="absolute inset-0 pointer-events-none z-0"
        style={{
          backgroundImage: baseDots,
        }}
      />

      {/* Lazy-loaded spotlight effect (client) */}
      <SpotlightEffect />

      {/* Content */}
      <div className="relative z-10 min-h-screen">{children}</div>
    </div>
  );
}
