function Loader({ type = "inline", message = "Loading..." }) {
  // Full page loader (overlay)
  if (type === "page") {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
        <div className="flex flex-col items-center gap-4">
          <span className="h-12 w-12 animate-spin rounded-full border-4 border-white/30 border-t-white" />
          <p className="text-white text-sm font-medium">{message}</p>
        </div>
      </div>
    );
  }

  // Button loader (small spinner)
  if (type === "button") {
    return (
      <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
    );
  }

  // Inline loader (default)
  return (
    <div className="flex items-center justify-center gap-3 py-8">
      <span className="h-6 w-6 animate-spin rounded-full border-2 border-white/40 border-t-white" />
      <p className="text-sm text-white/60">{message}</p>
    </div>
  );
}

export default Loader;
