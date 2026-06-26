export type ThemeMode = 'light' | 'dark' | 'system';

export type FormStatus = 'idle' | 'submitting' | 'success' | 'error';

export interface NavLinkChild {
  name: string;
  href: string;
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
  message: string;
  privacy: boolean;
}
