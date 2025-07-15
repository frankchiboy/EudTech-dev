export interface CompanyInfo {
  name: string;
  chineseName: string;
  foundedYear: number;
  mission: string;
  vision: string;
  email: string;
  phone?: string;
  address?: string;
}

export interface CompanyStats {
  id: number;
  value: string;
  label: string;
  icon: React.ReactNode;
}

export interface TeamMember {
  id: number;
  name: string;
  role: string;
  bio: string;
  image?: string;
}

export interface Partnership {
  id: number;
  name: string;
  logo: string;
  description: string;
  website?: string;
}