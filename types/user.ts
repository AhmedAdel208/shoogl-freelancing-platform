export interface UpdateProfilePayload {
  firstName: string;
  lastName: string;
  bio?: string;
  gender: string;
  nationality: string;
  companyName?: string | null;
}

export interface UserProfile extends UpdateProfilePayload {
  id: string;
  username: string;
  email: string;
  profilePictureUrl?: string; // Correct property from API
  coverImageUrl?: string; // Correct property from API
  isClient: boolean;
  isFreelancer: boolean;
  phoneNumber?: string;
  createdAt: string;
  languages?: any[];
  certificates?: any[];
}
