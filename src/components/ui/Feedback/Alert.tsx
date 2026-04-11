import React from 'react';
import { AlertCircle, CheckCircle, Info, XCircle, X } from 'lucide-react';
import { classNames } from '../../../utils/helpers';

interface AlertProps {
  variant?: 'info' | 'success' | 'warning' | 'error';
  title?: string;
  children: React.ReactNode;
  closable?: boolean;
  onClose?: () => void;
  className?: string;
}

const Alert: React.FC<AlertProps> = ({
  variant = 'info',
  title,
  children,
  closable = false,
  onClose,
  className
}) => {
  const variants = {
    info: {
      container: 'bg-blue-50 border-blue-200 dark:bg-blue-900/30 dark:border-blue-700/50',
      icon: <Info className="h-5 w-5 text-blue-600 dark:text-blue-400" />,
      title: 'text-blue-800 dark:text-blue-200',
      content: 'text-blue-700 dark:text-blue-300'
    },
    success: {
      container: 'bg-green-50 border-green-200 dark:bg-green-900/30 dark:border-green-700/50',
      icon: <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400" />,
      title: 'text-green-800 dark:text-green-200',
      content: 'text-green-700 dark:text-green-300'
    },
    warning: {
      container: 'bg-yellow-50 border-yellow-200 dark:bg-yellow-900/30 dark:border-yellow-700/50',
      icon: <AlertCircle className="h-5 w-5 text-yellow-600 dark:text-yellow-400" />,
      title: 'text-yellow-800 dark:text-yellow-200',
      content: 'text-yellow-700 dark:text-yellow-300'
    },
    error: {
      container: 'bg-red-50 border-red-200 dark:bg-red-900/30 dark:border-red-700/50',
      icon: <XCircle className="h-5 w-5 text-red-600 dark:text-red-400" />,
      title: 'text-red-800 dark:text-red-200',
      content: 'text-red-700 dark:text-red-300'
    }
  };

  const config = variants[variant];

  return (
    <div className={classNames(
      'rounded-lg border p-4',
      config.container,
      className
    )}>
      <div className="flex">
        <div className="flex-shrink-0">
          {config.icon}
        </div>
        <div className="ml-3 flex-1">
          {title && (
            <h3 className={classNames('text-sm font-medium', config.title)}>
              {title}
            </h3>
          )}
          <div className={classNames(
            'text-sm',
            title ? 'mt-2' : '',
            config.content
          )}>
            {children}
          </div>
        </div>
        {closable && (
          <div className="ml-auto pl-3">
            <button
              onClick={onClose}
              className={classNames(
                'inline-flex rounded-md p-1.5 hover:bg-black/5 dark:hover:bg-white/5',
                config.content
              )}
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Alert;