import React from 'react';
import { ChevronRight, Home } from 'lucide-react';
import { Link } from 'react-router-dom';
import { classNames } from '../../../utils/helpers';

interface BreadcrumbItem {
  label: string;
  href?: string;
  current?: boolean;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
  showHome?: boolean;
  separator?: React.ReactNode;
  className?: string;
}

const Breadcrumb: React.FC<BreadcrumbProps> = ({
  items,
  showHome = true,
  separator = <ChevronRight className="h-4 w-4 text-gray-400" />,
  className
}) => {
  const allItems = showHome ? [{ label: '首頁', href: '/' }, ...items] : items;

  return (
    <nav aria-label="Breadcrumb" className={className}>
      <ol className="flex items-center space-x-2 text-sm">
        {allItems.map((item, index) => (
          <li key={index} className="flex items-center">
            {index > 0 && <span className="mx-2">{separator}</span>}
            
            {index === 0 && showHome && (
              <Home className="h-4 w-4 mr-1 text-gray-400" />
            )}
            
            {item.href && !item.current ? (
              <Link
                to={item.href}
                className={classNames(
                  'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white',
                  'transition-colors duration-200'
                )}
              >
                {item.label}
              </Link>
            ) : (
              <span className={classNames(
                item.current 
                  ? 'text-gray-900 dark:text-white font-medium' 
                  : 'text-gray-500 dark:text-gray-400'
              )}>
                {item.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default Breadcrumb;