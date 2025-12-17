
import React from 'react';
import { Database, BarChart, Table, Code2, PenTool, Cloud, CheckSquare, FileText, Repeat, Map } from 'lucide-react';
import htm from 'htm';

const html = htm.bind(React.createElement);

const techs = [
  { icon: html`<${Database} size=${32} className="text-orange-500" />`, name: 'SQL' },
  { icon: html`<${BarChart} size=${32} className="text-blue-500" />`, name: 'R' },
  { icon: html`<${Table} size=${32} className="text-green-600" />`, name: 'Excel' },
  { icon: html`<${Code2} size=${32} className="text-blue-400" />`, name: 'Python' },
  { icon: html`<${PenTool} size=${32} className="text-pink-500" />`, name: 'Figma' },
  { icon: html`<${Cloud} size=${32} className="text-yellow-500" />`, name: 'AWS' },
  { icon: html`<${CheckSquare} size=${32} className="text-blue-600" />`, name: 'Jira' },
  { icon: html`<${FileText} size=${32} className="text-blue-400" />`, name: 'Confluence' },
  { icon: html`<${Repeat} size=${32} className="text-green-500" />`, name: 'Agile' }
];

const TechStack = () => {
  return html`
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 h-full content-start">
      ${techs.map((tech, idx) => html`
        <div 
          key=${idx} 
          className="aspect-square bg-gray-100 dark:bg-neutral-800 rounded-2xl flex flex-col items-center justify-center hover:bg-white hover:shadow-md dark:hover:bg-neutral-700 transition-all cursor-default group border border-transparent hover:border-gray-200 dark:hover:border-neutral-600"
          title=${tech.name}
        >
          <div className="mb-2 transition-transform group-hover:scale-110 duration-300">
            ${tech.icon}
          </div>
          <span className="text-xs font-bold text-gray-600 dark:text-neutral-400 group-hover:text-gray-900 dark:group-hover:text-white transition-colors">
            ${tech.name}
          </span>
        </div>
      `)}
    </div>
  `;
};

export default TechStack;
