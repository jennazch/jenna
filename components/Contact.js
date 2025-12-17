import React, { useState } from 'react';
import { Mail, Linkedin, Copy, Check } from 'lucide-react';
import htm from 'htm';
import Card from './Card.js';

const html = htm.bind(React.createElement);

const Contact = () => {
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText('jennazchen@gmail.com');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return html`
    <div className="max-w-4xl mx-auto space-y-8 animate-fade-in relative">
      
      <div className="space-y-2">
        <h2 className="text-4xl font-bold text-gray-900 dark:text-white">Get in touch</h2>
        <p className="text-gray-500 dark:text-neutral-400">Let's build something awesome together.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <!-- Email Card -->
        <${Card} className="bg-gray-50 dark:bg-neutral-900 flex flex-col justify-between min-h-[250px] group">
          <div className="p-4 bg-gray-200 dark:bg-neutral-800 w-fit rounded-xl mb-4 group-hover:scale-110 group-hover:bg-black group-hover:text-white dark:group-hover:bg-white dark:group-hover:text-black transition-all duration-300">
             <${Mail} size=${24} className="text-gray-900 dark:text-white group-hover:text-white dark:group-hover:text-black" />
          </div>
          <div>
             <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Email Me</h3>
             <div className="flex flex-col gap-2 mt-4">
                <button 
                  onClick=${handleCopyEmail}
                  className="w-full py-3 rounded-xl bg-white dark:bg-neutral-800 border border-gray-200 dark:border-neutral-700 hover:bg-gray-100 dark:hover:bg-neutral-700 text-gray-900 dark:text-white font-medium flex items-center justify-center gap-2 transition-all active:scale-95"
                >
                  ${copied ? html`<${Check} size=${18} className="text-green-500"/>` : html`<${Copy} size=${18} />`}
                  ${copied ? 'Copied!' : 'Copy to clipboard'}
                </button>
             </div>
          </div>
        </${Card}>

        <!-- DM Card -->
        <${Card} className="bg-gray-50 dark:bg-neutral-900 flex flex-col justify-between min-h-[250px] group">
          <div className="p-4 bg-gray-200 dark:bg-neutral-800 w-fit rounded-xl mb-4 group-hover:scale-110 group-hover:bg-black group-hover:text-white dark:group-hover:bg-white dark:group-hover:text-black transition-all duration-300">
             <${Linkedin} size=${24} className="text-gray-900 dark:text-white group-hover:text-white dark:group-hover:text-black" />
          </div>
          <div>
             <h3 className="text-2xl font-bold text-gray-900 dark:text-white">DM Me</h3>
             <a 
                href="https://www.linkedin.com/in/jennazch/" 
                target="_blank"
                rel="noreferrer"
                className="mt-4 w-full py-3 rounded-xl bg-white dark:bg-neutral-800 border border-gray-200 dark:border-neutral-700 hover:bg-[#0077b5] hover:text-white hover:border-[#0077b5] text-gray-900 dark:text-white font-bold flex items-center justify-center gap-2 transition-all active:scale-95"
             >
                Connect on LinkedIn
             </a>
          </div>
        </${Card}>
      </div>
    </div>
  `;
};

export default Contact;
