
export default function ConversationSkeleton() {
  return (
    <div className="flex flex-col   gap-1">
      {[...Array(6)].map((_, i) => (
        <div
          key={i}
          className="w-full flex items-center gap-4 p-4 rounded-2xl border border-transparent"
        >
          {/* Avatar Skeleton */}
          <div className="w-12 h-12 rounded-full bg-gray-100 animate-pulse shrink-0" />
          
          {/* Content Skeleton */}
          <div className="flex-1   space-y-2">
            <div className="flex justify-between items-center">
              <div className="h-4 w-24 bg-gray-100 animate-pulse rounded" />
              <div className="h-3 w-10 bg-gray-50 animate-pulse rounded" />
            </div>
            <div className="h-3 w-full bg-gray-50 animate-pulse rounded" />
          </div>
        </div>
      ))}
    </div>
  );
}
