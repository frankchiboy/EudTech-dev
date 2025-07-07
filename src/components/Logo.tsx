import React from 'react';
import { Server, CircuitBoard } from 'lucide-react';

const Logo: React.FC = () => {
  return (
    <div className="flex items-center">
      <div className="relative">
        <Server className="h-8 w-8 text-teal-600" />
        <CircuitBoard className="h-5 w-5 absolute -top-1 -right-1 text-blue-800" />
      </div>
      <div className="ml-2 flex flex-col leading-none">
        <span className="text-lg font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-blue-800 to-teal-600">
          EudTech
        </span>
        <span className="text-xs tracking-wide opacity-80">Eudaemonia Technology</span>
      </div>
    </div>
  );
};

export default Logo;