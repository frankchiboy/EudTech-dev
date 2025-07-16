import React from 'react';
import { AlertCircle } from 'lucide-react';
import { classNames } from '../../../utils/helpers';

interface FormErrorProps {
  message?: string;
  className?: string;
  showIcon?: boolean;
}

const FormError: React.FC<FormErrorProps> = ({
  message,
  className,
  showIcon = true
}) => {
  if (!message) return null;

  return (
    <div
      className={classNames(
        'flex items-center mt-1 text-sm text-red-600 dark:text-red-400',
        className
      )}
      role="alert"
      aria-live="polite"
    >
      {showIcon && <AlertCircle className="h-4 w-4 mr-1 flex-shrink-0" />}
      <span>{message}</span>
    </div>
  );
};

export default FormError;