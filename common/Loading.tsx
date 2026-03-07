export default function Loading() {
  return (
    <div className="min-h-[90vh] flex flex-col items-center justify-center px-4">
      {/* Premium Loader */}
      <div className="relative w-20 h-20 mb-10">
        {/* Outer Ring */}
        <div className="absolute inset-0 border-4 border-primary/20 rounded-full"></div>
        {/* Spinning Gradient Ring */}
        <div className="absolute inset-0 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>

        {/* Inner Pulse Circle */}
        {/* <div className="absolute inset-6 bg-linear-to-tr from-primary to-[#6B79B9] rounded-full animate-pulse blur-[1px]"></div> */}
      </div>
    </div>
  );
}
