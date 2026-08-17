export type ThemeMode = 'light' | 'dark' | 'system';

export type FormStatus = 'idle' | 'submitting' | 'success' | 'error';

export interface NavLinkChild {
  name: string;
  href: string;
  description?: string;
}

export interface NavLink {
  name: string;
  href: string;
  labelLines?: string[];
  isDropdown?: boolean;
  disabled?: boolean;
  disabledText?: string;
  children?: NavLinkChild[];
}

export interface HeroContent {
  title: {
    main: string;
    highlight: string;
  };
  subtitle: string;
  buttons: {
    primary: string;
    secondary: string;
  };
}

export interface EmailFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  company?: string;
  country?: string;
  subject?: string;
  toEmail?: string;
  quoteRequestId?: string;
  configurationSummary?: {
    device: string;
    gpu: string;
    cpu: string;
    ram: string;
    storage: string;
    storage_1: string;
    storage_2: string;
    storage_3: string;
    storage_4: string;
    psu: string;
    network: string;
  };
  message: string;
  privacy: boolean;
}
