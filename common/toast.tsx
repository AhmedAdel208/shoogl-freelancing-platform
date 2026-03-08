import { toast as sonnerToast } from "sonner";
import { Check, X, Bell, ShieldAlert, CircleAlert, Info, Loader2 } from "lucide-react";

/**
 * Modern, Calm Toast Component
 * No shadows, focused on UX/UI and premium aesthetic.
 */
const CustomToast = ({ 
  t, 
  message, 
  type, 
  title 
}: { 
  t: any, 
  message: string, 
  type: 'success' | 'error' | 'info' | 'warning' | 'loading', 
  title?: string 
}) => {
  const iconMap = {
    success: <Check className="text-emerald-500" size={20} strokeWidth={2.5} />,
    error: <ShieldAlert className="text-rose-500" size={20} strokeWidth={2.5} />,
    info: <Info className="text-sky-500" size={20} strokeWidth={2.5} />,
    warning: <CircleAlert className="text-amber-500" size={20} strokeWidth={2.5} />,
    loading: <Loader2 className="text-primary animate-spin" size={20} strokeWidth={2.5} />,
  };

  const borderColors = {
    success: 'border-emerald-500/20',
    error: 'border-rose-500/20',
    info: 'border-sky-500/20',
    warning: 'border-amber-500/20',
    loading: 'border-primary/20',
  };

  const bgColors = {
    success: 'bg-emerald-500/5',
    error: 'bg-rose-500/5',
    info: 'bg-sky-500/5',
    warning: 'bg-amber-500/5',
    loading: 'bg-primary/5',
  };

  return (
    <div 
      dir="rtl"
      className={`group relative flex min-w-[340px] items-center justify-between gap-4 overflow-hidden rounded-2xl border ${borderColors[type]} ${bgColors[type]} backdrop-blur-xl p-4 transition-all duration-300 animate-in fade-in slide-in-from-top-4`}
    >
      <div className="flex items-center gap-4">
        {/* Icon Wrapper */}
        <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white dark:bg-slate-900 border ${borderColors[type]}`}>
          {iconMap[type]}
        </div>

        {/* Text content */}
        <div className="flex flex-col gap-0.5">
          {title && (
            <h4 className="font-cairo text-sm font-black text-slate-900 dark:text-white leading-tight">
              {title}
            </h4>
          )}
          <p className="font-cairo text-sm font-bold text-slate-600 dark:text-slate-300 leading-relaxed">
            {message}
          </p>
        </div>
      </div>

      {/* Close Button (Hidden for non-dismissible) */}
      {type !== 'loading' && (
        <button
          onClick={() => sonnerToast.dismiss(t)}
          className="p-1 rounded-full hover:bg-black/5 dark:hover:bg-white/5 text-slate-400 hover:text-slate-600 dark:hover:text-white transition-colors cursor-pointer"
        >
          <X size={16} strokeWidth={3} />
        </button>
      )}
    </div>
  );
};

export const toast = {
  success: (message: string, title: string = "تمت العملية بنجاح") => {
    sonnerToast.custom((t) => (
      <CustomToast t={t} message={message} type="success" title={title} />
    ));
  },

  error: (message: string, title: string = "حدث خطأ ما") => {
    sonnerToast.custom((t) => (
      <CustomToast t={t} message={message} type="error" title={title} />
    ));
  },

  info: (message: string, title: string = "تنبيه") => {
    sonnerToast.custom((t) => (
      <CustomToast t={t} message={message} type="info" title={title} />
    ));
  },

  warning: (message: string, title: string = "تحذير") => {
    sonnerToast.custom((t) => (
      <CustomToast t={t} message={message} type="warning" title={title} />
    ));
  },

  loading: (message: string, title: string = "جاري المعالجة...") => {
    return sonnerToast.custom((t) => (
      <CustomToast t={t} message={message} type="loading" title={title} />
    ));
  },

  dismiss: sonnerToast.dismiss,
};
