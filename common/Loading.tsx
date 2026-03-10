export default function Loading() {
  return (
    <div className="min-h-[90vh] flex flex-col items-center justify-center px-4">
      {/* Premium Loader */}
      <div className="relative w-15 h-15 mb-10">
        {/* Outer Ring */}
        <div className="absolute inset-0 border-4 border-primary/20 rounded-full"></div>
        {/* Spinning Gradient Ring */}
        <div className="absolute inset-0 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>

      </div>
    </div>
  );
}
