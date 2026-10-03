import { NavLink } from '../types';
import { languagePath } from '../utils/seo/languageUrl';
import { SITE_NAVIGATION_GROUPS } from './siteArchitecture';

export const getNavLinks = (isEnglish: boolean): NavLink[] => {
  const label = (value: { zh: string; en: string }) => (isEnglish ? value.en : value.zh);
  return [
    ...SITE_NAVIGATION_GROUPS.map((group) => ({
      name: label(group.label),
      href: languagePath(group.href, isEnglish),
      isDropdown: true,
      children: group.children?.map((child) => ({
        name: label(child.label),
        href: languagePath(child.href, isEnglish),
        description: label(child.description)
      }))
    }))
  ];
};
