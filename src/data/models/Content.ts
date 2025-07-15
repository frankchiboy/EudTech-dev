export interface ContentSection {
  id: string;
  title: string;
  subtitle?: string;
  content: string;
  image?: string;
  ctaText?: string;
  ctaLink?: string;
}

export interface FeatureHighlight {
  id: number;
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
}

export interface Testimonial {
  id: number;
  name: string;
  role: string;
  company: string;
  content: string;
  avatar?: string;
  rating?: number;
}

export interface FAQ {
  id: number;
  question: string;
  answer: string;
  category: string;
}