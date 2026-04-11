export interface Product {
  id: number;
  title: string;
  description: string;
  icon: React.ReactNode;
  image: string;
  features: string[];
  specs: Record<string, string>;
  comingSoon: boolean;
  images?: string[];
  detailedDescription?: ProductDetailedDescription;
}

export interface ConfigurationSection {
  title: string;
  description?: string;
  configurations?: string[];
}

export interface ProductDetailedDescription {
  title: string;
  formFactor: string;
  introduction: string;
  keyFeatures: string[];
  technicalSpecs: Record<string, string>;
  relevantConfigurations?: string[] | ConfigurationSection[];
  applications?: string[];
  orderInfo?: OrderInfo[];
  additionalFeatures?: Record<string, string>;
}

export interface OrderInfo {
  type: string;
  pn: string;
  model: string;
  description: string;
}

export interface ProductSpecs {
  [key: string]: string;
}

export interface ProductFeature {
  title: string;
  description: string;
  icon: React.ReactNode;
}

export interface ProductStats {
  id: number;
  value: string;
  label: string;
  icon: React.ReactNode;
}