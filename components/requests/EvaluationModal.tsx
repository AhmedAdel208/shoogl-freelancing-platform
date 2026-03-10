"use client";

import React, { useState } from "react";
import { Star, X, Send } from "lucide-react";

interface EvaluationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (rating: number, comment: string) => void;
  isSubmitting?: boolean;
}

export default function EvaluationModal({
  isOpen,
  onClose,
  onSubmit,
  isSubmitting = false,
}: EvaluationModalProps) {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState("");
  const [error, setError] = useState<string | null>(null);

  const ratingLabels = {
    1: "سيء جداً",
    2: "سيء",
    3: "مقبول",
    4: "جيد",
    5: "ممتاز",
  };

  const handleRatingClick = (val: number) => {
    setRating(val);
    if (error && val > 0) setError(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (rating === 0) {
      setError("يرجى اختيار تقييم بالنجوم أولاً");
      return;
    }

    if (comment.trim().length < 5) {
      setError("يرجى كتابة تقييم لا يقل عن 5 أحرف");
      return;
    }

    setError(null);
    onSubmit(rating, comment);
  };

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 z-100 flex items-center justify-center p-4">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300"
          />

          {/* Modal Content */}
          <div
            className="relative w-full max-w-md bg-[#1a2533] rounded-4xl shadow-2xl overflow-hidden border border-white/10 animate-in fade-in zoom-in-95 duration-300"
            dir="rtl"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-white/5">
              <h3 className="text-xl font-black text-white">تقييم المستقل</h3>
              <button
                onClick={onClose}
                className="p-2 hover:bg-white/5 rounded-full text-white/40 hover:text-white transition-colors"
                title="إغلاق"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-8 space-y-8">
              {/* Stars Selection */}
              <div className="flex flex-col items-center gap-4">
                <div className="flex flex-row gap-3">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onMouseEnter={() => setHoverRating(star)}
                      onMouseLeave={() => setHoverRating(0)}
                      onClick={() => handleRatingClick(star)}
                      className="transition-all duration-300 transform active:scale-90"
                    >
                      <Star
                        className={`w-10 h-10 ${
                          (hoverRating || rating) >= star
                            ? "fill-yellow-400 text-yellow-400 drop-shadow-[0_0_8px_rgba(250,204,21,0.4)]"
                            : "fill-transparent text-white/20"
                        }`}
                        strokeWidth={1.5}
                      />
                    </button>
                  ))}
                </div>
                {rating > 0 && (
                  <span
                    className="text-yellow-400 font-bold text-sm bg-yellow-400/10 px-4 py-1 rounded-full animate-in fade-in slide-in-from-top-2 duration-200"
                  >
                    {ratingLabels[rating as keyof typeof ratingLabels]}
                  </span>
                )}
              </div>

              {/* Comment Input */}
              <div className="space-y-3">
                <label className="text-sm font-bold text-white/60 block px-1">
                  تقييمك
                </label>
                <textarea
                  value={comment}
                  onChange={(e) => {
                    setComment(e.target.value);
                    if (error) setError(null);
                  }}
                  placeholder="شارك تجربتك في العمل مع هذا المستقل..."
                  className={`w-full bg-[#1e2a3a] border ${error && !rating ? 'border-red-500/50' : 'border-white/10'} rounded-2xl p-4 text-white text-sm focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all resize-none min-h-[120px] placeholder:text-white/20`}
                  required
                />
              </div>

              {/* Error Message */}
              {error && (
                <div
                  className="text-red-400 text-xs font-bold text-center bg-red-400/10 py-2 rounded-xl border border-red-400/20 animate-in fade-in duration-200"
                >
                    {error}
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex gap-4">
                <button
                  type="submit"
                  disabled={rating === 0 || isSubmitting}
                  className="flex-1 flex items-center justify-center gap-2 bg-primary text-white py-4 rounded-2xl font-black text-sm hover:bg-[#1a9295] disabled:opacity-50 disabled:cursor-not-allowed transition-all active:scale-[0.98] shadow-lg shadow-primary/20"
                >
                  {isSubmitting ? (
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      إرسال التقييم
                    </>
                  )}
                </button>
                <button
                  type="button"
                  onClick={onClose}
                  className="flex-1 bg-white/5 text-white/80 py-4 rounded-2xl font-black text-sm hover:bg-white/10 transition-all active:scale-[0.98]"
                >
                  إلغاء
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
