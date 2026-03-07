"use client";
import { useState, useEffect } from "react";
import { Star, X, Send } from "lucide-react";

interface EvaluationToastProps {
  jobRequestId: number;
  freelancerId: string;
  onSubmit: (jobRequestId: number, freelancerId: string, rating: number, comment: string) => Promise<void>;
  onClose: () => void;
}

export default function EvaluationToast({ jobRequestId, freelancerId, onSubmit, onClose }: EvaluationToastProps) {
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(() => {
      onClose();
    }, 200);
  };

  const handleSubmit = async () => {
    if (isSubmitting) return;

    setIsSubmitting(true);
    try {
      await onSubmit(jobRequestId, freelancerId, rating, comment);
      onClose();
    } catch (error) {
      console.error("Error submitting evaluation:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      dir="rtl"
      className={`fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-md transition-opacity duration-200 ${isVisible ? "opacity-100" : "opacity-0"
        }`}
      onClick={handleClose}
    >
      <div
        className="bg-white rounded-2xl shadow-2xl p-6 min-w-[400px] max-w-[500px] w-full mx-4"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h3 className="text-xl font-bold text-gray-900">تقييم المستقل</h3>
            <p className="text-sm text-gray-600 mt-1">قيم أداء المستقل في هذا المشروع</p>
          </div>
          <button
            onClick={handleClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Stars Rating */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-3">التقييم</label>
          <div className="flex justify-center space-x-2 space-x-reverse">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                onClick={() => setRating(star)}
                className="transition-transform hover:scale-110"
              >
                <Star
                  className={`w-10 h-10 ${star <= rating
                    ? "fill-yellow-400 text-yellow-400"
                    : "text-gray-300"
                    }`}
                />
              </button>
            ))}
          </div>
          <div className="text-center mt-2 text-sm font-medium text-gray-700">
            {rating === 5 && "ممتاز"}
            {rating === 4 && "جيد جداً"}
            {rating === 3 && "جيد"}
            {rating === 2 && "ضعيف"}
            {rating === 1 && "سيء جداً"}
          </div>
        </div>

        {/* Comment */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            تعليقك (اختياري)
          </label>
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="اكتب تعليقك عن تجربتك مع هذا المستقل..."
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
            rows={3}
          />
        </div>

        {/* Buttons */}
        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-2 px-4 rounded-lg transition-colors"
          >
            إلغاء
          </button>
          <button
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-medium py-2 px-4 rounded-lg transition-colors flex items-center justify-center gap-2"
          >
            {isSubmitting ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                جاري الإرسال...
              </>
            ) : (
              <>
                <Send className="w-4 h-4" />
                إرسال التقييم
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
