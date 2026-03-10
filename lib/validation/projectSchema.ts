import { z } from "zod";

export const createProjectSchema = z.object({
  title: z
    .string()
    .min(1, "عنوان الطلب مطلوب")
    .min(5, "يجب أن يكون العنوان 5 أحرف على الأقل"),
  description: z
    .string()
    .min(1, "تفاصيل الإعلان مطلوبة")
    .min(10, "يجب أن تكون التفاصيل 10 حروفاً على الأقل"),
  budget: z.number().min(1, "السعر مطلوب"),
  duration: z.number().min(1, "المدة مطلوبة").max(365, "يجب ألا تتجاوز مدة التنفيذ 365 يوماً"),
  deadline: z.string().min(1, "الموعد النهائي مطلوب"),
  skillIds: z.array(z.number()).min(1, "يجب تحديد مهارة واحدة على الأقل"),
});

export type CreateProjectFormData = z.infer<typeof createProjectSchema>;
