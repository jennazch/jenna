
import React from 'react';
import { ArrowRight } from 'lucide-react';
import htm from 'htm';
import Card from './Card.js';

const html = htm.bind(React.createElement);
//todo can probablu add snore, roomate matching app, stock sentiment analyzer 
const Works = ({ projects, onProjectClick }) => {
  return html`
    <div className="max-w-7xl mx-auto space-y-8 animate-fade-in">
      
      <div className="space-y-2">
        <h2 className="text-4xl font-bold text-gray-900 dark:text-white">Selected Works</h2>
        <p className="text-gray-500 dark:text-neutral-400">A collection of projects I've worked on.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        ${projects.map((project) => html`
          <${Card} key=${project.id} className="group cursor-pointer min-h-[400px] flex flex-col" noPadding=${true}>
            <div className="relative h-64 overflow-hidden" onClick=${() => onProjectClick(project.id)}>
               <img 
                 src=${project.image} 
                 alt=${project.title} 
                 className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
               />
               <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300"></div>
            </div>
            
            <div className="p-6 flex flex-col flex-1 justify-between" onClick=${() => onProjectClick(project.id)}>
               <div>
                 <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-gray-500 dark:text-neutral-500 uppercase tracking-wider">${project.category}</span>
                    <span className="text-xs text-gray-400 dark:text-neutral-600 font-mono">${project.date}</span>
                 </div>
                 <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-1 group-hover:underline decoration-2 underline-offset-4 decoration-gray-400 dark:decoration-neutral-600">${project.title}</h3>
                 <p className="text-gray-600 dark:text-neutral-400 text-sm line-clamp-2">${project.description}</p>
               </div>

               <div className="mt-6 flex items-center justify-between">
                  <div className="flex flex-wrap gap-2">
                     ${project.tags.slice(0, 3).map(tag => html`
                        <span key=${tag} className="text-xs px-2 py-1 bg-gray-100 dark:bg-neutral-800 rounded-md text-gray-600 dark:text-neutral-400 font-medium border border-gray-200 dark:border-neutral-700">
                           ${tag}
                        </span>
                     `)}
                     ${project.tags.length > 3 && html`
                        <span className="text-xs px-2 py-1 bg-gray-50 dark:bg-neutral-900 rounded-md text-gray-500 dark:text-neutral-500 font-medium">
                           +${project.tags.length - 3}
                        </span>
                     `}
                  </div>
                  <div className="w-8 h-8 rounded-full bg-gray-100 dark:bg-neutral-800 flex items-center justify-center text-gray-900 dark:text-white group-hover:bg-black group-hover:text-white dark:group-hover:bg-white dark:group-hover:text-black transition-colors">
                     <${ArrowRight} size=${16} />
                  </div>
               </div>
            </div>
          </${Card}>
        `)}
      </div>
    </div>
  `;
};

export default Works;
