import React, { useEffect, useRef, useState } from 'react';
import { classNames } from '../../../utils/helpers';

interface MasonryGridProps {
  children: React.ReactNode;
  columns?: number;
  gap?: number;
  className?: string;
}

const MasonryGrid: React.FC<MasonryGridProps> = ({
  children,
  columns = 3,
  gap = 16,
  className
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [columnHeights, setColumnHeights] = useState<number[]>([]);

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const items = Array.from(container.children) as HTMLElement[];
    const heights = new Array(columns).fill(0);

    items.forEach((item, index) => {
      const columnIndex = index % columns;
      const x = columnIndex * (item.offsetWidth + gap);
      const y = heights[columnIndex];

      item.style.position = 'absolute';
      item.style.left = `${x}px`;
      item.style.top = `${y}px`;

      heights[columnIndex] += item.offsetHeight + gap;
    });

    setColumnHeights(heights);
    container.style.height = `${Math.max(...heights)}px`;
  }, [children, columns, gap]);

  return (
    <div
      ref={containerRef}
      className={classNames('relative', className)}
      style={{ columnGap: gap }}
    >
      {children}
    </div>
  );
};

export default MasonryGrid;