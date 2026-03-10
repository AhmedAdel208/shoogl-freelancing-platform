import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { userService } from "@/lib/api/user";
import { toast } from "@/common/toast";
import { UpdateProfilePayload, UserProfile } from "@/types/user";

export function useProfile() {
  return useQuery<UserProfile>({
    queryKey: ["profile"],
    queryFn: () => userService.getProfile(),
    staleTime: 1000 * 60 * 5, 
  });
}

export function useUpdateBio(onSuccessCb?: () => void) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (newBio: string) => userService.updateBio({ bio: newBio }),
    onSuccess: () => {
      toast.success("تم تحديث السيرة الذاتية بنجاح");
      queryClient.invalidateQueries({ queryKey: ["profile"] });
      onSuccessCb?.();
    },
    onError: (error: any) => {
      toast.error(error?.message || "فشل في تحديث السيرة الذاتية");
    },
  });
}

export function useUpdateProfile(onSuccessCb?: () => void) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: UpdateProfilePayload) => userService.updateProfile(data),
    onSuccess: () => {
      toast.success("تم تحديث الملف الشخصي بنجاح");
      queryClient.invalidateQueries({ queryKey: ["profile"] });
      onSuccessCb?.();
    },
    onError: (error: any) => {
      toast.error(error?.message || "فشل في تحديث الملف الشخصي");
    },
  });
}

export function useCoverImage(id?: string) {
  return useQuery({
    queryKey: ["cover-image", id],
    queryFn: () => userService.getCoverImage(id!),
    enabled: !!id,
    staleTime: 1000 * 60 * 5, 
  });
}

export function useUploadCoverImage() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (file: File) => userService.uploadCoverImage(file),
    onSuccess: () => {
      toast.success("تم تحديث صورة الغلاف بنجاح");
      queryClient.invalidateQueries({ queryKey: ["profile"] });
      queryClient.invalidateQueries({ queryKey: ["cover-image"] });
    },
    onError: () => {
      toast.error("فشل في تحميل صورة الغلاف");
    },
  });
}
export function useUploadProfilePicture() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (file: File) => userService.uploadProfilePicture(file),
    onSuccess: () => {
      toast.success("تم تحديث الصورة الشخصية بنجاح");
      queryClient.invalidateQueries({ queryKey: ["profile"] });
      queryClient.invalidateQueries({ queryKey: ["freelancers"] });
    },
    onError: () => {
      toast.error("فشل في تحميل الصورة الشخصية");
    },
  });
}

// Language Hooks
export function useAddLanguage() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: { languageName: string; proficiencyLevel: string }) =>
      userService.addLanguage(data),
    onSuccess: () => {
      toast.success("تم إضافة اللغة بنجاح");
      queryClient.invalidateQueries({ queryKey: ["profile"] });
    },
    onError: (error: any) => {
      toast.error(error?.message || "فشل في إضافة اللغة");
    },
  });
}

export function useRemoveLanguage() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => userService.removeLanguage(id),
    onSuccess: () => {
      toast.success("تم حذف اللغة بنجاح");
      queryClient.invalidateQueries({ queryKey: ["profile"] });
    },
    onError: (error: any) => {
      toast.error(error?.message || "فشل في حذف اللغة");
    },
  });
}

// Certificate Hooks
export function useAddCertificate() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: {
      title: string;
      issuer?: string;
      issueDate?: string;
      certificateFile?: File;
    }) => userService.addCertificate(data),
    onSuccess: () => {
      toast.success("تم إضافة الشهادة بنجاح");
      queryClient.invalidateQueries({ queryKey: ["profile"] });
    },
    onError: (error: any) => {
      toast.error(error?.message || "فشل في إضافة الشهادة");
    },
  });
}

export function useRemoveCertificate() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => userService.removeCertificate(id),
    onSuccess: () => {
      toast.success("تم حذف الشهادة بنجاح");
      queryClient.invalidateQueries({ queryKey: ["profile"] });
    },
    onError: (error: any) => {
      toast.error(error?.message || "فشل في حذف الشهادة");
    },
  });
}
