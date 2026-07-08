export type UserType = "individuals" | "companies";

export interface Service {
  id: string;
  title: string;
  description: string;
  iconName: string; // Dynamic Lucide icon key
  badge?: string;
  techStack?: string[];
}

export interface VideoCard {
  id: string;
  title: string;
  duration: string;
  tag: string;
  thumbnailUrl: string;
  videoUrl?: string; // Real video URL (YouTube, Vimeo, or MP4 file)
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

export interface ContactFormData {
  fullName: string;
  companyName?: string;
  phone: string;
  email: string;
  userType: UserType;
  serviceNeeded: string;
  message: string;
}
