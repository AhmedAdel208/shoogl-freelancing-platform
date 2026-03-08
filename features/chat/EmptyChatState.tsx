

import { Send } from "lucide-react";

export default function EmptyChatState() {
  return (
    <div className="flex-1 flex flex-col items-center justify-center p-12 text-center space-y-6">
      <div className="w-24 h-24 bg-primary/5 rounded-full flex items-center justify-center text-primary/30">
        <Send size={48} className="-rotate-12" />
      </div>
      <div>
        <h3 className="text-2xl font-black text-gray-900 font-cairo mb-2">
          رسائلك الخاصة
        </h3>
        <p className="text-gray-500 font-medium font-cairo max-w-sm">
          ابدأ بالتواصل مع المستقلين أو أصحاب المشاريع لمناقشة التفاصيل والبدء
          في العمل.
        </p>
      </div>
    </div>
  );
}
