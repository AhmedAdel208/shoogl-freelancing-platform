import { Loader2 } from "lucide-react";

interface SpinnerProps {
  size?: number;
  className?: string;
  inline?: boolean;
}

export default function Spinner({
  size = 40,
  className = "",
  inline = false,
  fullPage = false,
}: SpinnerProps & { fullPage?: boolean }) {
  const spinnerElement = (
    <Loader2
      size={size}
      className={`animate-spin text-primary ${className}`}
    />
  );

  if (inline) {
    return spinnerElement;
  }

  return (
    <div className={`flex flex-col items-center justify-center gap-4 ${fullPage ? 'fixed inset-0 bg-bg/80 backdrop-blur-sm z-9999' : 'min-h-[400px] py-20 w-full'}`}>
      {spinnerElement}
      <p className="text-gray-medium font-black font-cairo text-sm animate-pulse">جاري التحميل...</p>
    </div>
  );
}
