import React from 'react';
import { DollarSign, Plane, GraduationCap } from 'lucide-react';
import htm from 'htm';

const html = htm.bind(React.createElement);

const experiences = [
  { 
    id: 1, 
    role: 'Product Manager', 
    company: 'Capital One', 
    years: '2024 - Present',
    icon: html`<${DollarSign} size=${32} className="text-blue-500" />` 
  },
  { 
    id: 2, 
    role: 'Software Engineer', 
    company: 'Boeing', 
    years: '2022 - 2024',
    icon: html`<${Plane} size=${32} className="text-red-600 dark:text-red-500" />` 
  },
  { 
    id: 3, 
    role: 'B.S. Computer Science', 
    company: 'University of Michigan', 
    years: '2018 - 2022',
    icon: html`<${GraduationCap} size=${32} className="text-yellow-600 dark:text-yellow-500" />` 
  },
];

const Experience = () => {
  return html`
    <div className="flex flex-col justify-between h-full">
      ${experiences.map((exp) => html`
        <div key=${exp.id} className="flex items-center gap-4 group cursor-default py-2">
          <div className="w-20 h-20 rounded-2xl bg-gray-100 dark:bg-neutral-800 flex items-center justify-center transition-colors border border-gray-200 dark:border-neutral-700 group-hover:border-gray-300 dark:group-hover:border-neutral-600 shrink-0">
            ${exp.icon}
          </div>
          <div className="flex flex-col flex-1 min-w-0 justify-center">
            <div className="flex flex-col items-start">
               <span className="text-sm font-semibold text-gray-900 dark:text-white border border-gray-200 dark:border-neutral-700 rounded-lg px-2 py-0.5 bg-gray-50 dark:bg-transparent">
                 ${exp.role}
               </span>
               <span className="text-xs text-gray-400 dark:text-neutral-500 font-mono mt-1">${exp.years}</span>
            </div>
            <span className="text-gray-700 dark:text-neutral-300 text-sm mt-1 truncate font-medium">${exp.company}</span>
          </div>
        </div>
      `)}
    </div>
  `;
};

export default Experience;