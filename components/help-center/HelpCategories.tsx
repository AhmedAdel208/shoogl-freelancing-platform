import { BookOpen, CreditCard, User, Briefcase, Shield, Settings, ArrowRight, Star } from "lucide-react";

interface Category {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  articles: number;
  color: string;
  features?: string[];
}

interface HelpCategoriesProps {
  onCategorySelect?: (categoryId: string) => void;
}

export default function HelpCategories({ onCategorySelect }: HelpCategoriesProps) {
  const categories: Category[] = [
    {
      id: "getting-started",
      title: "كيفية البدء",
      description: "كل ما تحتاج لمعرفته لتبدأ استخدام شوغول",
      icon: <BookOpen className="w-8 h-8" />,
      articles: 12,
      color: "from-blue-500 to-blue-600",
      features: ["تسجيل", "الملف الشخصي", "البحث عن المشاريع"]
    },
    {
      id: "payments",
      title: "الدفع والأسعار",
      description: "معلومات حول الدفعات، الأسعار، والرسوم",
      icon: <CreditCard className="w-8 h-8" />,
      articles: 8,
      color: "from-green-500 to-green-600",
      features: ["طرق الدفع", "الرسوم", "الفواتير"]
    },
    {
      id: "account",
      title: "الحساب والملف الشخصي",
      description: "إدارة حسابك وملفك الشخصي",
      icon: <User className="w-8 h-8" />,
      articles: 15,
      color: "from-purple-500 to-purple-600",
      features: ["الأمان", "الخصوصية", "الإعدادات"]
    },
    {
      id: "projects",
      title: "المشاريع والعروض",
      description: "كل شيء عن المشاريع والعروض",
      icon: <Briefcase className="w-8 h-8" />,
      articles: 20,
      color: "from-orange-500 to-orange-600",
      features: ["إنشاء مشروع", "العروض", "التقييم"]
    },
    {
      id: "safety",
      title: "السلامة والأمان",
      description: "كيف نحمي بياناتك وصفقاتك",
      icon: <Shield className="w-8 h-8" />,
      articles: 6,
      color: "from-red-500 to-red-600",
      features: ["التشفير", "الخصوصية", "الدعم"]
    },
    {
      id: "technical",
      title: "الدعم الفني",
      description: "مساعدة فنية وحل المشاكل",
      icon: <Settings className="w-8 h-8" />,
      articles: 10,
      color: "from-gray-500 to-gray-600",
      features: ["استكشاف الأخطاء", "الأداء", "التواصل"]
    }
  ];

  const handleCategoryClick = (categoryId: string) => {
    if (onCategorySelect) {
      onCategorySelect(categoryId);
    }
  };

  return (
    <div>
      <div 
        className="mb-12 animate-in fade-in slide-in-from-bottom-8 duration-700"
      >
        <div className="text-center mb-8">
          <h2 className="text-4xl font-bold text-white mb-4">
            تصفح حسب الفئة
            <span className="block text-2xl font-light text-gray-400 mt-2">
              اختر الفئة التي تهمك
            </span>
          </h2>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto leading-relaxed">
            قم باختيار الفئة المناسبة للعثور على المعلومات التي تحتاجها بسرعة وسهولة
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((category, index) => (
            <div
              key={category.id}
              onClick={() => handleCategoryClick(category.id)}
              className="group relative bg-linear-to-br from-gray-900 to-gray-800 rounded-2xl border border-gray-700 p-8 hover:shadow-2xl transition-all  cursor-pointer transform hover:-translate-y-2 animate-in fade-in zoom-in-95 duration-500"
            >
              {/* Background Gradient */}
              <div className={`absolute inset-0 bg-linear-to-br ${category.color} rounded-2xl opacity-0 group-hover:opacity-20 transition-opacity duration-500`}></div>
              
              {/* Content */}
              <div className="relative z-10">
                {/* Icon with animation */}
                <div className={`w-20 h-20 rounded-2xl bg-linear-to-br ${category.color} flex items-center justify-center text-white mb-6 transform transition-all duration-500 group-hover:scale-110 group-hover:rotate-3 shadow-lg`}>
                  {category.icon}
                </div>
                
                {/* Title and Description */}
                <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-transparent group-hover:bg-linear-to-r group-hover:bg-clip-text group-hover:from-blue-400 group-hover:to-blue-600 transition-all duration-300">
                  {category.title}
                </h3>
                <p className="text-gray-400 mb-6 leading-relaxed">
                  {category.description}
                </p>
                
                {/* Features */}
                {category.features && (
                  <div className="flex flex-wrap gap-2 mb-6">
                    {category.features.map((feature, idx) => (
                      <span 
                        key={idx}
                        className="bg-gray-700/50 text-gray-300 px-3 py-1 rounded-full text-xs font-medium border border-gray-600"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>
                )}
                
                {/* Stats */}
                <div className="flex items-center justify-between pt-4 border-t border-gray-700">
                  <div className="flex items-center space-x-4 space-x-reverse">
                    <div className="flex items-center">
                      <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                      <span className="text-sm text-gray-400 mr-1">
                        {category.articles} مقال
                      </span>
                    </div>
                  </div>
                  <button className="text-blue-400 hover:text-blue-300 font-semibold text-sm transition-colors duration-200 flex items-center group-hover:translate-x-2">
                    استكشف الفئة
                    <ArrowRight className="w-4 h-4 mr-2 transition-transform duration-200 group-hover:translate-x-1" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
