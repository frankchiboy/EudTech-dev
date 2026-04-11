import React from 'react';
import { Testimonial } from '../../data/models/Content';

interface CustomerReviewsProps {
  reviews: Testimonial[];
  isEnglish: boolean;
  title?: string;
}

const CustomerReviews: React.FC<CustomerReviewsProps> = ({ 
  reviews, 
  isEnglish,
  title = isEnglish ? 'Industry Recognition' : '業界認可'
}) => {
  return (
    <div className="text-center mb-16">
      <h4 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-10">
        {title}
      </h4>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {reviews.map((review, index) => (
          <div key={index} className="bg-white dark:bg-gray-800 rounded-xl shadow-xl p-8 hover:shadow-2xl transition-shadow">
            <div className="flex items-center mb-5">
              <img 
                src={review.avatar || '/default-avatar.png'} 
                alt={review.name} 
                className="w-16 h-16 rounded-full object-cover mr-4"
              />
              <div>
                <h5 className="font-semibold text-gray-900 dark:text-white">{review.name}</h5>
                <p className="text-sm text-gray-600 dark:text-gray-300">{review.role}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">{review.company}</p>
              </div>
            </div>
            <p className="text-gray-700 dark:text-gray-200 italic text-lg leading-relaxed">"{review.content}"</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CustomerReviews;