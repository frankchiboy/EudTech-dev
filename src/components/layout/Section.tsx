import React from 'react';
import { classNames } from '../../utils/helpers';
import Container from './Container';

interface SectionProps {
  children: React.ReactNode;
  id?: string;
  className?: string;
  background?: 'white' | 'gray' | 'gradient' | 'transparent';
  padding?: 'sm' | 'md' | 'lg' | 'xl' | 'none';
  containerMaxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '7xl';
}

const Section: React.FC<SectionProps> = ({
  children,
  id,
  className,
  background = 'white',
  padding = 'lg',
  containerMaxWidth = '7xl'
}) => {
  const backgroundClasses = {
    white: 'bg-white dark:bg-gray-900',
    gray: 'bg-gray-50 dark:bg-gray-800',
    gradient: 'bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800',
    transparent: 'bg-transparent'
  };

  const paddingClasses = {
    none: '',
    sm: 'py-8',
    md: 'py-12',
    lg: 'py-16',
    xl: 'py-20'
  };

  return (
    <section
      id={id}
      className={classNames(
        'relative',
        backgroundClasses[background],
        paddingClasses[padding],
        className
      )}
    >
      <Container maxWidth={containerMaxWidth}>
        {children}
      </Container>
    </section>
  );
};

export default Section;