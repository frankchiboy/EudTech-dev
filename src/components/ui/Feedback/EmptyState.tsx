import React from 'react';
import { Search, Inbox, AlertCircle } from 'lucide-react';
import { classNames } from '../../../utils/helpers';
import Button from '../Button';

interface EmptyStateProps {
  variant?: 'default' | 'search' | 'error';
  title: string;
  description?: string;
  icon?: React.ReactNode;
  action?: {
    label: string;
    onClick: () => void;
  };
  className?: string;
}

const EmptyState: React.FC<EmptyStateProps> = ({
  variant = 'default',
  title,
  description,
  icon,
  action,
  className
}) => {
  const defaultIcons = {
    default: <Inbox className="h-12 w-12 text-gray-400" />,
    search: <Search className="h-12 w-12 text-gray-400" />,
    error: <AlertCircle className="h-12 w-12 text-red-400" />
  };

  const displayIcon = icon || defaultIcons[variant];

  return (
    <div className={classNames(
      'text-center py-12',
      className
    )}>
      <div className="flex justify-center mb-4">
        {displayIcon}
      </div>
      
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
        {title}
      </h3>
      
      {description && (
        <p className="text-gray-500 dark:text-gray-400 mb-6 max-w-sm mx-auto">
          {description}
        </p>
      )}
      
      {action && (
        <Button
          onClick={action.onClick}
          variant="primary"
        >
          {action.label}
        </Button>
      )}
    </div>
  );
};

export default EmptyState;