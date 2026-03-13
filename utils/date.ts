

export const formatTimeAgo = (dateStr: string): string => {
  const date = new Date(dateStr);
  const now = new Date();
  const diffInMs = now.getTime() - date.getTime();

  const minutes = Math.floor(diffInMs / 60000);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (days > 0) return `منذ ${days} يوم`;
  if (hours > 0) return `منذ ${hours} ساعات`;
  if (minutes > 0) return `منذ ${minutes} دقيقة`;
  return "الآن";
};

export const mapStatus = (status: string): string => {
  const map: Record<string, string> = {
    Pending: "قيد الانتظار",
    Open: "مفتوح",
    Completed: "مكتمل",
    InProgress: "قيد التنفيذ",
    Cancelled: "ملغى",
  };
  return map[status] || status;
};


export const formatDeadlineForInput = (
  deadline: string | undefined,
): string => {
  if (!deadline) return "";

  try {
    // If it's already in YYYY-MM-DD format, return as is
    if (/^\d{4}-\d{2}-\d{2}$/.test(deadline)) {
      return deadline;
    }

    // Try to parse as Date object
    const date = new Date(deadline);
    if (!isNaN(date.getTime())) {
      return date.toISOString().split("T")[0]; // Convert to YYYY-MM-DD
    }
  } catch (error) {
    console.error("Error parsing deadline:", error);
  }

  return "";
};


export const formatJoinDate = (dateString?: string): string => {
  return dateString 
    ? new Intl.DateTimeFormat('ar-EG', { month: 'long', year: 'numeric' }).format(new Date(dateString))
    : "فبراير 2026";
};


export const formatLastSeen = (dateString?: string): string => {
  if (!dateString) return "قبل قليل";
  const date = new Date(dateString);
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
  
  if (diffInSeconds < 60) return "الآن";
  
  const diffInMinutes = Math.floor(diffInSeconds / 60);
  if (diffInMinutes < 60) return `منذ ${diffInMinutes} دقيقة`;
  
  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) return `منذ ${diffInHours} ساعة`;
  
  const diffInDays = Math.floor(diffInHours / 24);
  if (diffInDays === 1) return "بالأمس";
  if (diffInDays < 7) return `منذ ${diffInDays} أيام`;
  
  return new Intl.DateTimeFormat('ar-EG', { day: 'numeric', month: 'short' }).format(date);
};

export const formatProjectDeadline = (
  createdAt: string,
  durationInDays: number,
  deadline?: string,
  locale: string = 'ar'
): string => {
  const dateToUse = deadline ? new Date(deadline) : (() => {
    const createdDate = new Date(createdAt);
    const deadlineDate = new Date(createdDate);
    deadlineDate.setDate(deadlineDate.getDate() + durationInDays);
    return deadlineDate;
  })();

  return dateToUse.toLocaleDateString(locale === 'ar' ? "ar-EG" : "en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};
