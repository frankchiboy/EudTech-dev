import React from 'react';
import { Text, Heading } from '../../ui/Typography';

interface ProductContentProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  features: string[];
  maxFeatures?: number;
}

const ProductContent: React.FC<ProductContentProps> = ({
  icon,
  title,
  description,
  features,
  maxFeatures = 4
}) => {
  const displayFeatures = features.slice(0, maxFeatures);

  return (
    <div className="p-6 space-y-4">
      <div className="flex items-center space-x-3">
        {icon}
        <Heading as="h3" size="xl" className="flex-1">
          {title}
        </Heading>
      </div>
      
      <Text color="muted">
        {description}
      </Text>
      
      <div className="grid grid-cols-2 gap-3">
        {displayFeatures.map((feature, index) => (
          <div key={index} className="flex items-center text-sm">
            <div className="h-1.5 w-1.5 bg-blue-600 dark:bg-blue-400 rounded-full mr-2 flex-shrink-0"></div>
            <span className="text-gray-600 dark:text-gray-300">{feature}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductContent;