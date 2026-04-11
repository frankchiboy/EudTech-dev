import React from 'react';
import { ExternalLink } from 'lucide-react';
import { classNames } from '../../../utils/helpers';

interface LinkProps {
  href: string;
  external?: boolean;
  color?: 'default' | 'primary' | 'secondary' | 'muted';
  underline?: 'none' | 'hover' | 'always';
  size?: 'sm' | 'base' | 'lg';
  showIcon?: boolean;
  children: React.ReactNode;
  className?: string;
  onClick?: (e: React.MouseEvent) => void;
}

const Link: React.FC<LinkProps> = ({
  href,
  external = false,
  color = 'primary',
  underline = 'hover',
  size = 'base',
  showIcon = false,
  children,
  className,
  onClick
}) => {
  const colorClasses = {
    default: 'text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white',
    primary: 'text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300',
    secondary: 'text-teal-600 dark:text-teal-400 hover:text-teal-700 dark:hover:text-teal-300',
    muted: 'text-gray-500 dark:text-gray-400 hover:text-gray-600 dark:hover:text-gray-300'
  };

  const underlineClasses = {
    none: 'no-underline',
    hover: 'no-underline hover:underline',
    always: 'underline'
  };

  const sizeClasses = {
    sm: 'text-sm',
    base: 'text-base',
    lg: 'text-lg'
  };

  const linkProps = external ? {
    target: '_blank',
    rel: 'noopener noreferrer'
  } : {};

  return (
    <a
      href={href}
      onClick={onClick}
      className={classNames(
        'transition-colors duration-200 inline-flex items-center',
        colorClasses[color],
        underlineClasses[underline],
        sizeClasses[size],
        className
      )}
      {...linkProps}
    >
      {children}
      {(showIcon || external) && (
        <ExternalLink className="ml-1 h-4 w-4" />
      )}
    </a>
  );
};

export default Link;