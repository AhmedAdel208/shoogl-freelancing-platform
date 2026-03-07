"use client";

interface Props {
  name: string;
  image?: string;
  isOnline?: boolean;
  size?: "sm" | "md" | "lg";
}

const sizes = {
  sm: "w-10 h-10",
  md: "w-12 h-12",
  lg: "w-14 h-14",
};

const dotSizes = {
  sm: "w-2.5 h-2.5",
  md: "w-3.5 h-3.5",
  lg: "w-4 h-4",
};

export default function UserAvatar({
  name,
  image,
  isOnline,
  size = "md",
}: Props) {
  const fallback = `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=1eaaad&color=fff&bold=true&font-size=0.4`;

  return (
    <div className="relative shrink-0">
      <div
        className={`${sizes[size]} rounded-full overflow-hidden border-2 border-white shadow-sm ring-1 ring-gray-100`}
      >
        <img
          src={image || fallback}
          alt={name}
          className="w-full h-full object-cover"
          onError={(e) => {
            (e.target as HTMLImageElement).src = fallback;
          }}
        />
      </div>
      {isOnline && (
        <div
          className={`absolute bottom-0 left-0 ${dotSizes[size]} bg-emerald-500 border-2 border-white rounded-full shadow-sm`}
        />
      )}
    </div>
  );
}
