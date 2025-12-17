import React from 'react';
import { ArrowRight, ArrowLeft } from 'lucide-react';
import htm from 'htm';
import Card from './Card.js';

const html = htm.bind(React.createElement);

const ProjectDetail = ({ project, onBack }) => {
  if (!project) return null;

  const isWIP = project.status === 'Work In Progress';
  const statusColor = isWIP ? 'bg-yellow-500' : 'bg-green-500';
  const statusPingColor = isWIP ? 'bg-yellow-400' : 'bg-green-400';
  const displayStatus = project.status || 'Completed';

  return html`
    <div className="max-w-7xl mx-auto space-y-8 animate-fade-in pb-12">
      <!-- Back Navigation -->
      <button 
        onClick=${onBack}
        className="flex items-center gap-2 text-gray-600 dark:text-neutral-400 hover:text-black dark:hover:text-white transition-colors group"
      >
        <${ArrowLeft} size=${20} className="group-hover:-translate-x-1 transition-transform" />
        Back to Works
      </button>

      <!-- Hero Section -->
      <div className="relative w-full rounded-3xl overflow-hidden group">
         <div className="w-full h-[400px] md:h-[600px] bg-neutral-900 relative">
             <img src=${project.image} alt=${project.title} className="w-full h-full object-cover opacity-80" />
             <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent"></div>
             
             <div className="absolute bottom-0 left-0 w-full p-6 md:p-12 flex flex-col md:flex-row justify-between items-end gap-6">
                <div>
                   <div className="flex items-center gap-3 mb-3">
                      <span className="px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs font-bold text-white uppercase tracking-wider">
                         ${project.category}
                      </span>
                      <span className="text-neutral-400 text-sm font-mono">${project.date}</span>
                   </div>
                   <h1 className="text-5xl md:text-7xl font-bold text-white tracking-tighter mb-2">${project.title}</h1>
                   <p className="text-xl text-neutral-300 font-medium">${project.subtitle}</p>
                </div>
             </div>
         </div>
      </div>

      <!-- Links Bar -->
      <${Card} className="bg-neutral-900 border-neutral-800 p-4 flex items-center justify-between" noPadding=${true}>
          <div className="px-6 py-4">
             <span className="text-gray-500 dark:text-neutral-500 text-sm">Status</span>
             <div className="flex items-center gap-2 mt-1">
                <span className="relative flex h-2 w-2">
                  <span className=${`animate-ping absolute inline-flex h-full w-full rounded-full ${statusPingColor} opacity-75`}></span>
                  <span className=${`relative inline-flex rounded-full h-2 w-2 ${statusColor}`}></span>
                </span>
                <span className="font-medium text-gray-900 dark:text-white">${displayStatus}</span>
             </div>
          </div>
          ${!isWIP && html`
            <a 
               href=${project.liveLink}
               className="w-full md:w-auto flex-1 md:flex-none border-l border-gray-200 dark:border-neutral-800 px-6 py-4 hover:bg-gray-100 dark:hover:bg-neutral-800 transition-colors flex items-center justify-center gap-2 font-bold text-gray-900 dark:text-white group"
            >
               View Repository <${ArrowRight} size=${18} className="group-hover:-rotate-45 transition-transform" />
            </a>
          `}
      </${Card}>

      <!-- Content Grid -->
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
         
         <!-- Left Column -->
         <div className="space-y-8">
            <div className="space-y-4">
               <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Project Information</h2>
               <p className="text-gray-600 dark:text-neutral-400 text-lg leading-relaxed">
                  ${project.description}
               </p>
            </div>

            <div className="space-y-4">
               <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Key Features</h2>
               <ul className="space-y-3">
                  ${project.features && project.features.map((feature, idx) => html`
                    <li key=${idx} className="flex items-start gap-3 text-gray-600 dark:text-neutral-400">
                       <span className="mt-2 w-1.5 h-1.5 rounded-full bg-gray-400 dark:bg-neutral-600 shrink-0"></span>
                       <span className="leading-relaxed">${feature}</span>
                    </li>
                  `)}
               </ul>
            </div>
         </div>

         <!-- Right Column -->
         <div className="space-y-8">
            <div className="space-y-4">
               <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Technical Stack</h2>
               <div className="flex flex-wrap gap-2">
                  ${project.tags.map(tag => html`
                     <span key=${tag} className="px-3 py-1.5 bg-gray-100 dark:bg-neutral-800 border border-gray-200 dark:border-neutral-700 rounded-lg text-sm font-medium text-gray-700 dark:text-neutral-300">
                        ${tag}
                     </span>
                  `)}
               </div>
            </div>

            <div className="space-y-4">
               <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Development Highlights</h2>
               <ul className="space-y-3">
                  ${project.highlights && project.highlights.map((highlight, idx) => html`
                    <li key=${idx} className="flex items-start gap-3 text-gray-600 dark:text-neutral-400">
                       <span className="mt-2 w-1.5 h-1.5 rounded-full bg-gray-400 dark:bg-neutral-600 shrink-0"></span>
                       <span className="leading-relaxed">${highlight}</span>
                    </li>
                  `)}
               </ul>
            </div>
         </div>

      </div>
    </div>
  `;
};

export default ProjectDetail;