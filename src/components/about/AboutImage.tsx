import React from 'react';

interface AboutImageProps {
  isEnglish: boolean;
}

const AboutImage: React.FC<AboutImageProps> = ({ isEnglish }) => {
  return (
    <div className="rounded-2xl overflow-hidden shadow-xl bg-gradient-to-br from-indigo-900 via-blue-900 to-teal-900 p-1">
      <div className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden">
        <img
          className="w-full h-auto object-cover"
          src="https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
          alt="EudTech AI research team"
        />
        <div className="p-8">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
            {isEnglish ? 'Our Vision' : '我們的願景'}
          </h3>
          <p className="text-gray-600 dark:text-gray-300">
            {isEnglish
              ? 'We envision a future where AI technology enhances human capabilities, promotes sustainable development, and creates positive social impact across all sectors of society.'
              : '我們展望一個人工智能技術增強人類能力、促進可持續發展，並在社會各個領域創造積極影響的未來。'}
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutImage;