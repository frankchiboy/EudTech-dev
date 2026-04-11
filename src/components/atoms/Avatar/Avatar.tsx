import React from 'react';
import { User } from 'lucide-react';
import { classNames } from '../../../utils/helpers';

interface AvatarProps {
  src?: string;
  alt?: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'circular' | 'rounded' | 'square';
  fallback?: React.ReactNode;
  className?: string;
}

const Avatar: React.FC<AvatarProps> = ({
  src,
  alt = 'Avatar',
  size = 'md',
  variant = 'circular',
  fallback,
  className
}) => {
  const sizeClasses = {
    xs: 'h-6 w-6',
    sm: 'h-8 w-8',
    md: 'h-10 w-10',
    lg: 'h-12 w-12',
    xl: 'h-16 w-16'
  };

  const variantClasses = {
    circular: 'rounded-full',
    rounded: 'rounded-lg',
    square: 'rounded-none'
  };

  const baseClasses = 'inline-flex items-center justify-center bg-gray-100 dark:bg-gray-800';

  if (src) {
    return (
      <img
        src={src}
        alt={alt}
        className={classNames(
          baseClasses,
          sizeClasses[size],
          variantClasses[variant],
          'object-cover',
          className
        )}
      />
    );
  }

  return (
    <div className={classNames(
      baseClasses,
      sizeClasses[size],
      variantClasses[variant],
      className
    )}>
      {fallback || <User className="h-1/2 w-1/2 text-gray-400" />}
    </div>
  );
};

export default Avatar;