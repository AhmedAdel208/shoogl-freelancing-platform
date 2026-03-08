"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAllSkills, useAddSkills } from "@/hooks/profile/useSkills";
import { toast } from "@/common/toast";
import { SkillCategory } from "@/types/skills";

export function useSkills() {
  const router = useRouter();
  const [selectedSkillIds, setSelectedSkillIds] = useState<number[]>([]);
  const [expandedCategoryId, setExpandedCategoryId] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  // React Query Fetching
  const { data, isLoading, error } = useAllSkills();

  // Saving Mutation
  const saveSkillsMutation = useAddSkills(() => {
    router.push("/onboarding/bio");
  });

  // Extract and filter categories
  const categories = data?.categories || [];
  
  const filteredCategories = categories.map(category => {
    const matchesCategory = 
      category.nameAr.toLowerCase().includes(searchQuery.toLowerCase()) ||
      category.nameEn.toLowerCase().includes(searchQuery.toLowerCase());

    const filteredSkills = category.skills.filter(skill => 
      skill.nameAr.toLowerCase().includes(searchQuery.toLowerCase()) ||
      skill.nameEn.toLowerCase().includes(searchQuery.toLowerCase())
    );

    if (matchesCategory || filteredSkills.length > 0) {
      return {
        ...category,
        skills: matchesCategory ? category.skills : filteredSkills,
        isMatch: true
      };
    }
    return null;
  }).filter(Boolean) as (SkillCategory & { isMatch: boolean })[];

  const toggleSkill = (id: number) => {
    setSelectedSkillIds((prev) =>
      prev.includes(id)
        ? prev.filter((skillId) => skillId !== id)
        : [...prev, id]
    );
  };

  const toggleCategory = (id: number) => {
    setExpandedCategoryId(expandedCategoryId === id ? null : id);
  };

  const handleNext = () => {
    if (selectedSkillIds.length === 0) {
      toast.error("يرجى اختيار مهارة واحدة على الأقل");
      return;
    }
    
    saveSkillsMutation.mutate(selectedSkillIds);
  };

  return {
    categories: filteredCategories,
    selectedSkillIds,
    expandedCategoryId,
    searchQuery,
    setSearchQuery,
    isLoading,
    isSubmitting: saveSkillsMutation.isPending,
    error,
    toggleSkill,
    toggleCategory,
    handleNext
  };
}
