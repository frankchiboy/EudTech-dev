import { NavLink } from '../types';
import { SITE_NAVIGATION_GROUPS } from './siteArchitecture';

export const getNavLinks = (isEnglish: boolean): NavLink[] => {
  const label = (value: { zh: string; en: string }) => (isEnglish ? value.en : value.zh);
  return [
    ...SITE_NAVIGATION_GROUPS.map((group) => ({
      name: label(group.label),
      href: group.href,
      isDropdown: true,
      children: group.children?.map((child) => ({
        name: label(child.label),
        href: child.href,
        description: label(child.description)
      }))
    }))
  ];
};
