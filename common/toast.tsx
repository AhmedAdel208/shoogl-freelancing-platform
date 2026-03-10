import { toast as sonnerToast } from "sonner";
import { Check, X, ShieldAlert, CircleAlert, Info, Loader2 } from "lucide-react";


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
  const config = {
    success: {
      icon: <Check className="text-white" size={18} strokeWidth={3} />,
      bg: 'bg-emerald-500',
      iconBg: 'bg-emerald-600',
      border: 'border-emerald-400/30',
      titleColor: 'text-white',
      messageColor: 'text-emerald-50',
      closeColor: 'text-emerald-200 hover:text-white',
    },
    error: {
      icon: <ShieldAlert className="text-white" size={18} strokeWidth={2.5} />,
      bg: 'bg-rose-500',
      iconBg: 'bg-rose-600',
      border: 'border-rose-400/30',
      titleColor: 'text-white',
      messageColor: 'text-rose-50',
      closeColor: 'text-rose-200 hover:text-white',
    },
    info: {
      icon: <Info className="text-white" size={18} strokeWidth={2.5} />,
      bg: 'bg-sky-500',
      iconBg: 'bg-sky-600',
      border: 'border-sky-400/30',
      titleColor: 'text-white',
      messageColor: 'text-sky-50',
      closeColor: 'text-sky-200 hover:text-white',
    },
    warning: {
      icon: <CircleAlert className="text-white" size={18} strokeWidth={2.5} />,
      bg: 'bg-amber-500',
      iconBg: 'bg-amber-600',
      border: 'border-amber-400/30',
      titleColor: 'text-white',
      messageColor: 'text-amber-50',
      closeColor: 'text-amber-200 hover:text-white',
    },
    loading: {
      icon: <Loader2 className="text-white animate-spin" size={18} strokeWidth={2.5} />,
      bg: 'bg-slate-700',
      iconBg: 'bg-slate-800',
      border: 'border-slate-500/30',
      titleColor: 'text-white',
      messageColor: 'text-slate-200',
      closeColor: 'text-slate-400 hover:text-white',
    },
  };

  const c = config[type];

  return (
    <div 
      dir="rtl"
      className={`group relative flex min-w-[340px] items-center justify-between gap-4 overflow-hidden rounded-2xl border shadow-2xl ${c.border} ${c.bg} p-4 transition-all duration-300 animate-in fade-in slide-in-from-top-4`}
    >
      <div className="flex items-center gap-3">
        {/* Icon Wrapper */}
        <div className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl ${c.iconBg}`}>
          {c.icon}
        </div>

        {/* Text content */}
        <div className="flex flex-col gap-0.5">
          {title && (
            <h4 className={`font-cairo text-sm font-black ${c.titleColor} leading-tight`}>
              {title}
            </h4>
          )}
          <p className={`font-cairo text-[13px] font-semibold ${c.messageColor} leading-relaxed`}>
            {message}
          </p>
        </div>
      </div>

      {/* Close Button */}
      {type !== 'loading' && (
        <button
          onClick={() => sonnerToast.dismiss(t)}
          className={`p-1.5 rounded-full hover:bg-white/15 ${c.closeColor} transition-colors cursor-pointer`}
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
